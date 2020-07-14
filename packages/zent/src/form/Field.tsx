import * as React from 'react';
import {
  useField,
  Validators,
  FieldModel,
  ValidateOption,
  IValidator,
  IValidators,
  FieldUtils,
  isModelRef,
  ModelRef,
} from 'formulr';
import {
  defaultRenderError,
  IFormFieldProps,
  useFormChild,
  isViewDrivenProps,
  ValidateOccasion,
  TouchWhen,
} from './shared';
import { FormControl } from './Control';
import { FormNotice } from './Notice';
import { FormDescription } from './Description';
import { $MergeParams } from './utils';
import id from '../utils/identity';
export { IFormFieldChildProps, IFormFieldProps } from './shared';

export function defaultGetValidateOption() {
  return ValidateOption.Default;
}

function withDefaultOption(option: ValidateOption | null | undefined) {
  return option ?? ValidateOption.Default;
}

function getValidators<Value>({
  validators,
  required,
}: IFormFieldProps<Value>) {
  validators = validators ?? [];
  if (
    required &&
    !validators.some(
      it =>
        (it as $MergeParams<IValidator<Value>>).$$id ===
        Validators.SYMBOL_REQUIRED
    )
  ) {
    validators = ([
      Validators.required(typeof required === 'string' ? required : ''),
    ] as IValidators<Value>).concat(validators);
  }
  return validators;
}

export function FormField<Value>(props: IFormFieldProps<Value>) {
  let model: FieldModel<Value>;
  if (isViewDrivenProps(props)) {
    const { name, defaultValue, destroyOnUnmount } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    model = useField<Value>(name, defaultValue, getValidators(props));
    model.destroyOnUnmount = Boolean(destroyOnUnmount);
  } else if (isModelRef(props.model)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    model = useField(
      props.model as ModelRef<Value, any, any>,
      props.defaultValue,
      getValidators(props)
    );
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    model = useField<Value>(props.model);
  }
  React.useImperativeHandle(props.modelRef, () => model, [model]);
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
  useFormChild(model, anchorRef);
  const normalizer = React.useCallback(
    (value: Value) => {
      const prevValue = model.value;
      return normalize(value, prevValue);
    },
    [model, normalize]
  );
  const setValue = React.useCallback(value => (model.value = value), [model]);
  const defaultOnChangeHandler = FieldUtils.makeChangeHandler(
    model,
    withDefaultOption(getValidateOption('change')),
    props.onChange
  );
  const onChange = FieldUtils.useMulti(
    () => {
      if (touchWhen === TouchWhen.Change) {
        model.isTouched = true;
      }
    },
    FieldUtils.usePipe(
      normalizer,
      ValidateOccasion.Change & validateOccasion
        ? defaultOnChangeHandler
        : (value: Value) => {
            setValue(value);
            props.onChange?.(value);
          }
    ),
    [model, touchWhen, normalizer, validateOccasion, defaultOnChangeHandler]
  );
  const onBlur = React.useCallback(
    (e: React.FocusEvent) => {
      if (touchWhen === TouchWhen.Blur) {
        model.isTouched = true;
      }
      if (validateOccasion & ValidateOccasion.Blur) {
        model.validate(getValidateOption('blur'));
      }
      props.onBlur?.(e);
    },
    [getValidateOption, validateOccasion, touchWhen, model, props.onBlur]
  );
  const {
    onCompositionStart,
    onCompositionEnd,
  } = FieldUtils.useCompositionHandler(model, {
    onCompositionStart: props.onCompositionStart,
    onCompositionEnd: props.onCompositionEnd,
  });
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
