import * as React from 'react';
import { isElement } from 'react-is';
import { IPortalImperativeHandlers } from '../../portal';
import Context from '../Context';
import Anchor from '../Anchor';
import { useWindowEvent } from '../../utils/component/WindowEventHandler';

export interface IPopoverClickTriggerChildProps {
  onClick: React.MouseEventHandler;
}

export interface IPopoverClickTriggerProps<
  ChildProps extends IPopoverClickTriggerChildProps
> {
  closeOnClickOutside?: boolean;
  toggle?: boolean;
  children?: string | number | React.ReactElement<ChildProps, any>;
}

function isOutside(
  el: Element,
  portal: IPortalImperativeHandlers,
  anchor: null | Element
) {
  if (!anchor || !(anchor instanceof Element)) {
    return false;
  }
  if (anchor.contains(el)) {
    return false;
  }
  if (portal.contains(el)) {
    return false;
  }
  return true;
}

export function PopoverClickTrigger<
  ChildProps extends IPopoverClickTriggerChildProps = IPopoverClickTriggerChildProps
>({
  children,
  toggle,
  closeOnClickOutside = true,
}: IPopoverClickTriggerProps<ChildProps>) {
  const ctx = React.useContext(Context);
  if (!ctx) {
    throw new Error('PopoverClickTrigger must be child of Popover');
  }
  const anchorRef = React.useRef<Anchor>(null);
  const globalClick = React.useCallback(
    (e: MouseEvent) => {
      if (
        closeOnClickOutside &&
        isOutside(
          e.target as Element,
          ctx.portalRef.current!,
          anchorRef.current!.element
        )
      ) {
        ctx.popover.setVisible(false);
      }
    },
    [!!closeOnClickOutside]
  );
  useWindowEvent('click', globalClick, true);

  const child = React.useMemo(() => {
    if (isElement(children)) {
      return React.cloneElement(children, {
        onClick(e: any) {
          const { onClick } = children.props as IPopoverClickTriggerChildProps;
          onClick && onClick(e);
          if (toggle) {
            ctx.popover.setVisible(!ctx.visible);
          } else {
            ctx.popover.setVisible(true);
          }
        },
      });
    }
    return (
      <span
        onClick={() => {
          if (toggle) {
            ctx.popover.setVisible(!ctx.visible);
          } else {
            ctx.popover.setVisible(true);
          }
        }}
      >
        {children}
      </span>
    );
  }, [ctx, toggle]);
  return <Anchor ref={anchorRef}>{child}</Anchor>;
}

export default PopoverClickTrigger;

// export default class PopoverClickTrigger<
//   P extends IPopoverClickTriggerChildProps
// > extends Trigger<
//   IPopoverClickTriggerChildProps,
//   IPopoverClickTriggerProps<P>
// > {
//   static defaultProps = {
//     autoClose: true,
//   };

//   static contextType = PopoverContext;
//   context!: IPopoverContext;

//   protected childProps: IPopoverClickTriggerChildProps = {
//     onClick: e => {
//       const { children } = this.props;
//       const { popover, visible } = getContext(this);
//       if (!visible) {
//         popover.open();
//       }
//       if (isElement(children)) {
//         const { onClick } = children.props;
//         onClick && onClick(e);
//       }
//     },
//   };

//   protected getTriggerProps() {
//     return this.childProps;
//   }

//   onClick = (e: MouseEvent) => {
//     if (!(e.target instanceof Element) || !this.props.autoClose) {
//       return;
//     }
//     const { portalRef, popover, visible } = getContext(this);
//     if (visible && isOutside(e.target, portalRef, findDOMNode(this))) {
//       popover.close();
//     }
//   };

//   componentDidMount() {
//     window.addEventListener('click', this.onClick);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('click', this.onClick, true);
//   }
// }
