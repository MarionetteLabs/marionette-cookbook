/* Backbone.Advice
 *
 * This is an expiremental api for Functional Mixins:
 * The Dropdown object

 * The Dropdown object has a functions hash, which maps properties
 * in the object that should be mixed into the view with their respective
 * mixin strategy "addToObj", "after"...
 *
 */


Backbone.Advice.addMixin(Marionette.ItemView);

/*
 * setupMixin was a 15 minute hack to demonstrate a sugared
 * version of Backbone.Advice that could be used cleanup the mixin function.
 * there are several things that could be considered in a subsequent cleanup.
 *
 * 1. should the Mixin be an Object literal or should it be setup up with a function
      like Backbone.Advice.Mixin({})
 *
 * 2. are there other ways to pass the mixin options in... what's the appropriate scope
 *
 * 3. should mixins have their own state / initialize method for setting up the state...
 *
 * 4. will this handle wrapping the original method? Maybe, haven't tested it.
 *
 */

function setupMixin(ViewClass, mixin) {
  mixinFnc = function(mixin) {
    return function(options) {
      _.each(mixin.functions, function(prop, fncRef) {

        if (fncRef == "addToObj") {
          var data = {};
          data[prop] = _.result(mixin, prop);
          this.addToObj(data)
        } else {
          (this[fncRef]).call(this, prop, mixin[prop]);
        }

      }, this);
    }
  };

  ViewClass.mixin([ mixinFnc(mixin) ]);
}



var Dropdown = {
  functions: {
    'addToObj': 'events',
    'after': 'onDropdownShow'
  },

  events: {
    'click @ui.button': 'onDropdownShow'
  },

  onDropdownShow: function() {
    this.$el.toggleClass('open');
  },
};



var DropdownView = Marionette.ItemView.extend({
  template: "#dropdown-tpl",

  ui: {
    button: '.btn',
  },

  className: "btn-group",

});

setupMixin(DropdownView, Dropdown);


var dropdownView = new DropdownView();
$('#dropdown-example').html(dropdownView.render().el);

