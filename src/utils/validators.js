import { ValidationError } from './errors';

export function validateWebhookResponse(data) {
  if (!data) {
    throw new ValidationError('Response data is missing');
  }

  if (typeof data.result === 'undefined' && typeof data.message === 'undefined') {
    throw new ValidationError('Response must include a result or message field');
  }

  // Normalize the response format
  if (typeof data.message !== 'undefined' && typeof data.result === 'undefined') {
    data.result = data.message;
  }

  if (data.status && typeof data.status !== 'number') {
    throw new ValidationError('Status must be a number');
  }
}
