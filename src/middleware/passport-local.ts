import passport from 'passport';
import passportLocal from 'passport-local';
import userService from '../services/UserService';
import bcrypt from 'bcrypt';
import { Request } from 'express';
import { BadRequestResponse } from '../handler/app-response';

const LocalStrategy = passportLocal.Strategy;
let initPassportLocal = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        passReqToCallback: true,
    }, async (req: Request, email: string, password: string, done) => {
        try {
            const user: any = await userService.getUserByEmail(email);
            if (!user) return done(null, false, { message: `Không tìm thấy email` });

            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) throw new Error("Sai thông tin tài khoản");

            if (!user.is_verified) throw new Error(`Tài khoản chưa được xác thực`);

            if (user.is_locked) throw new Error(`Tài khoản chưa được kích hoạt. Liên hệ với admin để được giải quyết!`);

            return done(null, user);
        } catch (error: any) {
            return new BadRequestResponse(error.message).send(req.res!)
        }
    }
    ));

}

passport.serializeUser((user, done: any) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

export default initPassportLocal;