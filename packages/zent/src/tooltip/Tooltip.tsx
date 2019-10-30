import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import noop from 'lodash-es/noop';
import { PopPositions } from '../pop';

import Popover, { PositionFunction } from '../popover';

import NoneTrigger from './NoneTrigger';
import getPosition from './utils';

const { Trigger } = Popover;

export interface ITooltipProps {
  title: React.ReactNode;
  trigger?: 'none' | 'click' | 'hover' | 'focus';
  position?: PopPositions | PositionFunction;
  cushion?: number;
  centerArrow?: boolean;
  className?: string;
  containerSelector?: string;
  prefix?: string;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  isOutside?: (
    target: HTMLElement,
    node: { contentNode: HTMLElement; triggerNode: HTMLElement }
  ) => boolean;

  // trigger: click
  closeOnClickOutside?: boolean;

  // trigger: hover
  quirk?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}

export class Tooltip extends Component<ITooltipProps> {
  static defaultProps = {
    trigger: 'none',
    position: 'top-center',
    cushion: 10,
    centerArrow: false,
    closeOnClickOutside: true,
    mouseLeaveDelay: 200,
    mouseEnterDelay: 200,
    className: '',
    containerSelector: 'body',
    prefix: 'zent',
    quirk: true,
  };

  popover: Popover;
  isUnmounted = false;

  renderContent() {
    const { prefix, title } = this.props;

    return (
      <Popover.Content>
        <div className={`${prefix}-tooltip-inner`}>{title}</div>
        <i className={`${prefix}-tooltip-arrow`} />
      </Popover.Content>
    );
  }

  renderTrigger() {
    const {
      trigger,
      closeOnClickOutside,
      isOutside,
      mouseLeaveDelay,
      mouseEnterDelay,
      children,
      quirk,
    } = this.props;

    if (trigger === 'click') {
      return (
        <Trigger.Click autoClose={closeOnClickOutside} isOutside={isOutside}>
          {children}
        </Trigger.Click>
      );
    }

    if (trigger === 'hover') {
      return (
        <Trigger.Hover
          showDelay={mouseEnterDelay}
          hideDelay={mouseLeaveDelay}
          isOutside={isOutside}
          quirk={quirk}
        >
          {children}
        </Trigger.Hover>
      );
    }

    if (trigger === 'focus') {
      return <Trigger.Focus>{children}</Trigger.Focus>;
    }

    if (trigger === 'none') {
      return <NoneTrigger>{children}</NoneTrigger>;
    }

    return null;
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    const {
      className,
      trigger,
      visible,
      prefix,
      position,
      cushion,
      centerArrow,
      containerSelector,
    } = this.props;

    const cls = cx(`${prefix}-tooltip`, className);

    let { onVisibleChange } = this.props;
    if (trigger === 'none') {
      onVisibleChange = onVisibleChange || noop;
    }

    return (
      <Popover
        visible={visible}
        onVisibleChange={onVisibleChange}
        prefix={prefix}
        wrapperClassName={`${prefix}-tooltip-wrapper`}
        className={cls}
        cushion={cushion}
        position={getPosition(position, centerArrow)}
        containerSelector={containerSelector}
        ref={this.onPopoverRefChange}
      >
        {this.renderTrigger()}
        {this.renderContent()}
      </Popover>
    );
  }

  onPopoverRefChange = popoverInstance => {
    this.popover = popoverInstance;
  };
}

export default Tooltip;
