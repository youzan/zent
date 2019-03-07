import * as React from 'react';

import Popover from '../../popover';

import Input from './InputTrigger';
import Base from './BaseTrigger';
import Simple from './SimpleTrigger';
import Tags from './TagsTrigger';
import { IPopoverClickTriggerProps } from '../../popover/trigger/ClickTrigger';

export interface ISelectClickTriggerProps extends IPopoverClickTriggerProps {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  trigger?: {
    simple: boolean;
    search: boolean;
    tags: boolean;
    trigger: React.ReactNode;
  };
}

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
export default class SelectClickTrigger extends Popover.Trigger.Click<
  ISelectClickTriggerProps
> {
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
