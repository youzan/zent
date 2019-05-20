import Trigger, { IPopoverTriggerProps } from './Trigger';
import { getContext } from '../PopoverContext';
import { isElement } from 'react-is';

export interface IPopoverFocusTriggerChildProps {
  onFocus: React.FocusEventHandler;
  onBlur: React.FocusEventHandler;
}

export interface IPopoverFocusTriggerProps<
  P extends IPopoverFocusTriggerChildProps
> extends IPopoverTriggerProps<P> {}

export default class FocusTrigger<
  P extends IPopoverFocusTriggerChildProps = IPopoverFocusTriggerChildProps
> extends Trigger<
  IPopoverFocusTriggerChildProps,
  IPopoverFocusTriggerProps<P>
> {
  protected triggerProps: IPopoverFocusTriggerChildProps = {
    onFocus: e => {
      const { children } = this.props;
      const { popover } = getContext(this);
      popover.open();
      if (isElement(children)) {
        const { onFocus } = children.props;
        onFocus && onFocus(e);
      }
    },
    onBlur: e => {
      const { children } = this.props;
      const { popover } = getContext(this);
      popover.close();
      if (isElement(children)) {
        const { onBlur } = children.props;
        onBlur && onBlur(e);
      }
    },
  };

  protected getTriggerProps() {
    return this.triggerProps;
  }
}
