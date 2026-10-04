import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  aiServiceUrl: process.env.AI_SERVICE_URL || 'http://localhost:8000',
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || 'fluentai-adc86',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined,
  },
  b2: {
    keyId: process.env.B2_APPLICATION_KEY_ID || process.env.B2_KEY_ID || '',
    applicationKey: process.env.B2_APPLICATION_KEY || '',
    bucketName: process.env.B2_BUCKET_NAME || 'fluentai-audio-152853819342',
    endpoint: process.env.B2_ENDPOINT || 'https://s3.us-east-005.backblazeb2.com',
    region: process.env.B2_REGION || 'us-east-005',
  },
};
