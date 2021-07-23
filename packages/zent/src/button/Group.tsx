import cx from 'classnames';
import { FC } from 'react';

export type IButtonGroupProps = React.HTMLAttributes<HTMLDivElement>;

export const ButtonGroup: FC<IButtonGroupProps> = ({ className, ...props }) => {
  return <div className={cx('zent-btn-group', className)} {...props} />;
};

export default ButtonGroup;
