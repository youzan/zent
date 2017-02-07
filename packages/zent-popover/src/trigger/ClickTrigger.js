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

  getAddtionalProps(child) {
    const { onClick } = child.props;

    return {
      onClick: evt => {
        this.props.open();
        onClick && onClick(evt);
      }
    };
  }

  componentDidMount() {
    if (this.props.autoClose) {
      window.addEventListener('click', this.onClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.autoClose) {
      window.removeEventListener('click', this.onClickOutside, true);
    }
  }
}
