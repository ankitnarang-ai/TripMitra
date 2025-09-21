import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import { sendChat } from './controllers/chat/index.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan('Method: :method | URL: :url | Status: :status | Response Time: :response-time ms'));
app.use(cors({
  origin: true, 
  credentials: true,
}));

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    message: 'Monitor Service is healthy', 
    timestamp: new Date().toISOString() 
  });
});

app.use('/api', router);

// 404 handler for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global error handler (must be last middleware)
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error occurred:', error.message);
  console.error('Stack trace:', error.stack);
  
  return res.status(500).json({ 
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { error: error.message })
  });
});

export default app;