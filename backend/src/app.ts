import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Version 1 Gateway
app.use('/api/v1', routes);

// Centralized Error Handling
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`FluentAI Backend API Server running on port ${config.port} (env: ${config.nodeEnv})`);
  });
}

export default app;
