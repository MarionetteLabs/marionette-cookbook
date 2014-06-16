Marionette.Behaviors.behaviorsLookup = function() {
  return window;
}


DisableScrolling = Marionette.Behavior.extend({
   onDisableScrolling: function() {
     var scrollTop = $(document).scrollTop();
     this.$el.addClass('disable-scrolling');
     this.$el.css('margin-top', -scrollTop);
     this.$el.css('overflow-y', 'hidden');
     this.$el.height($(window).height() + scrollTop);
   },

   onEnableScrolling: function() {
     var marginTop = this.$el.css('margin-top');
     this.$el.removeClass('disable-scrolling');
     this.$el.css('overflow-y', 'auto');
     this.$el.css('margin-top', 0);
     $(document).scrollTop(-1*parseInt(marginTop));
     this.$el.height('100%');
   }
});


ExampleView = Marionette.ItemView.extend({
  template: "#layout-tpl",

  behaviors: {
    DisableScrolling: {}
  },

  events: {
    'click': 'onClick'
  },

  initialize: function() {
    this.isScrolling = true;
  },

  onClick: function() {
    if (this.isScrolling) {
      this.triggerMethod('disable:scrolling');
    } else {
      this.triggerMethod('enable:scrolling');
    }
    this.isScrolling = !this.isScrolling;
  }
});

var colors = ['yellow', 'blue', 'red', 'green'];
var type = ['square', 'triangle', 'circle']

var shapes = new Backbone.Collection(_.map(_.range(1,300), function() {
  return {
    color: colors[_.random(0,3)],
    type: type[_.random(0,2)]
  };
}));

var exampleModel = new Backbone.Model();
exampleModel.set('shapes', shapes);

var exampleview = new ExampleView({
  model: exampleModel
});

$('#disable-scrolling-example').html(exampleview.render().el);