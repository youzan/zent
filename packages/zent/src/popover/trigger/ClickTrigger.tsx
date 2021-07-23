import { cloneElement, useCallback, useRef } from 'react';
import { isElement, isFragment } from 'react-is';
import { IPortalImperativeHandlers } from '../../portal';
import { usePopoverContext } from '../Context';
import Anchor, { PopoverAnchorGetElementFn } from '../Anchor';
import { useWindowEventHandler } from '../../utils/component/WindowEventHandler';

export interface IPopoverClickTriggerChildProps {
  onClick?: (...args: any[]) => void;
}

export interface IPopoverClickTriggerProps<
  ChildProps extends IPopoverClickTriggerChildProps
> {
  closeOnClickOutside?: boolean;
  toggle?: boolean;
  getElement?: PopoverAnchorGetElementFn;
  children?:
    | (string | number | React.ReactElement<ChildProps, any>)
    | ((childProps: IPopoverClickTriggerChildProps) => React.ReactNode);
}

function isOutside(
  el: Element,
  portal: IPortalImperativeHandlers,
  anchor: null | Node
) {
  return !(
    !anchor ||
    !(anchor instanceof Element) ||
    anchor.contains(el) ||
    portal.contains(el)
  );
}

export function PopoverClickTrigger<
  ChildProps extends IPopoverClickTriggerChildProps = IPopoverClickTriggerChildProps
>({
  children,
  toggle,
  getElement,
  closeOnClickOutside = true,
}: IPopoverClickTriggerProps<ChildProps>) {
  const ctx = usePopoverContext();
  const anchorRef = useRef<Anchor>(null);
  const globalClick = useCallback(
    (e: MouseEvent) => {
      const anchor = anchorRef.current;
      if (!anchor) {
        return;
      }
      const el = anchor.getElement();
      if (
        closeOnClickOutside &&
        el &&
        isOutside(e.target as Element, ctx.portalRef.current, el)
      ) {
        ctx.popover.setVisible(false);
      }
    },
    [closeOnClickOutside, ctx.popover, ctx.portalRef]
  );
  useWindowEventHandler('click', globalClick, {
    capture: true,
  });
  const onClick = (...args: any[]) => {
    if (isElement(children)) {
      children.props.onClick?.(...args);
    }
    if (toggle) {
      ctx.popover.setVisible(!ctx.visible);
    } else {
      ctx.popover.setVisible(true);
    }
  };
  let child: React.ReactNode;
  if (typeof children === 'function') {
    child = children({
      onClick,
    });
  } else if (isElement(children) && !isFragment(children)) {
    child = cloneElement(children, {
      onClick,
    });
  } else {
    child = <span onClick={onClick}>{children}</span>;
  }

  return (
    <Anchor getElement={getElement} ref={anchorRef}>
      {child}
    </Anchor>
  );
}

export default PopoverClickTrigger;
