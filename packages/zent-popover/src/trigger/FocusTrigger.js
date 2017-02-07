import Trigger from './Trigger';

export default class FocusTrigger extends Trigger {
  getAddtionalProps(child) {
    const { onFocus, onBlur } = child.props;

    return {
      onFocus: evt => {
        this.props.open();
        onFocus && onFocus(evt);
      },

      onBlur: evt => {
        this.props.close();
        onBlur && onBlur(evt);
      }
    };
  }
}
