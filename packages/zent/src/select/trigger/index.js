import * as React from 'react';
import PropTypes from 'prop-types';

import Popover from 'popover';

import Input from './InputTrigger';
import Base from './BaseTrigger';
import Simple from './SimpleTrigger';
import Tags from './TagsTrigger';

/**
 * @description Return string tag used to determine which trigger will be used
 * @export
 * @param {props} { simple, search, tags, trigger }
 * @returns {string|Class|Function}
 */
function decideTrigger({ simple, search, tags, trigger }) {
  if (simple) return Simple;
  if (search) return Input;
  if (tags) return Tags;
  return trigger || Base;
}

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
    open: PropTypes.func,
    close: PropTypes.func,
    contentVisible: PropTypes.bool,
    onClick: PropTypes.func,
    trigger: PropTypes.object.isRequired,
    onKeyDown: PropTypes.func,
  };

  clickHandler = event => {
    const { onClick, close, open, contentVisible, disabled } = this.props;
    event.preventDefault();
    if (contentVisible) {
      close();
    } else if (!disabled) {
      open();
      if (onClick) {
        onClick(event);
      }
    }
  };

  render() {
    const { onClick, trigger, onTriggerRefChange, ...rest } = this.props;
    const Node = decideTrigger(trigger);
    return (
      <Node {...rest} ref={onTriggerRefChange} onClick={this.clickHandler} />
    );
  }
}
