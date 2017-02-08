import { PropTypes } from 'react';

import Trigger, { PopoverTriggerPropTypes } from './Trigger';

export default class PopoverClickTrigger extends Trigger {
  static propTypes = {
    ...PopoverTriggerPropTypes,

    // click anywhere outside to close
    // If set to false, you have to close popover manually
    autoClose: PropTypes.bool,

    // Optional click outside check
    // (target) => boolean
    isOutside: PropTypes.func
  };

  static defaultProps = {
    autoClose: true
  }

  onClickOutside = (evt) => {
    // Optimization: skip checking if popover is hidden
    const { contentVisible } = this.props;
    if (!contentVisible) {
      return;
    }

    const { isOutside, getContentNode, getTriggerNode } = this.props;
    const { target } = evt;
    const box = getContentNode();
    const anchor = getTriggerNode();
    if (!box.contains(target) && !anchor.contains(target) && (!isOutside || isOutside(target))) {
      this.props.close();
    }
  };

  getTriggerProps(child) {
    return {
      onClick: evt => {
        this.props.open();
        this.triggerEvent(child, 'onClick', evt);
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    // bind global events only when popover is visible
    const { contentVisible, autoClose } = nextProps;
    if (contentVisible !== this.props.contentVisible) {
      if (autoClose && contentVisible) {
        return window.addEventListener('click', this.onClickOutside, true);
      }

      // Ensure handler is removed even if autoClose is false
      if (!contentVisible) {
        return window.removeEventListener('click', this.onClickOutside, true);
      }
    }
  }
}
