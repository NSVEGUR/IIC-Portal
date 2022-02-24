import express from 'express';
import { authenticate, protect, redirect, logout } from './../controller/auth.controller';

const router = express.Router();

router.get('/google', authenticate);
router.get(
	'/google/callback',
	protect,
	redirect,
);
router.get('/logout', logout);

export default router;
