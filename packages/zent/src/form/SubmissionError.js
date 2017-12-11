import ExtendableError from 'es6-error';

class SubmissionError extends ExtendableError {
  constructor(errors) {
    super('Submit Validation Failed');
    this.name = 'SubmissionError';
    this.errors = errors;
  }
}

export default SubmissionError;
