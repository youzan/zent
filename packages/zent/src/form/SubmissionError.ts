import ExtendableError from '../utils/ExtendableError';

class SubmissionError extends ExtendableError {
  errors: string[] | string;

  constructor(errors: string[] | string) {
    super('Submit Validation Failed');
    this.name = 'SubmissionError';
    this.errors = errors;
  }
}

export function isSubmissionError(val) {
  return val instanceof SubmissionError;
}

export default SubmissionError;
