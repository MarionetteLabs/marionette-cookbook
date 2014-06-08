Marionette.Behaviors.behaviorsLookup = function() {
  return window;
}


HotKeysBehavior = Marionette.Behavior.extend({
    onRender: function() {
        HotKeys.bind(this.view.keyEvents, this.view, this.view.cid);
    },

    onClose: function() {
        HotKeys.unbind(this.view.keyEvents, this.view, this.view.cid);
    }
});

HotkeysView = Marionette.ItemView.extend({
  template: "#hotkeys-tpl",

  keyEvents: {
    'x': 'onXPress'
  },

  behaviors: {
    HotKeysBehavior: {}
  },

  onXPress: function() {
    alert('x was pressed!');
  }
})


var hotKeysView = new HotkeysView();
$('#hotkeys-example').html(hotKeysView.render().el);