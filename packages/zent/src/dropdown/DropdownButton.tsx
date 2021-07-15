import cx from 'classnames';
import { IButtonProps, Button } from '../button';
import Icon from '../icon';
import { DropdownContext } from './DropdownContext';

export type IDropdownButtonProps = IButtonProps;

export const DropdownButton: React.FC<IDropdownButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <DropdownContext.Consumer>
      {visible => (
        <Button
          className={cx(className, 'zent-dropdown-button', {
            'zent-dropdown-button--active': visible,
          })}
          {...props}
        >
          {children}
          <Icon type="down" />
        </Button>
      )}
    </DropdownContext.Consumer>
  );
};
