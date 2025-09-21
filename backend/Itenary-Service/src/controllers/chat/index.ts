import { type Request, type Response } from 'express';
import axios from 'axios';
import { Chat } from '../../models/Chat/index.js';

const DEMO_USER_ID = "12345";
const NGROK_ENDPOINT = "https://f3557bb98b86.ngrok-free.app/response";

// Save chat and forward to ngrok API
export const sendChat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    console.log("enter");
    

    const chat = new Chat({ user_id: DEMO_USER_ID, message, sender: 'user' });
    await chat.save();

    // Call external API
    let externalResponse;
    try {
      const response = await axios.post(NGROK_ENDPOINT, {
        user_id: DEMO_USER_ID,
        user_query: message
      }, {
        headers: { 'Content-Type': 'application/json', 'accept': 'application/json' }
      });

      externalResponse = response.data;

      if (externalResponse?.reply) {
        const aiChat = new Chat({ user_id: DEMO_USER_ID, message: externalResponse.reply, sender: 'ai' });
        await aiChat.save();
      }
    } catch (err: any) {
      console.error('External API failed:', err.message);
      externalResponse = { error: err.message };
    }

    res.json({ ok: true, chat, externalResponse });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

// Get chat history
export const getChats = async (req: Request, res: Response) => {
  const chats = await Chat.find({ user_id: DEMO_USER_ID }).sort({ createdAt: 1 });
  res.json(chats);
};
