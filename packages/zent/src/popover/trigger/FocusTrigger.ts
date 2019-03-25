import Trigger, { IPopoverTriggerProps } from './Trigger';

export interface IFocusTriggerProps extends IPopoverTriggerProps {}

export default class FocusTrigger<
  P extends IFocusTriggerProps = IFocusTriggerProps
> extends Trigger<P> {
  getTriggerProps(child) {
    return {
      onFocus: evt => {
        this.props.open();
        this.triggerEvent(child, 'onFocus', evt);
      },

      onBlur: evt => {
        this.props.close();
        this.triggerEvent(child, 'onBlur', evt);
      },
    };
  }
}
