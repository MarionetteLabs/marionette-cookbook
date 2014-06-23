/*
 *
 * app.controller
 * Configure our app.
 *
 */

app.addInitializer(function(){

  // Attach some regions
  // Suffix with `Region` to avoid collisions (it sucks, I know)
  app.addRegions({
    'profileOneRegion': '#profile-one',
    'profileTwoRegion': '#profile-two'
  });

  // Command the app to render the first profile
  globalCh.commands.setHandler( 'render:profileOne', function(profileView) {
    app.getRegion( 'profileOneRegion' ).show( profileView );
  });

  // Command the app to render the second profile
  globalCh.commands.setHandler( 'render:profileTwo', function(profileView) {
    app.getRegion( 'profileTwoRegion' ).show( profileView );
  });

  // Once the profile has loaded, render it
  globalCh.vent.on( 'profile:load', function(profileView) {
    app.getRegion( 'profileOneRegion' ).show( profileView );
  })

});
