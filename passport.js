const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");

passport.use(
    new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
            scope: ["profile", "email"],
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('Profile:', profile);
            done(null, profile);
        })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});