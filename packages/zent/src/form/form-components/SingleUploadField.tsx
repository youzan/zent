import * as React from 'react';
import cn from 'classnames';
import { IFormComponentProps, IFormFieldChildProps } from '../shared';
import { FormField } from '../Field';
import {
  ISingleUploadProps,
  IUploadFileItem,
  SingleUpload,
} from '../../upload';

export type IFormSingleUploadFieldProps<
  T extends IUploadFileItem
> = IFormComponentProps<
  T | null,
  Omit<ISingleUploadProps, 'value' | 'onChange'>
>;

function renderSingleUpload<T extends IUploadFileItem>(
  childProps: IFormFieldChildProps<T | null>,
  props: IFormSingleUploadFieldProps<T>
) {
  const { value, onChange } = childProps;

  return (
    <SingleUpload {...(props.props as any)} value={value} onChange={onChange} />
  );
}

export function FormSingleUploadField<T extends IUploadFileItem>(
  props: IFormSingleUploadFieldProps<T>
) {
  const { className, ...rest } = props;
  return (
    <FormField
      {...rest}
      className={cn(className, 'zent-form-single-upload-field')}
      defaultValue={props.defaultValue ?? null}
    >
      {childProps => renderSingleUpload(childProps, props)}
    </FormField>
  );
}
