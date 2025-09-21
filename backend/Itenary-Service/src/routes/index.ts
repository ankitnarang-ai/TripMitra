import express from 'express';
import { getChats, sendChat } from '../controllers/chat/index.js';
import { getPreferences, savePreferences } from '../controllers/preferences/index.js';


const router = express.Router();

router.post('/chat', sendChat);
router.get('/chat', getChats);

router.post('/preferences', savePreferences);
router.get('/preferences', getPreferences);

export default router;