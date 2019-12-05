import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import noop from '../utils/noop';
import { PopPositions } from '../pop';

import Popover, { PositionFunction } from '../popover';

import NoneTrigger from './NoneTrigger';
import getPosition from '../utils/getArrowPosition';

const { Trigger } = Popover;

export interface ITooltipBaseProps {
  title: React.ReactNode;
  position?: PopPositions | PositionFunction;
  cushion?: number;
  centerArrow?: boolean;
  className?: string;
  containerSelector?: string;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  isOutside?: (
    target: HTMLElement,
    node: { contentNode: HTMLElement; triggerNode: HTMLElement }
  ) => boolean;
}

interface ITooltipTriggerProps extends ITooltipBaseProps {
  trigger?: 'none' | 'focus';
}

// trigger: click
interface ITooltipTriggerClickProps extends ITooltipBaseProps {
  trigger?: 'click';
  closeOnClickOutside?: boolean;
}

// trigger: hover
interface ITooltipTriggerHoverProps extends ITooltipBaseProps {
  trigger?: 'hover';
  quirk?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}

type ITooltipProps =
  | ITooltipTriggerProps
  | ITooltipTriggerClickProps
  | ITooltipTriggerHoverProps;

function isITooltipTriggerClickProps(
  props: ITooltipProps
): props is ITooltipTriggerClickProps {
  return true;
}

function ITooltipTriggerHoverProps(
  props: ITooltipProps
): props is ITooltipTriggerHoverProps {
  return true;
}

export class Tooltip extends Component<ITooltipProps> {
  static defaultProps = {
    trigger: 'hover',
    position: 'top-center',
    cushion: 10,
    centerArrow: false,
    containerSelector: 'body',
  };

  popoverRef = React.createRef<Popover>();

  renderContent() {
    const { title } = this.props;

    return (
      <Popover.Content>
        <div className={`zent-tooltip-inner`}>{title}</div>
        <i className={`zent-tooltip-arrow`} />
      </Popover.Content>
    );
  }

  renderTrigger() {
    const { trigger, isOutside, children } = this.props;

    if (trigger === 'click' && isITooltipTriggerClickProps(this.props)) {
      const { closeOnClickOutside = true } = this.props;
      return (
        <Trigger.Click autoClose={closeOnClickOutside} isOutside={isOutside}>
          {children}
        </Trigger.Click>
      );
    }

    if (trigger === 'hover' && ITooltipTriggerHoverProps(this.props)) {
      const {
        mouseLeaveDelay = 200,
        mouseEnterDelay = 200,
        quirk = true,
      } = this.props;
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

  render() {
    const {
      className,
      trigger,
      visible,
      position,
      cushion,
      centerArrow,
      containerSelector,
    } = this.props;

    const cls = cx(`zent-tooltip`, className);

    let { onVisibleChange } = this.props;
    if (trigger === 'none') {
      onVisibleChange = onVisibleChange || noop;
    }

    return (
      <Popover
        visible={visible}
        onVisibleChange={onVisibleChange}
        wrapperClassName={`zent-tooltip-wrapper`}
        className={cls}
        cushion={cushion}
        position={getPosition(position, centerArrow)}
        containerSelector={containerSelector}
        ref={this.popoverRef}
      >
        {this.renderTrigger()}
        {this.renderContent()}
      </Popover>
    );
  }
}

export default Tooltip;
