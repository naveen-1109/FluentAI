import { 
  PutObjectCommand, 
  GetObjectCommand, 
  DeleteObjectCommand,
  HeadObjectCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { b2Client, b2BucketName, isB2Configured } from '../config/storage';

export const ALLOWED_MIME_TYPES = [
  'audio/webm',
  'audio/webm;codecs=opus',
  'audio/wav',
  'audio/x-wav',
  'audio/mp3',
  'audio/mpeg',
  'audio/ogg',
  'audio/m4a',
  'audio/aac'
];

export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB

export class B2StorageService {
  /**
   * Constructs the private key path for audio files: audio/{userId}/{sessionId}/recording.webm
   */
  public getAudioKey(userId: string, sessionId: string, filename: string = 'recording.webm'): string {
    const cleanFilename = filename.endsWith('.webm') || filename.endsWith('.wav') || filename.endsWith('.mp3')
      ? filename
      : 'recording.webm';
    return `audio/${userId}/${sessionId}/${cleanFilename}`;
  }

  /**
   * Uploads an audio Buffer to private Backblaze B2 bucket
   */
  async uploadAudioBuffer(
    userId: string, 
    sessionId: string, 
    buffer: Buffer, 
    contentType: string = 'audio/webm',
    filename: string = 'recording.webm'
  ): Promise<{ key: string; bucket: string; size: number; contentType: string }> {
    // 1. Validate file size
    if (buffer.length > MAX_FILE_SIZE_BYTES) {
      throw new Error(`File size (${(buffer.length / (1024 * 1024)).toFixed(2)} MB) exceeds maximum allowed limit of 50 MB`);
    }

    // 2. Validate MIME type
    const normalizedType = contentType.split(';')[0].toLowerCase();
    const isAllowed = ALLOWED_MIME_TYPES.some((type) => type.toLowerCase().startsWith(normalizedType));
    if (!isAllowed) {
      throw new Error(`Unsupported audio MIME type: "${contentType}". Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`);
    }

    const key = this.getAudioKey(userId, sessionId, filename);

    if (isB2Configured) {
      try {
        const command = new PutObjectCommand({
          Bucket: b2BucketName,
          Key: key,
          Body: buffer,
          ContentType: contentType,
        });

        await b2Client.send(command);
      } catch (err: any) {
        console.error("Backblaze B2 Upload Error:", err);
        throw new Error(`Backblaze B2 upload failed: ${err?.message || 'Storage service error'}`);
      }
    } else {
      console.warn("B2 Storage warning: Real B2 credentials not configured; operating in local/simulated mode.");
    }

    return { 
      key, 
      bucket: b2BucketName, 
      size: buffer.length, 
      contentType 
    };
  }

  /**
   * Generates a secure pre-signed GET URL for temporary playback of private audio files directly from audioKey
   */
  async getSignedPlaybackUrlFromKey(
    key: string,
    expiresInSeconds: number = 3600
  ): Promise<string> {
    if (isB2Configured) {
      try {
        const command = new GetObjectCommand({
          Bucket: b2BucketName,
          Key: key,
        });

        return await getSignedUrl(b2Client, command, { expiresIn: expiresInSeconds });
      } catch (err: any) {
        console.error("Backblaze B2 Pre-signed URL Error:", err);
        throw new Error(`Failed to generate pre-signed playback URL: ${err?.message || 'Storage service error'}`);
      }
    }

    return `https://s3.us-east-005.backblazeb2.com/${b2BucketName}/${key}?token=simulated-presigned-token`;
  }

  /**
   * Generates a secure pre-signed GET URL for temporary playback of private audio files
   */
  async getSignedPlaybackUrl(
    userId: string, 
    sessionId: string, 
    filename: string = 'recording.webm',
    expiresInSeconds: number = 3600
  ): Promise<string> {
    const key = this.getAudioKey(userId, sessionId, filename);
    return this.getSignedPlaybackUrlFromKey(key, expiresInSeconds);
  }

  /**
   * Checks if an audio object exists in the private B2 bucket
   */
  async doesObjectExist(userId: string, sessionId: string, filename: string = 'recording.webm'): Promise<boolean> {
    const key = this.getAudioKey(userId, sessionId, filename);

    if (!isB2Configured) return true;

    try {
      const command = new HeadObjectCommand({
        Bucket: b2BucketName,
        Key: key,
      });
      await b2Client.send(command);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Retrieves audio object buffer from private Backblaze B2 bucket
   */
  async getAudioObjectBuffer(key: string): Promise<Buffer> {
    if (!isB2Configured) {
      throw new Error("Backblaze B2 is not configured");
    }

    try {
      const command = new GetObjectCommand({
        Bucket: b2BucketName,
        Key: key,
      });

      const response = await b2Client.send(command);
      if (!response.Body) {
        throw new Error(`Empty response body for object key: ${key}`);
      }

      const byteArray = await response.Body.transformToByteArray();
      return Buffer.from(byteArray);
    } catch (err: any) {
      console.error("Backblaze B2 Download Error:", err);
      throw new Error(`Failed to retrieve audio object from Backblaze B2: ${err?.message || 'Storage error'}`);
    }
  }

  /**
   * Deletes an audio file from private Backblaze B2 bucket
   */
  async deleteAudio(userId: string, sessionId: string, filename: string = 'recording.webm'): Promise<boolean> {
    const key = this.getAudioKey(userId, sessionId, filename);

    if (isB2Configured) {
      try {
        const command = new DeleteObjectCommand({
          Bucket: b2BucketName,
          Key: key,
        });

        await b2Client.send(command);
      } catch (err: any) {
        console.error("Backblaze B2 Delete Error:", err);
        throw new Error(`Failed to delete audio file: ${err?.message || 'Storage error'}`);
      }
    }

    return true;
  }
}
