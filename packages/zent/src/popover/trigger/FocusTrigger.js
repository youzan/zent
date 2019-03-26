import Trigger from './Trigger';

export default class FocusTrigger extends Trigger {
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
