import { cloneElement, PropsWithChildren, useContext } from 'react';
import { isElement, isFragment } from 'react-is';
import Context from '../Context';
import Anchor, { PopoverAnchorGetElementFn } from '../Anchor';

export interface IPopoverFocusTriggerChildProps {
  onFocus?: (...args: any[]) => void;
  onBlur?: (...args: any[]) => void;
}

export interface IPopoverFocusTriggerProps<
  ChildProps extends IPopoverFocusTriggerChildProps
> {
  getElement?: PopoverAnchorGetElementFn;
  children?:
    | string
    | number
    | React.ReactElement<ChildProps, any>
    | ((childProps: IPopoverFocusTriggerChildProps) => React.ReactNode);
}

export function PopoverFocusTrigger<
  ChildProps extends IPopoverFocusTriggerChildProps = PropsWithChildren<IPopoverFocusTriggerChildProps>
>({
  children,
  getElement,
}: PropsWithChildren<IPopoverFocusTriggerProps<ChildProps>>) {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error('PopoverFocusTrigger must be child of Popover');
  }
  const childProps: IPopoverFocusTriggerChildProps = {
    onFocus(...args: any[]) {
      if (isElement(children)) {
        children.props.onFocus?.(...args);
      }
      ctx.popover.setVisible(true);
    },
    onBlur(...args: any[]) {
      if (isElement(children)) {
        children.props.onBlur?.(...args);
      }
      ctx.popover.setVisible(false);
    },
  };
  let child: React.ReactNode;
  if (typeof children === 'function') {
    child = (
      children as (
        childProps: IPopoverFocusTriggerChildProps
      ) => React.ReactNode
    )(childProps);
  } else if (isElement(children) && !isFragment(children)) {
    child = cloneElement(children, childProps);
  } else {
    child = <span {...childProps}>{children}</span>;
  }
  return <Anchor getElement={getElement}>{child}</Anchor>;
}

export default PopoverFocusTrigger;
