import cx from 'classnames';
import { FC, PropsWithChildren } from 'react';

export interface IFormNoticeProps {
  className?: string;
  style?: React.CSSProperties;
}

export const FormNotice: FC<PropsWithChildren<IFormNoticeProps>> = ({
  className,
  style,
  children,
}) => (
  <div className={cx('zent-form-notice', className)} style={style}>
    {children}
  </div>
);
