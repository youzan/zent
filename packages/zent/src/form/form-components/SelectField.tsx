import * as React from 'react';
import { FieldModel, Validators, useField } from '../formulr';
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

export type IFormSelectFieldInnerProps = Omit<
  ISelectProps,
  'value' | 'onChange' | 'onDelete'
>;

export type IFormSelectFieldProps<
  T,
  P extends IFormSelectFieldInnerProps
> = IFormComponentProps<T, P>;

/**
 * Old `Select` implementation is a disaster,
 * temporary dirty code.
 */
export function FormSelectField<Item, P extends IFormSelectFieldInnerProps>(
  props: IFormSelectFieldProps<P['tags'] extends true ? Item[] : Item, P>
) {
  type FieldValue = P['tags'] extends true ? Item[] : Item;

  let model: FieldModel<FieldValue>;
  const { name, model: rawModel } = props as IFormFieldViewDrivenProps<
    FieldValue
  > &
    IFormFieldModelDrivenProps<FieldValue>;
  if (name) {
    const {
      name,
      required,
      defaultValue,
      destroyOnUnmount,
    } = props as IFormFieldViewDrivenProps<FieldValue> &
      IFormSelectFieldProps<FieldValue, P>;
    let validators =
      (props as IFormFieldViewDrivenProps<FieldValue>).validators || [];
    if (
      required &&
      !validators.some(it => it.$$id === Validators.SYMBOL_REQUIRED)
    ) {
      validators = validators.concat([
        Validators.required(typeof required === 'string' ? required : ''),
      ]);
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    model = useField<FieldValue>(name, defaultValue, validators);
    model.destroyOnUnmount = Boolean(destroyOnUnmount);
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    model = useField<FieldValue>(rawModel);
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
    (value: Item, isDelete: boolean) => {
      if (propsRef.current.props?.tags) {
        const selectedValues = (model.value || []) as Item[];

        if (isDelete) {
          (model.value as Item[]) = selectedValues.filter(it => it !== value);
        } else if (!selectedValues.includes(value)) {
          (model.value as Item[]) = [...selectedValues, value];
        }
      } else {
        (model.value as Item) = value;
      }

      if (validateOccasion & ValidateOccasion.Change) {
        model.validate(getValidateOption('change'));
      }

      model.isTouched = true;
    },
    [getValidateOption, model, validateOccasion]
  );

  const onChange = React.useCallback(
    (e: ISelectChangeEvent<Item>) => dispatch(e.target.value, false),
    [dispatch]
  );

  const onDelete = React.useCallback(
    (item: ISelectItem<Item>) => dispatch(item.value, true),
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
