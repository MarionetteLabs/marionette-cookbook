(function() {

  // Here's the list of objects that we will be displaying
  var colorList = [
    { colorName: 'black', hex: '#000' },
    { colorName: 'realDarkGrey', hex: '#000' },
    { colorName: 'white', hex: '#fff' },
    { colorName: 'blue',  hex: '#419ad8' },
    { colorName: 'gold',  hex: '#d6ba65'}
  ];

  var ModelClass = Backbone.Model({
    idAttribute: 'hex'
  });

  // Create a collection out of those models
  var collection = new Backbone.Collection(colorList, {
    model: ModelClass
  });

  var ColorView = new Marionette.ItemView({
    template: '#template-color-item'
  });

  // Instantiate a new item view, giving it an element,
  // a template, and our collection
  var collectionView = new Marionette.CollectionView({
    el: 'ul.list',
    template: '#template-color-list',
    collection: collection
  });

  itemList.render();

  window.collection = collection;

})();