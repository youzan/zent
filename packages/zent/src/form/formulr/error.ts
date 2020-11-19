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

export const NullModelReferenceError = new FormulrError(
  "Expected a 'Model' instance when execute 'ModelRef#getModel', got null",
  [
    "Execute 'FieldArrayModel#getRawValue' or 'FieldArrayModel#getSubmitValue' in render phase rather than effect or callback",
    "Use custom field component which doesn't support 'ModelRef' type on 'model' prop as the children of FieldArray",
  ]
);

export const createUnexpectedModelError = (it: unknown) =>
  new FormulrError(
    `Expected a 'ModelRef' instance or 'BasicModel' instance, got ${typeof it}`,
    "The first argument to form hooks is an unexpected type rather than string or 'Model'"
  );
