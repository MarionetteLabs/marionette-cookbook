/*
 * profiles.profile
 * Defines a profile
 *
 */

app.module( 'profiles.profile', {

  // Use the puppet we defined in /lib
  moduleClass: globalCh.reqres.request( 'Profile.Puppet' ),

  // This is the name. Think of the Puppet as the class and this as
  // the name of the instance
  puppetName: 'profile',

  // These are options that our Puppet accepts
  viewOptions: {

  }

});