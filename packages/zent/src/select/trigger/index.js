import * as React from 'react';
import PropTypes from 'prop-types';

import Popover from 'popover';

import Input from './InputTrigger';
import Base from './BaseTrigger';
import Simple from './SimpleTrigger';
import Tags from './TagsTrigger';

// Compatible with old APIs. e.g. props.simple / props.search
const NodeMap = {
  Input,
  Base,
  Simple,
  Tags
};

/**
 * @description exclusive click trigger of select
 * @class SelectClickTrigger
 * @extends {Popover.Trigger.Click}
 * @method {render} Major changes, Omit the check and React.cloneElement.
 * @method {clickHandler} Click event Agent
 */
export default class SelectClickTrigger extends Popover.Trigger.Click {
  static propTypes = {
    disabled: PropTypes.bool.isRequired,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    contentVisible: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    onKeyDown: PropTypes.func.isRequired
  };

  clickHandler = event => {
    const { onClick, close, open, contentVisible, disabled } = this.props;
    event.preventDefault();
    if (contentVisible) {
      close();
    } else if (!disabled) {
      open();
      onClick(event);
    }
  };

  render() {
    const { onClick, trigger, onTriggerRefChange, ...rest } = this.props;
    const Node = typeof trigger === 'string' ? NodeMap[trigger] : trigger;
    return (
      <Node {...rest} ref={onTriggerRefChange} onClick={this.clickHandler} />
    );
  }
}
