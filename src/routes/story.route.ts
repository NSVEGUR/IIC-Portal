import express from 'express';
import { ensureAuth } from './../controller/index.controller';
import {
	renderAddStory, addStory, getAllStories, getStory, renderUpdateStory, updateStory, deleteStory, getUserStories
} from './../controller/story.controller';

const router = express.Router();

router.use(ensureAuth);
router.get('/add', renderAddStory);
router.route('/').get(getAllStories).post(addStory);
router.route('/:id').get(getStory).put(updateStory).delete(deleteStory);
router.route('/edit/:id').get(renderUpdateStory);
router.route('/user/:userId').get(getUserStories);

export default router;