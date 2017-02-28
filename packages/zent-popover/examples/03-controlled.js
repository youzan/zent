/* eslint-disable no-console */

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

const hooks = {
  onShow() {
    console.log('on show');
  },

  onClose() {
    console.log('on close');
  },

  onBeforeShow() {
    console.log('on before show');
  },

  onBeforeClose() {
    console.log('on before close');
  }
};

const asyncHooks = {
  onShow() {
    console.log('on show');
  },

  onClose() {
    console.log('on close');
  },

  onBeforeShow() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('on before show');
        resolve();
      }, 500);
      console.log('wait 500ms before open');
    });
  },

  onBeforeClose(cont) {
    setTimeout(() => {
      console.log('on before close');
      cont();
    }, 300);
    console.log('wait 300ms before close');
  }
};

export default class Simple extends Component {
  state = {
    click: true,
    hover: false,
    focus: false
  };

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

  setVisible = key => visible => {
    console.log('set visible to ', visible); // eslint-disable-line

    this.setState({
      [key]: visible
    });
  };

  openAll = () => {
    this.setState({
      click: true,
      hover: true,
      focus: true
    });
  };

  closeAll = () => {
    this.setState({
      click: false,
      hover: false,
      focus: false
    });
  };

  render() {
    return (
      <div>
        <div>
          <Button type="primary" onClick={this.openAll}>Open All</Button>
          {separator}
          <Button type="primary" onClick={this.closeAll}>Close All</Button>
        </div>

        <br />

        <Popover visible={this.state.click} onVisibleChange={this.setVisible('click')} position={Popover.Position.BottomLeft} display="inline" cushion={5} {...asyncHooks}>
          <PopoverClickTrigger>
            <Button onClick={this.onCustomEvent}>click me(open delays 500ms, close delays 300ms)</Button>
          </PopoverClickTrigger>
          <PopoverContent>
            <div>popover content</div>
            <div>line two</div>
          </PopoverContent>
        </Popover>

        {separator}

        <Popover visible={this.state.hover} onVisibleChange={this.setVisible('hover')} position={Popover.Position.RightTop} display="inline" cushion={5} {...hooks}>
          <PopoverHoverTrigger showDelay={500} hideDelay={200}>
            <Button onMouseEnter={this.onCustomEvent} onMouseLeave={this.onCustomEvent}>hover on me</Button>
          </PopoverHoverTrigger>
          <PopoverContent>
            <HoverContent />
          </PopoverContent>
        </Popover>

        {separator}

        <Popover visible={this.state.focus} onVisibleChange={this.setVisible('focus')} position={Popover.Position.TopRight} display="inline" cushion={5} {...hooks}>
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
