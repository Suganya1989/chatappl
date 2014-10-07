var GoogleStrategy=require('passport-google').Strategy;
var passport= require('passport');
var urlhost= require('./app.js');
var url=require('url');


var gpassport=  passport.use(new GoogleStrategy({
    returnURL:'http://chatappl.azurewebsites.net/auth/google/return',
    realm: 'http://chatappl.azurewebsites.net/'
    },
 function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;

      return done(null, profile);
    });
  }
));



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

