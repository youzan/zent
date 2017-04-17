import React, { Component } from 'react';
import Button from 'zent-button';

import Popover from '../src';

import '../assets/index.scss';
import 'zent-button/lib/index.css';
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
    const pos = Popover.Position.AutoBottomCenter;

    return (
      <div>
        <Popover position={Popover.Position.BottomLeft} display="inline" cushion={5}>
          <PopoverClickTrigger>
            click me
          </PopoverClickTrigger>
          <PopoverContent>
            <div>popover content</div>
            <div>line two</div>

            <Popover position={Popover.Position.BottomLeft} display="inline" cushion={5}>
              <PopoverClickTrigger>
                click me
              </PopoverClickTrigger>
              <PopoverContent>
                <div>popover content</div>
                <div>line two</div>

                <Popover position={Popover.Position.BottomLeft} display="inline" cushion={5}>
                  <PopoverClickTrigger>
                    click me
                  </PopoverClickTrigger>
                  <PopoverContent>
                    <div>popover content</div>
                    <div>line two</div>
                  </PopoverContent>
                </Popover>
              </PopoverContent>
            </Popover>
          </PopoverContent>
        </Popover>

        {separator}

        <Popover position={Popover.Position.RightTop} display="inline" cushion={5}>
          <PopoverHoverTrigger showDelay={500} hideDelay={200}>
            <Button onMouseEnter={this.onCustomEvent} onMouseLeave={this.onCustomEvent}>hover on me</Button>
          </PopoverHoverTrigger>
          <PopoverContent>
            <HoverContent />

            <Popover position={Popover.Position.RightTop} display="inline" cushion={5}>
              <PopoverHoverTrigger showDelay={500} hideDelay={200}>
                <Button onMouseEnter={this.onCustomEvent} onMouseLeave={this.onCustomEvent}>hover on me</Button>
              </PopoverHoverTrigger>
              <PopoverContent>
                <HoverContent />

                <Popover position={Popover.Position.RightTop} display="inline" cushion={5}>
                  <PopoverHoverTrigger showDelay={500} hideDelay={200}>
                    <Button onMouseEnter={this.onCustomEvent} onMouseLeave={this.onCustomEvent}>hover on me</Button>
                  </PopoverHoverTrigger>
                  <PopoverContent>
                    <HoverContent />
                  </PopoverContent>
                </Popover>
              </PopoverContent>
            </Popover>
          </PopoverContent>
        </Popover>

        {separator}

        <Popover position={Popover.Position.TopRight} display="inline" cushion={5}>
          <PopoverFocusTrigger>
            <input placeholder="focus on me" onFocus={this.onCustomEvent} onBlur={this.onCustomEvent} />
          </PopoverFocusTrigger>
          <PopoverContent>
            <div>popover content</div>
            <div>line two focus</div>
          </PopoverContent>
        </Popover>

        {separator}

        <Popover position={pos} display="inline" cushion={5}>
          <PopoverClickTrigger>
            click me
          </PopoverClickTrigger>
          <PopoverContent>
            <div>popover content</div>
            <div>line two</div>
          </PopoverContent>
        </Popover>

        <Popover position={pos} display="inline" cushion={5} wrapperClassName="popover-wrapper-example-top-left">
          <PopoverClickTrigger>
            click me
          </PopoverClickTrigger>
          <PopoverContent>
            <div>popover content</div>
            <div>line two</div>
          </PopoverContent>
        </Popover>

        <Popover position={pos} display="inline" cushion={5} wrapperClassName="popover-wrapper-example-top-right">
          <PopoverClickTrigger>
            click me
          </PopoverClickTrigger>
          <PopoverContent>
            <div>popover content</div>
            <div>line two</div>
          </PopoverContent>
        </Popover>

        <Popover position={pos} display="inline" cushion={5} wrapperClassName="popover-wrapper-example-bottom-right">
          <PopoverClickTrigger>
            click me
          </PopoverClickTrigger>
          <PopoverContent>
            <div>popover content</div>
            <div>line two</div>
          </PopoverContent>
        </Popover>

        <Popover position={pos} display="inline" cushion={5} wrapperClassName="popover-wrapper-example-bottom-left">
          <PopoverClickTrigger>
            click me
          </PopoverClickTrigger>
          <PopoverContent>
            <div>popover content</div>
            <div>line two</div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
}
