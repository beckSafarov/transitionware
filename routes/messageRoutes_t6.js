import express from 'express';
import { checkInbox, getAllMessages, getMessagesForCouple, sendMessage } from '../controllers/messageControllers_t6.js';
const router = express.Router();

router.post('/', sendMessage)
router.get('/all', getAllMessages)
router.get('/couple', getMessagesForCouple)
router.get('/inbox', checkInbox)

export default router;

