import type { IModel } from './models/base';
import { typeOfModel } from './models/is';
import { isArray } from './utils';

export class FormulrError extends Error {
  constructor(message: string, reason: string | string[]) {
    super(
      `${message}.\n` +
        'The possible reason(s) for this error: \n' +
        (isArray(reason)
          ? reason.map((it, index) => `  ${index + 1}. ${it}`).join('\n')
          : `  ${reason}`) +
        '\n'
    );
    this.name = 'FormulrError';
  }
}

export const FormContextNotFoundError = new FormulrError(
  'FormContext not found',
  [
    'Using form hooks outside the form context',
    'There are two copies of zent in your project, run `yarn list zent` to check',
    'Mixed use of Form from zent and formulr, formulr is a deprecate package',
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

export const createModelDisposedError = (name: string) =>
  new FormulrError('Model is disposed', [
    `You are swapping two different Fields with the same 'name' in View mode and 'destroyOnUnmount' is set on the Field being swapped out`,
    `You are using a disposed ${name} in your view, your UI and models are likely in a broken state`,
  ]);
