import cx from 'classnames';
import { FC, PropsWithChildren } from 'react';

export type IButtonGroupProps = React.HTMLAttributes<HTMLDivElement>;

export const ButtonGroup: FC<PropsWithChildren<IButtonGroupProps>> = ({
  className,
  ...props
}) => {
  return <div className={cx('zent-btn-group', className)} {...props} />;
};

export default ButtonGroup;
