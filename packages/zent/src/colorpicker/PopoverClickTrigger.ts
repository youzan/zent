import { isElement } from 'react-is';
import Popover, { IPopoverClickTriggerChildProps } from '../popover';
import { getContext } from '../popover/PopoverContext';

export default class PopoverClickTrigger<
  P extends IPopoverClickTriggerChildProps
> extends Popover.Trigger.Click<P> {
  protected childProps: IPopoverClickTriggerChildProps = {
    onClick: e => {
      const { children } = this.props;
      const { popover, visible } = getContext(this);
      if (visible) {
        popover.close();
      } else {
        popover.open();
      }
      if (isElement(children)) {
        const { onClick } = children.props;
        onClick && onClick(e);
      }
    },
  };

  getTriggerProps() {
    return this.childProps;
  }
}
