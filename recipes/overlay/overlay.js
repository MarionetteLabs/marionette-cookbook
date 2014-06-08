Radio = Backbone.Wreqr.radio;

Radio.connectCommands = function(channelName, commands, context) {
    var boundCommands = Marionette.normalizeMethods.call(context, commands);
    Radio.channel(channelName).connectCommands(boundCommands, context);
};

Marionette.Behaviors.behaviorsLookup = function() {
  return window;
}

OverlayBehavior = Marionette.Behavior.extend({
  ui: {
    close: '.close',
  },

  events: {
    'click @ui.close': 'onOverlayClose'
  },

  onOverlayClose: function() {
    Radio.commands.execute('app', 'mask:close')
  }
});

OverlayableBehavior = Marionette.Behavior.extend({
  ui: {
    mask: '#mask'
  },

  appCommands: {
    'overlay:show': 'onOverlayShow',
    'overlay:close': 'onOverlayClose'
  },

  events: {
    'click @ui.mask': 'onOverlayClose'
  },

  initialize: function() {
    Radio.connectCommands('app', this.appCommands, this);
  },

  onOverlayShow: function(overlay) {
    this.ui.mask.show();
    this.view.OverlayRegion.show(overlay);
  },

  onOverlayClose: function() {
    this.ui.mask.hide();
    this.view.OverlayRegion.close();
  }
});

var OverlayView = Marionette.ItemView.extend({
  template: "#overlay-tpl",

  behaviors: {
    OverlayBehavior: {}
  }
})

var AppLayout = Marionette.Layout.extend({
  template: "#app-layout-tpl",

  behaviors: {
    OverlayableBehavior: {}
  },

  regions: {
    OverlayRegion: '.overlay-region'
  },

  events: {
    'click .overlay-button': 'showOverlay'
  },

  showOverlay: function() {
    this.triggerMethod('overlay:show', new OverlayView());
  }
});


var appLayout = new AppLayout();
$('#overlay-example').html(appLayout.render().el);
