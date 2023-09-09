const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
require('dotenv').config();

const { socialRegister, socialUser } = require('../service/auth/authServices');

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_KEY,
      clientSecret: process.env.LINKEDIN_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ['r_emailaddress', 'r_liteprofile']
    },
    async (token, tokenSecret, profile, done) => {
      const defaultUser = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value
      };
      try {
        const user = await socialRegister(defaultUser);
        if (user) {
          return done(null, user);
        }
      } catch (error) {
        const err = {
          status: 400,
          message: 'Error signing up',
          path: 'user'
        };
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await socialUser(id);
    if (user) cb(null, user);
  } catch (error) {
    const err = {
      status: 400,
      message: 'Error signing up',
      path: 'user'
    };
    cb(err, null);
  }
});
