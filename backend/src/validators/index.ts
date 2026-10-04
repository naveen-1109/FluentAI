import type { SpeakingSessionStatus, PracticeType } from '../types/firestore';

export function validateSpeakingSessionPayload(data: any): { valid: boolean; error?: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid payload body' };
  }

  const allowedStatuses: SpeakingSessionStatus[] = ['RECORDED', 'PROCESSING', 'COMPLETED', 'FAILED'];
  if (data.status && !allowedStatuses.includes(data.status)) {
    return { valid: false, error: `Invalid status. Must be one of: ${allowedStatuses.join(', ')}` };
  }

  if (data.durationSeconds !== undefined && (typeof data.durationSeconds !== 'number' || data.durationSeconds < 0)) {
    return { valid: false, error: 'durationSeconds must be a non-negative number' };
  }

  return { valid: true };
}

export function validatePracticeSessionPayload(data: any): { valid: boolean; error?: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid payload body' };
  }

  const allowedTypes: PracticeType[] = ['PRONUNCIATION', 'FLUENCY', 'GRAMMAR', 'VOCABULARY', 'SPEAKING'];
  if (!data.type || !allowedTypes.includes(data.type)) {
    return { valid: false, error: `Invalid practice type. Must be one of: ${allowedTypes.join(', ')}` };
  }

  if (data.score !== undefined && (typeof data.score !== 'number' || data.score < 0 || data.score > 100)) {
    return { valid: false, error: 'Score must be a number between 0 and 100' };
  }

  return { valid: true };
}
