import { S3Client, HeadBucketCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config();

async function testB2Connection() {
  console.log('Testing Backblaze B2 S3 SDK Connectivity...');
  console.log(`Bucket Name: ${process.env.B2_BUCKET_NAME}`);
  console.log(`Region: ${process.env.B2_REGION}`);
  console.log(`Endpoint: ${process.env.B2_ENDPOINT}`);
  console.log(`Key ID Loaded: ${Boolean(process.env.B2_APPLICATION_KEY_ID)}`);
  console.log(`Key Secret Loaded: ${Boolean(process.env.B2_APPLICATION_KEY)}`);

  const client = new S3Client({
    endpoint: process.env.B2_ENDPOINT || 'https://s3.us-east-005.backblazeb2.com',
    region: process.env.B2_REGION || 'us-east-005',
    credentials: {
      accessKeyId: process.env.B2_APPLICATION_KEY_ID || '',
      secretAccessKey: process.env.B2_APPLICATION_KEY || '',
    },
    forcePathStyle: true,
  });

  const bucket = process.env.B2_BUCKET_NAME || 'fluentai-audio-152853819342';

  try {
    const headCmd = new HeadBucketCommand({ Bucket: bucket });
    await client.send(headCmd);
    console.log(`✅ HeadBucket Successful: Bucket "${bucket}" exists and is accessible!`);

    const listCmd = new ListObjectsV2Command({ Bucket: bucket, MaxKeys: 5 });
    const listRes = await client.send(listCmd);
    console.log(`✅ ListObjectsV2 Successful: Found ${listRes.KeyCount || 0} objects in bucket.`);
    if (listRes.Contents && listRes.Contents.length > 0) {
      console.log('Sample Object Keys:');
      listRes.Contents.forEach((item) => console.log(` - ${item.Key} (${item.Size} bytes)`));
    }
  } catch (err: any) {
    console.error('❌ B2 Connectivity Test Failed:', err?.message || err);
    process.exit(1);
  }
}

testB2Connection();
