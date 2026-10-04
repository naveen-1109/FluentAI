import { S3Client } from '@aws-sdk/client-s3';
import { config } from './env';

const isRealB2Key = Boolean(
  config.b2.keyId && 
  config.b2.applicationKey && 
  !config.b2.keyId.startsWith('demo-') &&
  !config.b2.keyId.includes('your_')
);

export const b2Client = new S3Client({
  endpoint: config.b2.endpoint,
  region: config.b2.region,
  credentials: {
    accessKeyId: isRealB2Key ? config.b2.keyId : '000000000000000000000000',
    secretAccessKey: isRealB2Key ? config.b2.applicationKey : '0000000000000000000000000000000',
  },
  forcePathStyle: true,
});

export const b2BucketName = config.b2.bucketName;
export const isB2Configured = isRealB2Key;
