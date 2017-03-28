import React, { PropTypes, Component } from 'react';
import Dropdown from '../src';
import Popover from 'zent-popover';

export default class Simple extends Component {
  render() {
    return (
      <div>
        <Dropdown position="RightTop">
          <Dropdown.Trigger>
            <a>Hover Me</a>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <div>dropdown</div>
          </Dropdown.Content>
        </Dropdown>
        {/* <Popover position={Popover.Position.RightTop}>
          <Popover.Trigger.Hover>
            <a>Hover Me</a>
          </Popover.Trigger.Hover>
          <Popover.Content>
            <div>dropdown</div>
          </Popover.Content>
        </Popover> */}
      </div>
    );
  }
};
