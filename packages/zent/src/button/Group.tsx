import * as React from 'react';
import cx from 'classnames';

export interface IButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ButtonGroup: React.FunctionComponent<IButtonGroupProps> = ({
  className,
  ...props
}) => {
  return <div className={cx('zent-btn-group', className)} {...props} />;
};

export default ButtonGroup;
