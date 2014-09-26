var express= require('express');
var app= express();
var path= require('path');
var passport= require('passport');
var GoogleStrategy=require('passport-google').Strategy;
var isAuthenticated= false;
app.use(passport.initialize());
app.use(passport.session());
var port = process.env.PORT || 3838;
app.set('views',__dirname+'/public/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req,res){
    // if(isAuthenticated==false)
    // {
    //     res.redirect('/auth/google');
    // }
    //res.redirect('/auth/google')
    res.render("index");
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    returnURL:'http://localhost:3000/auth/google/return',
    realm: 'http://localhost:3000/'
    },
 function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      console.log(profile);
      return done(null, profile);
    });
  }
));

app.get('/auth/google',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res){
    //console.log("sucessful authentication 1");
    //res.redirect('/');
  });

app.get('/auth/google/return',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    isAuthenticated==true;
    //console.log("sucessful authentication 2");
    res.redirect('/');
  });


app.listen(port);