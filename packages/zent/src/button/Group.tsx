import * as React from 'react';
import cx from 'classnames';

export interface IButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const ButtonGroup: React.FunctionComponent<IButtonGroupProps> = ({
  className,
  ...props
}) => {
  return <div className={cx('zent-btn-group', className)} {...props} />;
};

export default ButtonGroup;
