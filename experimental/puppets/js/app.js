/*
 *
 * app
 * Define a basic application. This can be used for every application.
 *
 */

(function() {

  // Create our app, and start it
  var app = new Marionette.Application();

  // Start it up
  app.start();

  // Attach our global messaging protocols,
  // though you shouldn't access them from app
  var globalCh = Backbone.radio.channel( 'global' );
  app.vent = globalCh.vent;
  app.reqres = globalCh.reqres;
  app.commands = globalCh.commands;

  // Attach it the window.
  window.app = app;

  // Everyone uses the global channel!
  window.globalCh = globalCh;

})();