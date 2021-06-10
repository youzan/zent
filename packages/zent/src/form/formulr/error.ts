import type { IModel } from './models/base';
import { typeOfModel } from './models/is';
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

export const FormContextNotFoundError = new FormulrError(
  'FormContext not found',
  [
    'Using form hooks outside the form context',
    "There's a copy of formulr in your project, run `yarn list formulr` to check",
  ]
);

export const createUnexpectedModelTypeError = (
  name: string,
  expectedType: string,
  model: IModel<unknown>
) =>
  new FormulrError(
    'Model type mismatch',
    `Model '${name}' is expected to be a '${expectedType}', but got a '${typeOfModel(
      model
    )}'.`
  );

export const createModelNotFoundError = (name: string) =>
  new FormulrError(
    'Model not found',
    `Model '${name}' is not found in this form. Make sure model name is correct.`
  );

export const createUnexpectedModelError = (it: unknown) =>
  new FormulrError(
    `Expected a 'ModelRef' instance or 'BasicModel' instance, got ${typeof it}`,
    "The first argument to form hooks is an unexpected type rather than string or 'Model'"
  );
