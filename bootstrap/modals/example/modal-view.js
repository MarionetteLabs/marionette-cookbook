Application.Example.ModalView = Marionette.ItemView.extend({
  className: 'test',
  template: '#example-modal-template',

  behaviors: {
    Modal: {
      behaviorClass: Application.Modal.Behavior
    }
  },

  initialize: function (options) {
    this.trigger('modal:open');
  },

  events: {
    'click .btn-primary' : 'confirm',
    'click .btn-default' : 'cancel',
    'click .close' : 'cancel'
  },

  confirm: function () {
    this.trigger('modal:close');
  },

  cancel: function () {
    this.trigger('modal:close');
  }
});
