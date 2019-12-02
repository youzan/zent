import * as React from 'react';
import cx from 'classnames';

export interface IFormNoticeProps {
  className?: string;
  style?: React.CSSProperties;
}

export const FormNotice: React.FunctionComponent<IFormNoticeProps> = ({
  className,
  style,
  children,
}) => (
  <div className={cx('zent-form-notice', className)} style={style}>
    {children}
  </div>
);
