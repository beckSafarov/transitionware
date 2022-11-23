import express from 'express';
const router = express.Router();
import { authUser, logout, me, signUser } from '../controllers/authControllers.js';

router.route('/').post(signUser);

router.route('/me').get(me);
router.route('/login').post(authUser);
router.route('/logout').put(logout);


export default router;

