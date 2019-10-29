import * as React from 'react';
import { Omit } from 'utility-types';
import {
  FieldModel,
  Validators,
  useField,
  IValidator,
  IValidators,
} from 'formulr';
import {
  IFormComponentProps,
  IFormFieldViewDrivenProps,
  IFormFieldModelDrivenProps,
  ValidateOccasion,
  defaultRenderError,
  asFormChild,
} from '../shared';
import Select, { ISelectProps } from '../../select';
import { FormNotice } from '../Notice';
import { FormDescription } from '../Description';
import { FormControl } from '../Control';
import { $MergeParams } from '../utils';
import { defaultGetValidateOption } from '../Field';

export type IFormSelectFieldProps<T> = Omit<
  IFormComponentProps<
    T | T[],
    Omit<ISelectProps, 'value' | 'tags' | 'onChange'>
  >,
  'normalize' | 'format'
> & {
  tags?: boolean;
  data: any[];
};

/**
 * Old `Select` implementation is a disaster,
 * temporary dirty code.
 */
export const FormSelectField: React.FunctionComponent<
  IFormSelectFieldProps<any>
> = props => {
  let model: FieldModel<any>;
  if ((props as any).name) {
    const {
      name,
      defaultValue,
    } = (props as unknown) as IFormFieldViewDrivenProps<any>;
    let validators =
      ((props as unknown) as IFormFieldViewDrivenProps<any>).validators || [];
    if (
      props.required &&
      !validators.some(
        it =>
          (it as $MergeParams<IValidator<any>>).$$id ===
          Validators.SYMBOL_REQUIRED
      )
    ) {
      validators = ([
        Validators.required(props.required as string),
      ] as IValidators<any>).concat(validators);
    }
    model = useField<any>(name, defaultValue, validators);
  } else {
    model = useField<any>(
      ((props as unknown) as IFormFieldModelDrivenProps<any>).model
    );
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
    renderError = defaultRenderError,
    validateOccasion = ValidateOccasion.Default,
    getValidateOption = defaultGetValidateOption,
  } = props;
  const anchorRef = React.useRef<HTMLDivElement | null>(null);
  asFormChild(model, anchorRef);
  const onChange = React.useCallback(
    (e: any) => {
      if (propsRef.current.tags) {
        const value = model.value || [];
        if (!value.includes(e.target.value)) {
          model.value = [...value, e.target.value];
        }
      } else {
        model.value = e.target.value;
      }
      if (validateOccasion & ValidateOccasion.Change) {
        model.validate(getValidateOption('change'));
      }
      model.isTouched = true;
    },
    [model]
  );
  return (
    <FormControl
      ref={anchorRef}
      className={className}
      style={style}
      label={label}
      required={!!required}
      invalid={!!model.error}
    >
      <div className="zent-form-control-content-inner">
        {before}
        <Select
          {...props.props}
          onChange={onChange}
          tags={props.tags}
          data={props.data}
          value={model.value}
        />
        {after}
      </div>
      {!!notice && <FormNotice>{notice}</FormNotice>}
      {!!helpDesc && <FormDescription>{helpDesc}</FormDescription>}
      {withoutError ? null : renderError(model.error)}
    </FormControl>
  );
};
