Application.Layout = Marionette.Layout.extend({
  el: '#application',
  template: '#application-layout-template',

  regions: {
    content: '.application__content',
    overlay: '.application__overlay'
  }
});
