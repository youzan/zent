import Popover from '@youzan/zent-popover';

export default class NoneTrigger extends Popover.Trigger.Base {
  componentWillReceiveProps(nextProps) {
    const { visible, open, close } = nextProps;
    if (visible !== this.props.visible) {
      if (visible) {
        open();
      } else {
        close();
      }
    }
  }
}
