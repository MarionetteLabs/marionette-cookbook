(function() {

  var userList = [
   { username: 'James', age: 23, cool: false },
   { username: 'SamCcone', age: 54, cool: undefined },
   { username: 'Cobbweb', age: NaN, cool: 'Australian' },
   { username: 'Derrick Bailey', age: -20, cool: true },
  ];

  var userCollection = new Backbone.Collection(userList);

  var ContentView = Marionette.ItemView.extend({
    template: '#template-tab-content'
  });

  /*
   * Configure the tabs
   */
  ColorView = Marionette.ItemView.extend({
    template: '#template-color-item',
    tagName: 'li',
    events: {
      'click': 'updateBody'
    },

    updateBody: function() {
      tabLayout.body.show( new ContentView({model:this.model}) );
    }
  });

  collectionView = new Marionette.CollectionView({
    tagName: 'ul',
    itemView: ColorView,
    collection: userCollection,

  });

  window.TabLayout = Marionette.Layout.extend({
    regions: {
      menu: 'nav',
      body: 'div'
    },



  });

  setup = function() {
    window.tabLayout = new TabLayout({
      el: '.tabs',
      template: "#layout-template",
    });

    tabLayout.render();
    tabLayout.menu.show( collectionView );
    tabLayout.body.show( new ContentView({model:userCollection.models[0]}) );
  }

  setup()


})();
