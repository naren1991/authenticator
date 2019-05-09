var passport = require('passport')

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: "258933609779-n0mbaln0hl2r0vsbtot90kkicqv3d6do.apps.googleusercontent.com",
            clientSecret: "twPREijxFtNw4RbaeM6Q4oPA",
            callbackURL: "http://localhost:3000/authenticate/google/callback"
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};