(function() {

  // Here's the list of objects that we will be displaying
  var colorList = [
    { colorName: 'black', hex: '#000' },
    { colorName: 'white', hex: '#fff' },
    { colorName: 'blue',  hex: '#419ad8' },
    { colorName: 'gold',  hex: '#d6ba65'}
  ];

  // Create a collection out of those models
  var collection = new Backbone.Collection(colorList);

  var ColorView = Marionette.ItemView.extend({
    tagName: 'tr',
    template: '#template-composite-color',
    events: {
      'click': 'logEvent'
    },
    logEvent: function() {
      console.log('Got an event; I clicked:', this.model.get('colorName'));
    }
  });

  var compositeView = new Marionette.CompositeView({
    el: 'div.composite-view',
    template: '#template-composite-view',
    collection: collection,
    itemView: ColorView,
    itemViewContainer: 'tbody'
  });

  compositeView.render();

})();