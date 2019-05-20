import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';

import Popover, { IPositionFunction } from '../popover';
import { TimelineDot } from './Dot';

const TimelineItemOptionalPop = ({
  children,
  tip,
  display,
  prefix,
  position,
  popoverRef,
}) => {
  if (tip) {
    return (
      <Popover
        ref={popoverRef}
        className={`${prefix}-timeline-tip`}
        position={position}
        cushion={20}
      >
        <Popover.Trigger.Hover>{children}</Popover.Trigger.Hover>
        <Popover.Content>{tip}</Popover.Content>
      </Popover>
    );
  }

  return children;
};

export interface ITimelineItemProps {
  size?: number;
  showLabel?: boolean;
  showDot?: boolean;
  color?: string;
  lineColor?: string;
  dotColor?: string;
  label?: React.ReactNode;
  tip?: React.ReactNode;
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: 'vertical' | 'horizontal';
}

export class TimelineItem extends PureComponent<ITimelineItemProps> {
  static defaultProps = {
    prefix: 'zent',
    showLabel: true,
    showDot: true,
    lineColor: '#f2f3f5',
    dotColor: '#155BD4',
  };

  popover: Popover | null = null;

  mousePosition = {
    x: 0,
    y: 0,
  };

  onMouseMove = e => {
    this.mousePosition.x = e.clientX;
    this.mousePosition.y = e.clientY;
    this.popover && this.popover.adjustPosition();
  };

  position: IPositionFunction = ({ relativeRect, contentRect }) => {
    const x = relativeRect.left;
    const middle = (relativeRect.top + relativeRect.bottom) / 2;
    const y = middle - contentRect.height / 2;
    const { type } = this.props;
    let style: React.CSSProperties;
    if (type === 'horizontal') {
      style = {
        position: 'absolute',
        left: this.mousePosition.x,
        top: y - 40,
      };
    } else {
      style = {
        position: 'absolute',
        left: x + 20,
        top: this.mousePosition.y,
      };
    }
    return {
      style,
    };
  };

  popoverRef = el => (this.popover = el);

  render() {
    const {
      size,
      showLabel = true,
      showDot = true,
      color,
      label,
      tip,
      className,
      style,
      type,
      prefix,
      lineColor,
      dotColor,
    } = this.props;
    const display = type === 'vertical' ? 'inline-block' : 'block';
    const key = type === 'vertical' ? 'height' : 'width';

    return (
      <li
        className={cx(`${prefix}-timeline-item`, className)}
        style={style}
        onMouseMove={this.onMouseMove}
      >
        <TimelineItemOptionalPop
          display={display}
          tip={tip}
          prefix={prefix}
          position={this.position}
          popoverRef={this.popoverRef}
        >
          <div className={`${prefix}-timeline-item-hover`}>
            <div
              className={`${prefix}-timeline-item-line`}
              style={{
                [key]: size,
                backgroundColor: color || lineColor,
              }}
            >
              {showDot && <TimelineDot color={color || dotColor} />}
            </div>
          </div>
        </TimelineItemOptionalPop>
        {showLabel && (
          <label className={`${prefix}-timeline-item-label`}>{label}</label>
        )}
      </li>
    );
  }
}
