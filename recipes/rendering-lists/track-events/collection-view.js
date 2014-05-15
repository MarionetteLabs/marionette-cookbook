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
    template: '#template-color-item',
    events: {
      'click': 'logEvent'
    },
    logEvent: function() {
      console.log('Got an event; I clicked:', this.model.get('colorName'));
    }
  });

  var collectionView = new Marionette.CollectionView({
    el: 'ul.collection-view',
    itemView: ColorView,
    collection: collection
  });

  collectionView.render();

})();