var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

// passport.serializeUser(function(user,done){
//     done(null,user);
// })

// passport.deserializeUser(function(user,done){
//     done(null,user);
// })

passport.use(new FacebookStrategy({
    clientID: "690817538260558",
    clientSecret: "c7551d678a989a363ec9e98728965314",
    callbackURL: "http://localhost:5000/facebook/callback",
    profileFields : [ 'id', 'displayName','name', 'gender', 'picture.type(large)','email']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('a');
    console.log(profile);
    return done(null, profile);
    User.findOrCreate(function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));