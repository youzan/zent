import * as React from 'react';
import cn from 'classnames';
import { IFormComponentProps, IFormFieldChildProps } from '../shared';
import { FormField } from '../Field';
import {
  ImageUpload,
  IImageUploadFileItem,
  IImageUploadProps,
} from '../../upload';

export type IFormImageUploadFieldProps<
  T extends IImageUploadFileItem
> = IFormComponentProps<T[], Omit<IImageUploadProps, 'fileList' | 'onChange'>>;

function renderImageUpload<T extends IImageUploadFileItem>(
  childProps: IFormFieldChildProps<T[]>,
  props: IFormImageUploadFieldProps<T>
) {
  const { value, onChange } = childProps;
  return (
    <ImageUpload
      {...(props.props as any)}
      fileList={value}
      onChange={onChange}
    />
  );
}

export function FormImageUploadField<T extends IImageUploadFileItem>(
  props: IFormImageUploadFieldProps<T>
) {
  const { className, ...rest } = props;
  return (
    <FormField
      {...rest}
      className={cn(className, 'zent-form-upload-field')}
      defaultValue={props.defaultValue ?? []}
    >
      {childProps => renderImageUpload(childProps, props)}
    </FormField>
  );
}
