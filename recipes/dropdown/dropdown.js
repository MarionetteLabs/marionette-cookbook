
DropdownBehavior = Marionette.Behavior.extend({
  ui: {
    button: '.btn',
  },

  events: {
    'click @ui.button': 'onDropdownShow'
  },

  onDropdownShow: function() {
    this.$el.toggleClass('open');
  }
});

Marionette.Behaviors.behaviorsLookup = function() {
  return window;
}

var DropdownView = Marionette.ItemView.extend({
  template: "#dropdown-tpl",

  className: "btn-group",

  behaviors: {
    DropdownBehavior: {}
  }
});


var dropdownView = new DropdownView();
$('#dropdown-example').html(dropdownView.render().el);
