import { Request, Response } from 'express';

const isAuthenticated = (req: Request, res: Response, next: any) => {
    if (req.isAuthenticated()) return next();
    const queryString = Object.keys(req.query).map(key => key + '=' + req.query[key]).join('&');
    return res.redirect(200, `/oauth2/login?${queryString}`);
}

export default isAuthenticated;