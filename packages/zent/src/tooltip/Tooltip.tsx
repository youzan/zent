import { Component, createRef, ReactElement } from 'react';
import cx from 'classnames';
import noop from '../utils/noop';
import { PopPositions } from '../pop';

import Popover, { IPositionFunction } from '../popover';

import NoneTrigger from './NoneTrigger';
import getPosition from '../utils/getArrowPosition';

const { Trigger } = Popover;

export interface ITooltipBaseProps {
  title: React.ReactNode;
  style?: React.CSSProperties;
  position?: PopPositions | IPositionFunction;
  cushion?: number;
  centerArrow?: boolean;
  className?: string;
  containerSelector?: string;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  children: ReactElement | string | number;
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
  anchorOnly?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}

type ITooltipProps =
  | ITooltipTriggerProps
  | ITooltipTriggerClickProps
  | ITooltipTriggerHoverProps;

export class Tooltip extends Component<ITooltipProps> {
  static defaultProps = {
    trigger: 'hover',
    position: 'top-center',
    cushion: 10,
    centerArrow: false,
    containerSelector: 'body',
  };

  popoverRef = createRef<Popover>();

  renderContent() {
    const { title } = this.props;

    return (
      <Popover.Content>
        <div className={`zent-tooltip-v2-inner`}>{title}</div>
        <i className={`zent-tooltip-v2-arrow`} />
      </Popover.Content>
    );
  }

  renderTrigger() {
    const { children } = this.props;

    if (this.props.trigger === 'click') {
      const { closeOnClickOutside = true } = this.props;
      return (
        <Trigger.Click closeOnClickOutside={closeOnClickOutside}>
          {children}
        </Trigger.Click>
      );
    }

    if (this.props.trigger === 'hover') {
      const {
        mouseLeaveDelay = 200,
        mouseEnterDelay = 200,
        anchorOnly,
      } = this.props;
      return (
        <Trigger.Hover
          showDelay={mouseEnterDelay}
          hideDelay={mouseLeaveDelay}
          anchorOnly={anchorOnly}
        >
          {children}
        </Trigger.Hover>
      );
    }

    if (this.props.trigger === 'focus') {
      return <Trigger.Focus>{children}</Trigger.Focus>;
    }

    if (this.props.trigger === 'none') {
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
      style,
    } = this.props;

    const cls = cx(`zent-tooltip-v2`, className);

    let { onVisibleChange } = this.props;
    if (trigger === 'none') {
      onVisibleChange = onVisibleChange || noop;
    }

    return (
      <Popover
        visible={visible}
        onVisibleChange={onVisibleChange}
        className={cls}
        cushion={cushion}
        position={getPosition(position, centerArrow)}
        containerSelector={containerSelector}
        ref={this.popoverRef}
        style={style}
      >
        {this.renderTrigger()}
        {this.renderContent()}
      </Popover>
    );
  }
}

export default Tooltip;
