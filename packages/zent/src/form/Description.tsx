import * as React from 'react';
import cx from 'classnames';

export interface IFormDescriptionProps {
  className?: string;
  style?: React.CSSProperties;
}

export const FormDescription: React.FunctionComponent<
  IFormDescriptionProps
> = ({ children, className, style }) => (
  <div className={cx('zent-form-description', className)} style={style}>
    {children}
  </div>
);
