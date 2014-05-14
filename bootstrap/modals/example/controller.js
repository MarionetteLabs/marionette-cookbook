Application.Example.Controller = Marionette.Controller.extend({
  initialize: function (options) {
    this.container = options.container;
    this.view = new Application.Example.View();
    this.container.show(this.view);
  }
});
