import { findDOMNode } from 'react-dom';
import { isElement } from 'react-is';
import Trigger, { IPopoverTriggerProps, IIsOutside } from './Trigger';
import PopoverContext, { IPopoverContext, getContext } from '../PopoverContext';
import { RefObject } from 'react';
import { IPortalImperativeHandlers } from '../../portal';

export interface IPopoverClickTriggerChildProps {
  onClick: React.MouseEventHandler;
}

export interface IPopoverClickTriggerProps<
  P extends IPopoverClickTriggerChildProps
> extends IPopoverTriggerProps<P> {
  autoClose?: boolean;
  isOutside?: IIsOutside;
}

function isOutside(
  el: Element,
  portalRef: RefObject<IPortalImperativeHandlers>,
  anchor: null | Element | Text
) {
  if (!anchor || !(anchor instanceof Element)) {
    return false;
  }
  if (anchor.contains(el)) {
    return false;
  }
  const portal = portalRef.current;
  if (!portal) {
    return true;
  }
  if (portal.contains(el)) {
    return false;
  }
  return true;
}

export default class PopoverClickTrigger<
  P extends IPopoverClickTriggerChildProps
> extends Trigger<
  IPopoverClickTriggerChildProps,
  IPopoverClickTriggerProps<P>
> {
  static defaultProps = {
    autoClose: true,
  };

  static contextType = PopoverContext;
  context!: IPopoverContext;

  protected childProps: IPopoverClickTriggerChildProps = {
    onClick: e => {
      const { children } = this.props;
      const { popover, visible } = getContext(this);
      if (!visible) {
        popover.open();
      }
      if (isElement(children)) {
        const { onClick } = children.props;
        onClick && onClick(e);
      }
    },
  };

  protected getTriggerProps() {
    return this.childProps;
  }

  onClick = (e: MouseEvent) => {
    if (!(e.target instanceof Element) || !this.props.autoClose) {
      return;
    }
    const { portalRef, popover, visible } = getContext(this);
    if (visible && isOutside(e.target, portalRef, findDOMNode(this))) {
      popover.close();
    }
  };

  componentDidMount() {
    window.addEventListener('click', this.onClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClick, true);
  }
}
