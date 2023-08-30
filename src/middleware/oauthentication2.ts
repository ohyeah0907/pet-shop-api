import express, { Request, Response } from 'express';
import schema from '../schema/auth';
import asyncHandler from '../handler/asyncHandler';
import validator, { ValidationSource } from './validator';
import { BadRequestResponse } from '../handler/app-response';

const router = express.Router();

const isAuthenticated = (req: Request, res: Response, next: any) => {
    if (req.isAuthenticated()) return next();
    const queryString = Object.keys(req.query).map(key => key + '=' + req.query[key]).join('&');
    return res.redirect(`/oauth2/login?${queryString}`);
}

export default isAuthenticated;