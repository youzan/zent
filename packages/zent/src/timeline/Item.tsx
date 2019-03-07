import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';

import Popover from '../popover';
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
        wrapperClassName={`${prefix}-timeline-item-wrapper`}
        display={display}
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

  position = Popover.Position.create(
    (anchorBoundingBox, containerBoundingBox, contentDimension) => {
      const x = anchorBoundingBox.left;
      const middle = (anchorBoundingBox.top + anchorBoundingBox.bottom) / 2;
      const y = middle - contentDimension.height / 2;

      return {
        getCSSStyle: () => {
          if (this.props.type === 'horizontal') {
            return {
              position: 'absolute',
              left: `${Math.round(this.mousePosition.x)}px`,
              top: `${Math.round(y - 40)}px`,
            };
          }
          return {
            position: 'absolute',
            left: `${Math.round(x + 20)}px`,
            top: `${Math.round(this.mousePosition.y)}px`,
          };
        },

        name: 'timeline-tip-position',
      };
    }
  );

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
