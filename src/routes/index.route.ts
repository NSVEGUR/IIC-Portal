import express from 'express';
import { ensureAuth, ensureGuest, login, autoLogin } from './../controller/index.controller';

const router = express.Router();


router.get('/', ensureGuest, login);
router.get('/dashboard', ensureAuth, autoLogin);

export default router;