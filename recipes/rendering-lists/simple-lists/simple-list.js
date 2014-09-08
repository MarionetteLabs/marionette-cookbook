(function() {

  // Here's the list of objects that we will be displaying
  var colorList = [
    { colorName: 'black', hex: '#000' },
    { colorName: 'white', hex: '#fff' },
    { colorName: 'blue',  hex: '#419ad8' },
    { colorName: 'gold',  hex: '#d6ba65'}
  ];

  // Create a collection out of our list
  var collection = new Backbone.Collection(colorList);

  // Instantiate a new item view, giving it an element,
  // a template, and our collection
  window.listView = new Marionette.ItemView({
    el: 'ul.list',
    template: '#template-color-list',
    collection: collection
  });

  listView.render();

})();
