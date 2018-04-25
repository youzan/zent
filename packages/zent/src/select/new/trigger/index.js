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
   * @memberof SelectTrigger
   */
  clickHandler = event => {
    event.preventDefault();
  };

  render() {
    const { onClick, mode, onTriggerRefChange, ...rest } = this.props;
    const Node = MODE_MAP[mode];
    return (
      <Node {...rest} ref={onTriggerRefChange} onClick={this.clickHandler} />
    );
  }
}
