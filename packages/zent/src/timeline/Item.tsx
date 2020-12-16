import { PureComponent } from 'react';
import cx from 'classnames';

import Popover, { IPositionFunction } from '../popover';
import { TimelineDot } from './Dot';

const TimelineItemOptionalPop = ({ children, tip, position, popoverRef }) => {
  if (tip) {
    return (
      <Popover
        ref={popoverRef}
        className="zent-timeline-tip"
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
  className?: string;
  style?: React.CSSProperties;
  type?: 'vertical' | 'horizontal';
}

export class TimelineItem extends PureComponent<ITimelineItemProps> {
  static defaultProps = {
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

  position: IPositionFunction = ({
    anchorRect,
    contentRect,
    containerRect,
  }) => {
    const { type } = this.props;
    const x = anchorRect.left;
    const middle = (anchorRect.top + anchorRect.bottom) / 2;
    const y = middle - contentRect.height / 2;
    return {
      style:
        type === 'horizontal'
          ? {
              position: 'absolute',
              left: `${Math.round(
                this.mousePosition.x - containerRect.left
              )}px`,
              top: `${Math.round(y - 40)}px`,
            }
          : {
              position: 'absolute',
              left: `${Math.round(x + 20)}px`,
              top: `${Math.round(this.mousePosition.y - containerRect.top)}px`,
            },
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
      lineColor,
      dotColor,
    } = this.props;
    const key = type === 'vertical' ? 'height' : 'width';

    return (
      <li
        className={cx('zent-timeline-item', className)}
        style={style}
        onMouseMove={this.onMouseMove}
      >
        <TimelineItemOptionalPop
          tip={tip}
          position={this.position}
          popoverRef={this.popoverRef}
        >
          <div className="zent-timeline-item-hover">
            <div
              className="zent-timeline-item-line"
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
          <label className="zent-timeline-item-label">{label}</label>
        )}
      </li>
    );
  }
}
