import Trigger, { IPopoverTriggerProps } from './Trigger';
import { getContext } from '../PopoverContext';
import { isElement } from 'react-is';

export interface IFocusTriggerChildProps {
  onFocus: React.FocusEventHandler;
  onBlur: React.FocusEventHandler;
}

export interface IFocusTriggerProps<P extends IFocusTriggerChildProps>
  extends IPopoverTriggerProps<P> {}

export default class FocusTrigger<
  P extends IFocusTriggerChildProps = IFocusTriggerChildProps
> extends Trigger<IFocusTriggerChildProps, IFocusTriggerProps<P>> {
  protected triggerProps: IFocusTriggerChildProps = {
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
}
