import express from 'express';
import { deleteUsers, getAllUsers, toggleBlockUsers } from '../controllers/userControllers.js';
const router = express.Router();

router.route('/').get(getAllUsers).put(toggleBlockUsers).delete(deleteUsers)


export default router;

