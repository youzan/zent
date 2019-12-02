import * as React from 'react';
import cx from 'classnames';

export interface IFormErrorProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const FormError = React.forwardRef<HTMLDivElement, IFormErrorProps>(
  ({ className, style, children }, ref) => (
    <div ref={ref} className={cx('zent-form-error', className)} style={style}>
      {children}
    </div>
  )
);

FormError.displayName = 'ZentFormError';
