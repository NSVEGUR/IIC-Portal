import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import catchAsync from '../util/catchAsync.util';

const authenticate = passport.authenticate('google', { scope: ['profile'] });


const protect = passport.authenticate('google', { failureRedirect: '/' });

const redirect = catchAsync(async function (req: Request, res: Response, next: NextFunction) {
	res.redirect('/dashboard');
});

const logout = catchAsync(async function (req: Request, res: Response, next: NextFunction) {
	req.logout();
	res.redirect('/');
});

export {
	authenticate, protect, redirect, logout,
}