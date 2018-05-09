import * as React from 'react';
import Popover from 'popover';

import Search from './SearchTrigger';
import Base from './BaseTrigger';
import Tags from './TagsTrigger';

const MODE_MAP = {
  search: Search,
  base: Base,
  tags: Tags,
};

/**
 * @description exclusive click trigger of select
 * @class SelectTrigger
 * @extends {Popover.Trigger.Click}
 * @method {render} Major changes, Omit the check and React.cloneElement.
 * @method {clickHandler} Click event Agent
 */
export default class SelectTrigger extends Popover.Trigger.Click {
  /**
   * @description Decentralize control access(open and close) to subcomponents
   * @notice disabled logic
   * @memberof SelectTrigger
   */
  clickHandler = event => {
    event.preventDefault();
  };

  state = {
    focused: false,
  };

  focusHandler = e => {
    if (this.props.disabled) return;
    this.setState({ focused: true });
    this.props.onFocus(e);
  };

  blurHandler = e => {
    if (this.props.disabled) return;
    this.setState({ focused: false });
    if (this.props.contentVisible) {
      this.props.close();
    }
    this.props.onBlur(e);
  };

  render() {
    const { onClick, mode, onTriggerRefChange, ...rest } = this.props;
    const { focused } = this.state;
    const { _cn: cn, contentVisible, selected, disabled } = rest;
    const Node = MODE_MAP[mode];
    return (
      <div
        className={cn('trigger-wrapper', {
          focused,
          disabled,
          popout: contentVisible,
          selected: selected.length,
        })}
      >
        <Node
          {...rest}
          ref={onTriggerRefChange}
          onBlur={this.blurHandler}
          onClick={this.clickHandler}
          onFocus={this.focusHandler}
        />
      </div>
    );
  }
}
