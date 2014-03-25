/*
 * This is a parent component for our profiles
 * Maybe it's a tab view or something
 *
 */

app.module( 'profiles', {

  startWithParent: false,

  dependencies: [
    'profile'
  ],

  // The dependency bit should be pulled out into a common class
  define: function() {

    var self = this;

    // Set our dependencies (FutureVariables)
    this._dependencies = {};
    _.each( this.options.dependencies, function(dep) {
      this._dependencies[ dep ] = futureVars.promised( 'profile' );
    }, this);

    // Start once our dependencies are loaded
    Promise.all( _.values(this._dependencies) ).then(function() {
      self.start();
    });

    this.onStart = function() {

      // Once we're started up, shout about it
      console.log( 'The profiles dependencies have loaded, and things have started up!!!' );

    }

  }

});

