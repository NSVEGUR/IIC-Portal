import { Request, Response, NextFunction } from 'express';
import { StoryModel } from '../models/story.model';
import catchAsync from '../util/catchAsync.util';


const ensureAuth = function (req: Request, res: Response, next: NextFunction) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/')
	}
}

const ensureGuest = function (req: Request, res: Response, next: NextFunction) {
	if (!req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/dashboard');
	}
}

const login = function (req: Request, res: Response, next: NextFunction) {
	res.render('login', {
		layout: 'login',
	});
}

const autoLogin = catchAsync(async function (req: any, res: Response, next: NextFunction) {
	{
		const stories = await StoryModel.find({ user: req.user.id }).lean()
		res.render('dashboard', {
			layout: 'layouts/main',
			name: req.user.firstName,
			stories,
		})
	}
})

export {
	ensureAuth, ensureGuest, login, autoLogin,
}