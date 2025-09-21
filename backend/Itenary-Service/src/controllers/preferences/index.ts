import { type Request, type Response } from 'express';
import { Preference } from '../../models/Chat/index.js';

const DEMO_USER_ID = "12345";

// Save preferences
export const savePreferences = async (req: Request, res: Response) => {
  try {
    const { preferences } = req.body;

    const pref = new Preference({ user_id: DEMO_USER_ID, preferences });
    await pref.save();

    res.json({ ok: true, pref });
  } catch (err: any) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

// Get preferences
export const getPreferences = async (req: Request, res: Response) => {
  const prefs = await Preference.find({ user_id: DEMO_USER_ID }).sort({ createdAt: -1 });
  res.json(prefs);
};
