 /* Backbone.Advice
  *
  * This is a standard way to use a functional mixin approach.
  * The Dropdown function wires up the utilities that the Dropdown view will
  * receive. In this case, those are events and `onDropdownShow`.
  *
  */




Backbone.Advice.addMixin(Marionette.ItemView);

var Dropdown = function(options) {
  this.addToObj({
    events: {
      'click @ui.button': 'onDropdownShow'
    }
  });

  this.after('onDropdownShow', function() {
    this.$el.toggleClass('open');
  });
};


var DropdownView = Marionette.ItemView.extend({
  template: "#dropdown-tpl",

  ui: {
    button: '.btn',
  },

  className: "btn-group",

});

DropdownView.mixin([ Dropdown ]);


var dropdownView = new DropdownView();
$('#dropdown-example').html(dropdownView.render().el);