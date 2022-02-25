import { Request, Response, NextFunction } from 'express';
import AppError from '../util/appError.util';
import catchAsync from "../util/catchAsync.util";
import { StoryModel } from './../models/story.model';


const renderAddStory = catchAsync(async function (req: Request, res: Response, next: NextFunction) {
	res.render('stories/add');
})

const addStory = catchAsync(async function (req: any, res: Response, next: NextFunction) {
	req.body.user = req.user.id;
	await StoryModel.create(req.body);
	res.redirect('/dashboard');
});

const getAllStories = catchAsync(async function (req: Request, res: Response, next: NextFunction) {
	const stories = await StoryModel.find({ status: 'public' })
		.populate('user')
		.sort({ createdAt: 'desc' })
		.lean()

	res.render('stories/index', {
		stories,
		layout: 'layouts/main',
	})
});

const getStory = catchAsync(async function (req: any, res: Response, next: NextFunction) {
	let story = await StoryModel.findById(req.params.id).populate('user').lean()

	if (!story) return next(new AppError('Story not found', 404));

	if (story.user._id != req.user.id && story.status == 'private') {
		return next(new AppError('Story is private or you are not the user', 400));
	} else {
		res.render('stories/show', {
			story,
			layout: 'layouts/main',
		})
	}

});

const renderUpdateStory = catchAsync(async function (req: any, res: Response, next: NextFunction) {
	const story = await StoryModel.findOne({
		_id: req.params.id,
	}).lean()

	if (!story) {
		return res.render('error/404')
	}

	if (story.user != req.user.id) {
		res.redirect('/stories')
	} else {
		res.render('stories/edit', {
			story,
		})
	}
});

const updateStory = catchAsync(async function (req: any, res: Response, next: NextFunction) {
	let story = await StoryModel.findById(req.params.id).lean()

	if (!story) {
		return res.render('error/404')
	}

	if (story.user != req.user.id) {
		res.redirect('/stories')
	} else {
		story = await StoryModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
			new: true,
			runValidators: true,
		})

		res.redirect('/dashboard')
	}
});

const deleteStory = catchAsync(async function (req: any, res: Response, next: NextFunction) {
	let story = await StoryModel.findById(req.params.id).lean()

	if (!story) return next(new AppError('Story not found', 404));

	if (story.user != req.user.id) {
		res.redirect('/stories');
	} else {
		await StoryModel.remove({ _id: req.params.id })
		res.redirect('/dashboard');
	}
});

const getUserStories = catchAsync(async function (req: any, res: Response, next: NextFunction) {
	const stories = await StoryModel.find({
		user: req.params.userId,
		status: 'public',
	})
		.populate('user')
		.lean()

	res.render('stories/index', {
		stories,
	});
})


export {
	renderAddStory, addStory, getAllStories, getStory, renderUpdateStory, updateStory, deleteStory, getUserStories
}