import ExtendableError from 'zent-utils/es6-error';

class SubmissionError extends ExtendableError {
  constructor(errors) {
    super('Submit Validation Failed');
    this.errors = errors;
  }
}

export default SubmissionError;
