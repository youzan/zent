import * as React from 'react';
import { isElement } from 'react-is';
import Context from '../Context';
import Anchor from '../Anchor';

export interface IPopoverFocusTriggerChildProps<T extends Element = Element> {
  onFocus?: React.FocusEventHandler<T>;
  onBlur?: React.FocusEventHandler<T>;
}

export interface IPopoverFocusTriggerProps<
  ChildProps extends IPopoverFocusTriggerChildProps
> {
  children?: string | number | React.ReactElement<ChildProps, any>;
}

export function PopoverFocusTrigger<
  ChildProps extends IPopoverFocusTriggerChildProps = IPopoverFocusTriggerChildProps<
    Element
  >
>({ children }: IPopoverFocusTriggerProps<ChildProps>) {
  const ctx = React.useContext(Context);
  if (!ctx) {
    throw new Error('PopoverFocusTrigger must be child of Popover');
  }
  const child = React.useMemo(() => {
    if (isElement(children)) {
      return React.cloneElement(children, {
        onFocus(e: any) {
          const { onFocus } = children.props as IPopoverFocusTriggerChildProps;
          onFocus && onFocus(e);
          ctx.popover.setVisible(true);
        },
        onBlur(e: any) {
          const { onBlur } = children.props as IPopoverFocusTriggerChildProps;
          onBlur && onBlur(e);
          ctx.popover.setVisible(false);
        },
      });
    }
    return <span>{children}</span>;
  }, [ctx]);
  return <Anchor>{child}</Anchor>;
}

export default PopoverFocusTrigger;
