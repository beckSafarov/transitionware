import express from 'express';
import { deleteUsers, getAllUsers, toggleBlockUsers } from '../controllers/userControllers.js';
const router = express.Router();

router.route('/').get(getAllUsers).put(toggleBlockUsers)

router.route('/delete').put(deleteUsers)


export default router;

