import cx from 'classnames';
import { useCallback, useEffect, useState } from 'react';

import Popover, { IPopoverProps } from '../popover/Popover';
import PopoverClickTrigger from '../popover/trigger/ClickTrigger';
import PopoverHoverTrigger from '../popover/trigger/HoverTrigger';
import PopoverContent from '../popover/Content';
import { useCallbackRef } from '../utils/hooks/useCallbackRef';
import { DropdownContext } from './DropdownContext';

export type IDropdownProps = IPopoverProps;

export const Dropdown: React.FC<IDropdownProps> = ({
  cushion = 4,
  visible = false,
  onVisibleChange,
  className,
  ...rest
}) => {
  const [vis, setVis] = useState(visible);
  const onVisibleChangeProp = useCallbackRef(onVisibleChange);
  const onVisChange = useCallback(
    (val: boolean) => {
      setVis(val);
      onVisibleChangeProp.current?.(val);
    },
    [onVisibleChangeProp]
  );

  useEffect(() => {
    setVis(visible);
  }, [visible]);

  return (
    <DropdownContext.Provider value={vis}>
      <Popover
        className={cx(className, 'zent-dropdown')}
        cushion={cushion}
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
