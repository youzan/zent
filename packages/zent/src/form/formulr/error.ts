import { isArray } from './utils';

export class FormulrError extends Error {
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

export const UnexpectedFormStrategyError = new FormulrError(
  'Unexpected FormStrategy',
  'The first argument to form hooks is string in a model-driven form context'
);
