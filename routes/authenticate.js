var config = require('./oauth.js')
var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./user.js')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/hashtagfight');

//passport
module.exports = passport.use(new TwitterStrategy({
    consumerKey: config.twitter.consumerKey,
    consumerSecret: config.twitter.consumerSecret,
    callbackURL: config.twitter.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({oauthID: profile.id}, function(err, user) {
      if (err) { return done(err); }

      if (!err && user != null) {
        done(null, user);
      } else {
        var user = new User({
          oauthID: profile.id,
          name: profile.displayName,
          created: Date.now()
        });
        user.save(function(err) {
          if(err) {
              console.log(err);
          } else {
              console.log("saving user ...");
              done(null, user);
          };
        });
      }
    });
  }
));

var ids = {
    facebook: {
        clientID: "",
        clientSecret: "",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    twitter: {
        consumerKey: "",
        consumerSecret: "",
        callbackURL: "http://localhost:3000/auth/twitter/callback",
        accessToken: "",
        accessTokenSecret: ""
    }
}

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
        passport.authenticate('twitter', { successRedirect: '/fight',
                                           failureRedirect: '/' }));

