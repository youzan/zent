import React, { Component } from 'react';
import Button from '@youzan/zent-button';

import Popover from '../src';

import '../assets/index.scss';
import '@youzan/zent-button/lib/index.css';
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
      <Button onClick={popover.close}>close</Button>
    </div>
  );
});

const separator = <span style={{ width: 20, display: 'inline-block' }}></span>;

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

  onCustomEvent(evt) {
    console.log(`custom event: ${evt.type}`); // eslint-disable-line
  }

  render() {
    return (
      <div>
        <Popover position={Popover.Position.BottomLeft} display="inline">
          <PopoverClickTrigger>
            <Button onClick={this.onCustomEvent}>click me</Button>
          </PopoverClickTrigger>
          <PopoverContent>
            <div>popover content</div>
            <div>line two</div>
          </PopoverContent>
        </Popover>

        {separator}

        <Popover position={Popover.Position.RightTop} display="inline">
          <PopoverHoverTrigger showDelay={500} hideDelay={200}>
            <Button onMouseEnter={this.onCustomEvent} onMouseLeave={this.onCustomEvent}>hover on me</Button>
          </PopoverHoverTrigger>
          <PopoverContent>
            <HoverContent />
          </PopoverContent>
        </Popover>

        {separator}

        <Popover position={Popover.Position.TopRight} display="inline" cushion={10}>
          <PopoverFocusTrigger>
            <input placeholder="focus on me" onFocus={this.onCustomEvent} onBlur={this.onCustomEvent} />
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
