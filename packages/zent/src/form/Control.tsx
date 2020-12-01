import cx from 'classnames';
import { forwardRef } from 'react';

import { Label } from './Label';

export interface IFormControlProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /**
   * 是否必填
   */
  required?: boolean;
  /**
   * 是否有错误
   */
  invalid?: boolean;
  /**
   * 表单项的名称
   */
  label?: React.ReactNode;
  /**
   * 默认不传 `label` 的时候也会留有 `label` 的空间，使用 `withoutLabel` 去掉这个留空
   */
  withoutLabel?: boolean;
}

export const FormControl = forwardRef<HTMLDivElement, IFormControlProps>(
  (
    { className, style, label, children, required, invalid, withoutLabel },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cx(
          'zent-form-control',
          {
            'has-error': invalid,
          },
          className
        )}
        style={style}
      >
        {withoutLabel ? null : <Label required={required}>{label}</Label>}
        <div className="zent-form-control-content">{children}</div>
      </div>
    );
  }
);

FormControl.displayName = 'ZentFormControl';
