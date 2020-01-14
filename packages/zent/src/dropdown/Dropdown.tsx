import * as React from 'react';
import cx from 'classnames';
import Popover, { IPopoverProps } from '../popover/Popover';
import PopoverClickTrigger from '../popover/trigger/ClickTrigger';
import PopoverHoverTrigger from '../popover/trigger/HoverTrigger';
import PopoverContent from '../popover/Content';
import { useCallbackRef } from '../utils/hooks/useCallbackRef';
import { DropdownContext } from './DropdownContext';

export interface IDropdownProps extends IPopoverProps {}

export const Dropdown: React.FC<IDropdownProps> = ({
  cushion = 4,
  display = 'inline',
  visible = false,
  onVisibleChange,
  wrapperClassName,
  className,
  ...rest
}) => {
  const [vis, setVis] = React.useState(visible);
  const onVisibleChangeProp = useCallbackRef(onVisibleChange);
  const onVisChange = React.useCallback(
    (val: boolean) => {
      setVis(val);
      onVisibleChangeProp.current?.(val);
    },
    [onVisibleChangeProp]
  );

  React.useEffect(() => {
    setVis(visible);
  }, [visible]);

  return (
    <DropdownContext.Provider value={vis}>
      <Popover
        wrapperClassName={cx(wrapperClassName, 'zent-dropdown-wrapper')}
        className={cx(className, 'zent-dropdown')}
        cushion={cushion}
        display={display}
        visible={vis}
        onVisibleChange={onVisChange}
        {...rest}
      />
    </DropdownContext.Provider>
  );
};

export const DropdownClickTrigger = PopoverClickTrigger;
export const DropdownHoverTrigger = PopoverHoverTrigger;
export const DropdownContent = PopoverContent;
export const DropdownPosition = Popover.Position;
