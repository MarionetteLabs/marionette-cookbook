Application.Modal.Controller = Marionette.Controller.extend({
  initialize: function (options) {
    this.container = options.container;
    this.view = new Application.Modal.View();
    this.container.show(this.view);

    _.bindAll(this, 'openModal', 'closeModal');
    Application.Modal.channel.commands.setHandler('open', this.openModal);
    Application.Modal.channel.commands.setHandler('close', this.closeModal);
  },

  openModal: function (options) {
    this.view.openModal(options);
  },

  closeModal: function (options) {
    this.view.closeModal(options);
  }
});
