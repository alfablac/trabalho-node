const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;

function extractProfile(profile) {
    let imageUrl = '';
    if (profile.photos && profile.photos.length) {
      imageUrl = profile.photos[0].value;
    }
    return {
      id: profile.id,
      displayName: profile.displayName,
      image: imageUrl,
    };
  }

passport.use(new GoogleStrategy({
    clientID: "XXXXXXXXXXXXXXXXXXXXXX",
    clientSecret: "XXXXXXXXXXXXXXXXXX",
    callbackURL: "XXXXXXXXXXXXXXXXXXXXXXXX/auth/google/callback",
    accessType: 'offline',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
},
    (accessToken, refreshToken, profile, cb) => {
        cb(null, extractProfile(profile));
    }
)
);

passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});