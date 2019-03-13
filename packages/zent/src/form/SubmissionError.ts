import ExtendableError from 'es6-error';

export class SubmissionError extends ExtendableError {
  errors: unknown;

  constructor(errors: unknown) {
    super('Submit Validation Failed');
    this.name = 'SubmissionError';
    this.errors = errors;
  }
}

export function isSubmissionError(val) {
  return val instanceof SubmissionError;
}

export default SubmissionError;
