import passport from 'passport';
import passportLocal from 'passport-local';
import userService from '../services/UserService';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { Request } from 'express';

const LocalStrategy = passportLocal.Strategy;
let initPassportLocal = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        session: true,
        passReqToCallback: true
    }, async (req: Request, email: string, password: string, done) => {
        console.log(req.user)
        try {
            const user: any = await userService.getUserByEmail(email);
            if (!user) return done(null, false, { message: `Không tìm thấy email` });

            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) return done(null, false, { message: `Sai mật khẩu` });

            if (!user.is_verified) return done(null, false, { message: `Tài khoản chưa được xác thực` });

            if (user.is_locked) return done(null, false, { message: `Tài khoản đã bị khóa` });

            return done(null, user);
        } catch (error: any) {
            return done(null, false, { message: error.message });
        }
    }
    ));

}
passport.serializeUser(function (user: any, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id: number, done) {
    const user: any = await userService.getUserById(id);
    done(null, user);
})



export default initPassportLocal;