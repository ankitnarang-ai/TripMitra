// src/server.ts (or index.ts)
import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectMongoose, closeMongoose } from './config/db/index.js'

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    await connectMongoose();

    const server = app.listen(PORT, () => {
      console.log(`🚀 Monitor service is running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    });

    const shutdown = async (signal: string) => {
      console.log(`👋 ${signal} received. Shutting down gracefully...`);
      server.close(async (err?: any) => {
        if (err) {
          console.error('Error closing server', err);
          process.exit(1);
        }
        try {
          await closeMongoose();
          console.log('🟢 Mongoose closed');
          process.exit(0);
        } catch (closeErr) {
          console.error('Error closing mongoose', closeErr);
          process.exit(1);
        }
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (err) {
    console.error('Failed to start application', err);
    process.exit(1);
  }
}

start();
