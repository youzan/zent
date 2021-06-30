import * as React from 'react';
import cn from 'classnames';
import { IFormComponentProps, IFormFieldChildProps } from '../shared';
import { FormField } from '../Field';
import {
  ImageUpload,
  IImageUploadFileItem,
  IImageUploadProps,
} from '../../upload';
import { warningDefaultValueProp } from '../utils';
import omit from '../../utils/omit';

export type IFormImageUploadFieldProps<T extends IImageUploadFileItem> =
  IFormComponentProps<
    T[],
    Omit<IImageUploadProps, 'fileList' | 'onChange' | 'defaultFileList'>
  >;

function renderImageUpload<T extends IImageUploadFileItem>(
  childProps: IFormFieldChildProps<T[]>,
  props: IFormImageUploadFieldProps<T>
) {
  const { value, onChange } = childProps;
  return (
    <ImageUpload
      {...omit(props.props as IImageUploadProps, ['defaultFileList'])}
      fileList={value}
      onChange={onChange}
    />
  );
}

export function FormImageUploadField<T extends IImageUploadFileItem>(
  props: IFormImageUploadFieldProps<T>
) {
  const { className, ...rest } = props;

  React.useEffect(() => {
    // warning for use 'props.defaultFileList' in Form Upload Field
    warningDefaultValueProp(
      !('defaultFileList' in (props.props ?? {})),
      'defaultFileList',
      'FormImageUploadField'
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
