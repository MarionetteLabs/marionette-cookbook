var Application = new Marionette.Application();

// Components
Application.Modal = {};
Application.Example = {};

// Initializer
Application.addInitializer(function () {
  this.layout = new Application.Layout();
  this.layout.render();

  Application.Modal.controller = new Application.Modal.Controller({
    container: this.layout.overlay
  });

  Application.Example.controller = new Application.Example.Controller({
    container: this.layout.content
  });
});
