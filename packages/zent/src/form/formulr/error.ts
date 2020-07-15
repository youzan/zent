import { isArray } from './utils';

class FormulrError extends Error {
  constructor(message: string, reason: string | string[]) {
    super(
      `${message}.\n` +
        'The possible reason(s) for this error: ' +
        (isArray(reason)
          ? '\n' +
            reason.map((it, index) => `    ${index + 1}. ${it}`).join(';\n') +
            ';'
          : reason + '.') +
        '\n'
    );
    this.name = 'FormulrError';
  }
}

export const UnexpectedFormContextError = new FormulrError(
  'FormContext not found',
  [
    'Using form hooks outside the form context',
    "There's a copy of zent in your project, run `yarn list zent` to check",
  ]
);

export const UnexpectedFormStrategyError = new FormulrError(
  'Unexpected FormStrategy',
  'The first argument to form hooks is string in a model-driven form context'
);
