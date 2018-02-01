import 'react';

import PropTypes from 'prop-types';

import Trigger, { PopoverTriggerPropTypes } from './Trigger';

export default class PopoverClickTrigger extends Trigger {
  static propTypes = {
    ...PopoverTriggerPropTypes,

    // click anywhere outside to close
    // If set to false, you have to close popover manually
    autoClose: PropTypes.bool,

    // Optional click outside check
    // (target) => boolean
    isOutside: PropTypes.func,
  };

  static defaultProps = {
    autoClose: true,
  };

  onClickOutside = evt => {
    // Optimization: skip checking if popover is hidden
    const { contentVisible } = this.props;
    if (!contentVisible) {
      return;
    }

    const { target } = evt;
    if (this.props.isOutsideStacked(target)) {
      this.props.close();
    }
  };

  getTriggerProps(child) {
    return {
      onClick: evt => {
        this.props.open();
        this.triggerEvent(child, 'onClick', evt);
      },
    };
  }

  bindEventHandler(props) {
    const { contentVisible, autoClose } = props || this.props;

    // bind global events only when popover is visible
    if (autoClose && contentVisible) {
      return window.addEventListener('click', this.onClickOutside, true);
    }

    // Ensure handler is removed even if autoClose is false
    if (!contentVisible) {
      return window.removeEventListener('click', this.onClickOutside, true);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutside, true);
  }

  componentDidMount() {
    this.bindEventHandler();
  }

  componentWillReceiveProps(nextProps) {
    const { contentVisible } = nextProps;
    if (contentVisible !== this.props.contentVisible) {
      this.bindEventHandler(nextProps);
    }
  }
}
