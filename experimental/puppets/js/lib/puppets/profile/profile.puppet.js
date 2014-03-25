/*
 *
 * Profile Puppet
 * Defines a view that displays information about a user
 * This is in /lib because it's meant to be taken out
 * to be used in other applications. It has no ties
 * to anything in the current application.
 *
 */

(function() {

  // Puppets are Modules
  var ProfilePuppet = Marionette.Module.extend({

    defaults: {
      
    },

    initialize: function( options ) {

      var self = this;
      this.puppetName = options.puppetName;
      this.profileOptions = options.viewOptions;

      // Set up the profile
      var ProfileView = Marionette.View.extend({
        template: '<div><h1><%= firstName %></h1></div>',
        initialize: function(viewOptions) {

        }
      });

      // Expose our puppet to the world as a FutureVariable
      // Allow the user to override the defaults when they request it
      futureVars.publish( this.puppetName, function(viewOptions) {
        viewOptions = viewOptions || self.viewOptions;
        return new ProfileView( viewOptions );
      });

    }

  });

  globalCh.reqres.setHandler( 'Profile.Puppet', function() {
    return ProfilePuppet;
  });

})();

