import passport from "passport";
import passportGoogle, {
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import googleConstants from "../constants/google";
import { Request } from "express";
import userService from "../services/UserService";
import { BadRequestResponse } from "../handler/app-response";

const GoogleStrategy = passportGoogle.Strategy;

let initPassportSocial = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleConstants.clientId,
        clientSecret: googleConstants.clientSecret,
        callbackURL: googleConstants.callBackUrl,
        passReqToCallback: true,
      },
      async (
        req: Request,
        access_token,
        refresh_token,
        profile: Profile,
        done: VerifyCallback,
      ) => {
        const authorize = (req.session as any).authorize;
        console.log("authorize :>> ", authorize);
        done(null, {
          profile: profile,
          access_token: access_token,
          authorize: authorize,
        });
      },
    ),
  );
};
passport.serializeUser((user, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});
export default initPassportSocial;
