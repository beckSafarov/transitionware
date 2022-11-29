import express from 'express';
import { getAllUsers } from '../controllers/userControllers_t6';
const router = express.Router();

router.route('/').get(getAllUsers)


export default router;

