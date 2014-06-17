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
