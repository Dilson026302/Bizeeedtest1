export class WebhookError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'WebhookError';
    this.statusCode = statusCode; // Optional property
  }
}

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}
