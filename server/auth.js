import { config } from "dotenv";
config();

import passport from "passport";
import { Strategy as TwitchStrategy } from "passport-twitch-new";

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new TwitchStrategy({
  clientID: process.env.TWITCH_CLIENT_ID,
  clientSecret: process.env.TWITCH_CLIENT_SECRET,
  callbackURL: process.env.TWITCH_CALLBACK_URL,
  scope: "user:read:email"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

export default passport;