;(function(root, $) {
   var valid_modifiers = ['alt', 'ctrl', 'meta', 'shift'];

    var special_keys = {
        8: 'backspace', 9: 'tab', 13: 'return', 16: 'shift', 17: 'ctrl', 18: 'alt', 19: 'pause',
        20: 'capslock', 27: 'esc', 32: 'space', 33: 'pageup', 34: 'pagedown', 35: 'end', 36: 'home',
        37: 'left', 38: 'up', 39: 'right', 40: 'down', 45: 'insert', 46: 'del',
        96: '0', 97: '1', 98: '2', 99: '3', 100: '4', 101: '5', 102: '6', 103: '7',
        104: '8', 105: '9', 106: '*', 107: '+', 109: '-', 110: '.', 111 : '/',
        112: 'f1', 113: 'f2', 114: 'f3', 115: 'f4', 116: 'f5', 117: 'f6', 118: 'f7', 119: 'f8',
        120: 'f9', 121: 'f10', 122: 'f11', 123: 'f12', 144: 'numlock', 145: 'scroll', 191: '/', 224: 'meta',
        186: ';',
        187: '+',
        188: ',',
        189: '-',
        190: '.',
        192: '`',
        219: '[',
        220: '\\',
        221: ']',
        222: '\'',
    };

    var eventsNamespace = {};

    var keyMatches = function(e, key) {
        return String.fromCharCode(e.which).toLowerCase() == key
            || special_keys[e.which] == key;
    };

    var modifierMatches = function(e, modifiers) {
        var hasModifier = function(m) {
            return e[m + 'Key'];
        };

        return _.chain(modifiers)
                .intersection(valid_modifiers)
                .all(hasModifier)
                .value();
    };

    var matches = function(e, key, modifiers) {
        return keyMatches(e, key)
            && modifierMatches(e, modifiers);
    };

    var buildHandler = function(key, modifiers, callback) {
        return function(e) {
            if (/textarea|select/i.test(e.target.nodeName) || e.target.type === "text") {
                return;
            }

            if (matches(e, key, modifiers)) {
                e.stopPropagation();
                e.preventDefault();
                callback(arguments);
            }
        };
    };

    var bind = function(events, context, namespace) {
        _.each(events, function(method, trigger) {
            var parts = trigger.split(/\s*\+\s*/),
                key = _.last(parts),
                modifiers = _.initial(parts),
                callback = null;

            if (_.isFunction(context[method])) {
                callback = _.bind(context[method], context);
            } else if (_.isFunction(method)) {
                callback = _.bind(method, context);
            }

            if (eventsNamespace[namespace]) {
                eventsNamespace[namespace].push(buildHandler(key, modifiers, callback));
            } else {
                eventsNamespace[namespace] = [buildHandler(key, modifiers, callback)];
            }
        });

        return context;
    };

    var unbind = function (events, context, namespace) {
        delete eventsNamespace[namespace];
    };

    var onKeyup = function(e) {
        _.each(eventsNamespace, function(namespace) {
          _.each(namespace, function(callback) {
            callback(e);
          });
        });
    };

    $(document).on('keyup', onKeyup);

    root.HotKeys = {
        'bind': bind,
        'unbind': unbind
    };
}(window, $))
