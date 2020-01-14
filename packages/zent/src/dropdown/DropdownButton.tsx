import * as React from 'react';
import cx from 'classnames';
import { IButtonProps, Button } from '../button';
import Icon from '../icon';

export interface IDropdownButtonProps extends IButtonProps {
  active: boolean;
}

export const DropdownButton: React.FC<IDropdownButtonProps> = ({
  className,
  active,
  children,
  ...props
}) => {
  return (
    <Button
      className={cx(className, 'zent-dropdown-button', {
        'zent-dropdown-button--active': active,
      })}
      {...props}
    >
      {children}
      <Icon type="down" />
    </Button>
  );
};
