Application.Example.View = Marionette.ItemView.extend({
  template: '#example-template',

  events: {
    'click button' : 'openModal'
  },

  openModal: function () {
    var modalView = new Application.Example.ModalView();
  }
});
