import cx from 'classnames';
import { PropsWithChildren } from 'react';

export interface IFormDescriptionProps {
  className?: string;
  style?: React.CSSProperties;
}

export const FormDescription: React.FunctionComponent<
  PropsWithChildren<IFormDescriptionProps>
> = ({ children, className, style }) => (
  <div className={cx('zent-form-description', className)} style={style}>
    {children}
  </div>
);
