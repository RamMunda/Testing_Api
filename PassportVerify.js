
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.

passport.serializeUser(function(user,done){
    done(null,user);
})

passport.deserializeUser(function(user,done){
    done(null,user);
})
passport.use(new GoogleStrategy({
    clientID: '513761049900-jjpj7osv1gut1ank8m2e2tru7eck2u10.apps.googleusercontent.com',
    clientSecret:'a1yw8AHPOnKS4wJ1AdEYkc36',
    callbackURL: "http://localhost:5000/google/callback"
  },
  function(req,accessToken, refreshToken, profile, done) {
      console.log(profile);
      done(null,profile);
      return null;
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));