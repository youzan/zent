import { useCallback, useEffect, useImperativeHandle, useRef } from 'react';

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
} from './formulr';
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
import { useComponentI18nData } from '../i18n/useComponentI18n';
import { II18nLocaleForm } from '../i18n';
export { IFormFieldChildProps, IFormFieldProps } from './shared';

export function defaultGetValidateOption() {
  return ValidateOption.Default;
}

function withDefaultOption(option: ValidateOption | null | undefined) {
  return option ?? ValidateOption.Default;
}

/**
 * 为 model 设置初始值，初始值会被作为 effect 的依赖，谨慎使用字面量
 * @param model
 * @param initialValue
 */
export function useInitialValue<T>(model: FieldModel<T>, initialValue?: T) {
  useEffect(() => {
    if (initialValue !== undefined) {
      model.initialize(initialValue);
    }
  }, [model, initialValue]);
}

function getValidators<Value>(
  { validators, required }: IFormFieldProps<Value>,
  i18n: II18nLocaleForm
) {
  validators = validators ?? [];
  if (
    required &&
    !validators.some(
      it =>
        (it as $MergeParams<IValidator<Value>>).$$id ===
        Validators.SYMBOL_REQUIRED
    )
  ) {
    validators = (
      [
        Validators.required(
          typeof required === 'string' ? required : i18n.required
        ),
      ] as IValidators<Value>
    ).concat(validators);
  }
  return validators;
}

export function FormField<Value>(props: IFormFieldProps<Value>) {
  let model: FieldModel<Value>;
  const i18n = useComponentI18nData('Form');
  if (isViewDrivenProps(props)) {
    const { name, defaultValue, destroyOnUnmount, normalizeBeforeSubmit } =
      props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    model = useField<Value>(name, defaultValue, getValidators(props, i18n));
    model.destroyOnUnmount = Boolean(destroyOnUnmount);

    if (typeof normalizeBeforeSubmit === 'function') {
      model.normalizeBeforeSubmit = normalizeBeforeSubmit;
    }
  } else if (isModelRef(props.model)) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    model = useField(
      props.model as ModelRef<Value, any, any>,
      props.defaultValue,
      getValidators(props, i18n)
    );
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    model = useField<Value>(props.model);
  }

  useInitialValue(model, props.initialValue);

  useImperativeHandle(props.modelRef, () => model, [model]);
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
  const anchorRef = useRef<HTMLDivElement | null>(null);
  useFormChild(model, anchorRef);
  const normalizer = useCallback(
    (value: Value) => {
      const prevValue = model.value;
      return normalize(value, prevValue);
    },
    [model, normalize]
  );
  const setValue = useCallback(value => (model.value = value), [model]);
  const defaultOnChangeHandler = FieldUtils.useChangeHandler(
    model,
    withDefaultOption(getValidateOption('change')),
    props.onChange
  );

  const onChangeProps = props.onChange;
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
            onChangeProps?.(value);
          }
    ),
    [
      model,
      touchWhen,
      normalizer,
      validateOccasion,
      defaultOnChangeHandler,
      onChangeProps,
    ]
  );

  const onBlurProps = props.onBlur;
  const onBlur = useCallback(
    (e: React.FocusEvent) => {
      if (touchWhen === TouchWhen.Blur) {
        model.isTouched = true;
      }
      if (validateOccasion & ValidateOccasion.Blur) {
        model.validate(getValidateOption('blur'));
      }
      onBlurProps?.(e);
    },
    [getValidateOption, validateOccasion, touchWhen, model, onBlurProps]
  );
  const { onCompositionStart, onCompositionEnd } =
    FieldUtils.useCompositionHandler(model, {
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
      {withoutError ? null : renderError(model.error)}
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
    </FormControl>
  );
}
