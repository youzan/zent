import {
  IValidator,
  isAsyncValidator,
  createAsyncValidator,
  IMaybeError,
  ValidatorContext,
} from '../validate';
import { of, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { markForRequired, isRequiredValidator } from '../validators';

function withMessage<V = unknown>(
  maybeError: IMaybeError<V>,
  messagenerator: (ctx: ValidatorContext<V>) => string,
  ctx: ValidatorContext<V>
) {
  return maybeError && { ...maybeError, message: messagenerator(ctx) };
}

/**
 * 为校验错误设定动态的message
 * @param messagenerator
 */
export function message<V = unknown>(
  messagenerator: (ctx: ValidatorContext<V>) => string
) {
  return (validator: IValidator<V>) => {
    const next: IValidator<V> = isAsyncValidator(validator)
      ? createAsyncValidator<V>((value, context) => {
          const result = validator.validator(value, context);

          return (
            result &&
            from(result).pipe(
              switchMap(maybeError =>
                of(withMessage(maybeError, messagenerator, context))
              )
            )
          );
        })
      : (value: V, context: ValidatorContext<V>) => {
          return withMessage(
            validator(value, context),
            messagenerator,
            context
          );
        };
    isRequiredValidator(validator) && markForRequired(next);
    return next;
  };
}
