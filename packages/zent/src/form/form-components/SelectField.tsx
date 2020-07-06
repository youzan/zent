import * as React from 'react';
import { Omit } from 'utility-types';
import { FieldModel, Validators, useField } from 'formulr';
import {
  IFormComponentProps,
  IFormFieldViewDrivenProps,
  IFormFieldModelDrivenProps,
  ValidateOccasion,
  defaultRenderError,
  useFormChild,
} from '../shared';
import Select, {
  ISelectProps,
  ISelectChangeEvent,
  ISelectItem,
} from '../../select';
import { FormNotice } from '../Notice';
import { FormDescription } from '../Description';
import { FormControl } from '../Control';
import { defaultGetValidateOption } from '../Field';

export type IFormSelectFieldProps<T> = IFormComponentProps<
  T | T[],
  Omit<ISelectProps, 'value' | 'onChange' | 'onDelete'>
>;

/**
 * Old `Select` implementation is a disaster,
 * temporary dirty code.
 */
export function FormSelectField<T>(props: IFormSelectFieldProps<T>) {
  let model: FieldModel<T | T[]>;
  const { name, model: rawModel } = props as IFormFieldViewDrivenProps<T> &
    IFormFieldModelDrivenProps<T>;
  if (name) {
    const {
      name,
      required,
      defaultValue,
      destroyOnUnmount,
    } = props as IFormFieldViewDrivenProps<T> & IFormSelectFieldProps<T>;
    let validators = (props as IFormFieldViewDrivenProps<T>).validators || [];
    if (
      required &&
      !validators.some(it => it.$$id === Validators.SYMBOL_REQUIRED)
    ) {
      validators = validators.concat([
        Validators.required(typeof required === 'string' ? required : ''),
      ]);
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    model = useField<T>(name, defaultValue, validators);
    model.destroyOnUnmount = Boolean(destroyOnUnmount);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    model = useField<T>(rawModel);
  }
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
    withoutLabel,
    renderError = defaultRenderError,
    validateOccasion = ValidateOccasion.Default,
    getValidateOption = defaultGetValidateOption,
  } = props;
  const anchorRef = React.useRef<HTMLDivElement | null>(null);
  useFormChild(model, anchorRef);

  const dispatch = React.useCallback(
    (value: T, isDelete: boolean) => {
      if (propsRef.current.props?.tags) {
        const selectedValues = (model.value || []) as T[];

        if (isDelete) {
          model.value = selectedValues.filter(it => it !== value);
        } else if (!selectedValues.includes(value)) {
          model.value = [...selectedValues, value];
        }
      } else {
        model.value = value;
      }

      if (validateOccasion & ValidateOccasion.Change) {
        model.validate(getValidateOption('change'));
      }

      model.isTouched = true;
    },
    [getValidateOption, model, validateOccasion]
  );

  const onChange = React.useCallback(
    (e: ISelectChangeEvent<T>) => dispatch(e.target.value, false),
    [dispatch]
  );

  const onDelete = React.useCallback(
    (item: ISelectItem<T>) => dispatch(item.value, true),
    [dispatch]
  );

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
        <Select
          {...props.props}
          onDelete={onDelete}
          onChange={onChange}
          value={model.value}
        >
          {props.children}
        </Select>
        {after}
      </div>
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {withoutError ? null : renderError(model.error)}
    </FormControl>
  );
}
