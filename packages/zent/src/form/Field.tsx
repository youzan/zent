import * as React from 'react';
import {
  useField,
  Validators,
  FieldModel,
  ValidateOption,
  IValidator,
  IValidators,
  FieldUtils,
} from 'formulr';
import {
  defaultRenderError,
  IFormFieldProps,
  asFormChild,
  isViewDrivenProps,
  ValidateOccasion,
  TouchWhen,
} from './shared';
import { FormControl } from './Control';
import { FormNotice } from './Notice';
import { FormDescription } from './Description';
import { $MergeParams } from './utils';
import id from '../utils/id';
import noop from '../utils/noop';

export { IFormFieldChildProps, IFormFieldProps } from './shared';

export function defaultGetValidateOption() {
  return ValidateOption.Default;
}

function withDefaultOption(option: ValidateOption | null | undefined) {
  if (option == null) {
    return ValidateOption.Default;
  }
  return option;
}

export function FormField<Value>(props: IFormFieldProps<Value>) {
  let model: FieldModel<Value>;
  if (isViewDrivenProps(props)) {
    const { name, defaultValue, destroyOnUnmount } = props;
    let validators = props.validators || [];
    if (
      props.required &&
      !validators.some(
        it =>
          (it as $MergeParams<IValidator<Value>>).$$id ===
          Validators.SYMBOL_REQUIRED
      )
    ) {
      validators = ([
        Validators.required(props.required as string),
      ] as IValidators<Value>).concat(validators);
    }
    model = useField<Value>(name, defaultValue, validators);
    model.destroyOnUnmount = Boolean(destroyOnUnmount);
  } else {
    model = useField<Value>(props.model);
  }
  React.useImperativeHandle(props.modelRef, () => model, [model]);
  const propsRef = React.useRef(props);
  propsRef.current = props;
  const {
    className,
    style,
    label,
    required,
    before,
    after,
    notice,
    helpDesc,
    withoutError,
    renderError = defaultRenderError,
    children,
    validateOccasion = ValidateOccasion.Default,
    getValidateOption = defaultGetValidateOption,
    normalize = id,
    format = id,
    withoutLabel,
    touchWhen = TouchWhen.Change,
  } = props;
  const anchorRef = React.useRef<HTMLDivElement | null>(null);
  asFormChild(model, anchorRef);
  const normalizer = React.useCallback(
    (value: Value) => {
      const prevValue = model.value;
      return normalize(value, prevValue);
    },
    [model, normalize]
  );
  const markTouched = React.useCallback(() => (model.isTouched = true), [
    model,
  ]);
  const onChange = FieldUtils.useMAppend(
    touchWhen === TouchWhen.Change ? markTouched : noop,
    FieldUtils.usePipe(
      normalizer,
      ValidateOccasion.Change & validateOccasion
        ? FieldUtils.makeChangeHandler(
            model,
            withDefaultOption(getValidateOption('change'))
          )
        : React.useCallback(value => (model.value = value), [model])
    )
  );
  const onBlur = React.useCallback(() => {
    if (touchWhen === TouchWhen.Blur) {
      markTouched();
    }
    if (validateOccasion & ValidateOccasion.Blur) {
      model.validate(getValidateOption('blur'));
    }
  }, [getValidateOption, validateOccasion, touchWhen]);
  const {
    onCompositionStart,
    onCompositionEnd,
  } = FieldUtils.useCompositionHandler(model);
  return (
    <FormControl
      ref={anchorRef}
      className={className}
      style={style}
      label={label}
      required={!!required}
      invalid={!!model.error}
      withoutLabel={withoutLabel}
    >
      <div className="zent-form-control-content-inner">
        {before}
        {children({
          value: format(model.value),
          onChange,
          onCompositionStart,
          onCompositionEnd,
          onBlur,
        })}
        {after}
      </div>
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {withoutError ? null : renderError(model.error)}
    </FormControl>
  );
}
