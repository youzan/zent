import * as React from 'react';
import cn from 'classnames';
import { IFormComponentProps, IFormFieldChildProps } from '../shared';
import { FormField } from '../Field';
import { Upload, IUploadFileItem, IUploadProps } from '../../upload';
import { warningUncontrolledComponentProp } from '../utils';

export type IFormUploadFieldProps<
  T extends IUploadFileItem
> = IFormComponentProps<
  T[],
  Omit<IUploadProps, 'fileList' | 'onChange' | 'defaultFileList'>
>;

function renderUpload<T extends IUploadFileItem>(
  childProps: IFormFieldChildProps<T[]>,
  props: IFormUploadFieldProps<T>
) {
  const { value, onChange } = childProps;
  return (
    <Upload {...(props.props as any)} fileList={value} onChange={onChange} />
  );
}

export function FormUploadField<T extends IUploadFileItem>(
  props: IFormUploadFieldProps<T>
) {
  const { className, ...rest } = props;

  React.useEffect(() => {
    // warning for use 'props.defaultFileList' in Form Upload Field
    warningUncontrolledComponentProp(
      'defaultFileList' in props.props,
      'defaultFileList'
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormField
      {...rest}
      className={cn(className, 'zent-form-upload-field')}
      defaultValue={props.defaultValue ?? []}
    >
      {childProps => renderUpload(childProps, props)}
    </FormField>
  );
}
