import React, { Component } from 'react';

import Popover from '../src';

import '../assets/index.scss';
import '../assets/01-simple.scss';

const PopoverContent = Popover.Content;
const PopoverClickTrigger = Popover.Trigger.Click;
const PopoverHoverTrigger = Popover.Trigger.Hover;
const PopoverFocusTrigger = Popover.Trigger.Focus;
const withPopover = Popover.withPopover;

const HoverContent = withPopover(function HoverContent({ popover }) { // eslint-disable-line
  return (
    <div>
      <div>popover content</div>
      <div>line two</div>
      <div>line three</div>
      <button onClick={popover.close}>close</button>
    </div>
  );
});

export default class Simple extends Component {
  showPopover = () => {
    this.pop && this.pop.toggle();
  };

  onPopoverRefChange = instance => {
    this.pop = instance;
  };

  onButtonRefChange = instance => {
    this.button = instance;
  };

  render() {
    return (
      <div>
        <Popover position={Popover.Position.BottomLeft} display="inline">
          <PopoverClickTrigger>
            <button>click me</button>
          </PopoverClickTrigger>
          <PopoverContent>
            <div>popover content</div>
            <div>line two</div>
          </PopoverContent>
        </Popover>

        <Popover position={Popover.Position.RightTop} display="inline">
          <PopoverHoverTrigger showDelay={500} hideDelay={200}>
            <button style={{ marginLeft: 100 }}>hover on me</button>
          </PopoverHoverTrigger>
          <PopoverContent>
            <HoverContent />
          </PopoverContent>
        </Popover>

        <Popover position={Popover.Position.TopRight} display="inline" cushion={10}>
          <PopoverFocusTrigger>
            <input style={{ marginLeft: 100 }} placeholder="focus on me" />
          </PopoverFocusTrigger>
          <PopoverContent>
            <div>popover content</div>
            <div>line two focus</div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
}
