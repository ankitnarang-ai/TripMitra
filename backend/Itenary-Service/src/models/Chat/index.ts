import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  user_id: String,
  message: String,
  sender: { type: String, enum: ['user', 'ai'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const PreferenceSchema = new mongoose.Schema({
  user_id: String,
  preferences: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
});

export const Chat = mongoose.model('Chat', ChatSchema);
export const Preference = mongoose.model('Preference', PreferenceSchema);