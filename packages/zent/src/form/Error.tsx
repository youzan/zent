import cx from 'classnames';
import { forwardRef } from 'react';

export interface IFormErrorProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const FormError = forwardRef<HTMLDivElement, IFormErrorProps>(
  ({ className, style, children }, ref) => (
    <div
      ref={ref}
      className={cx('zent-form-error', 'zent-font-small', className)}
      style={style}
    >
      {children}
    </div>
  )
);

FormError.displayName = 'ZentFormError';
