import React from 'react';
import Popover from 'popover';
import cx from 'classnames';

import { TimelineDot } from './Dot';

const position = Popover.Position.create(
  (anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
    const x = anchorBoundingBox.left + options.cushion;
    const middle = (anchorBoundingBox.top + anchorBoundingBox.bottom) / 2;
    const y = middle - contentDimension.height / 2;

    return {
      getCSSStyle() {
        return {
          position: 'absolute',
          left: `${Math.round(x)}px`,
          top: `${Math.round(y)}px`,
        };
      },

      name: 'timeline-tip-position',
    };
  }
);

export const TimelineItem = ({
  size,
  showLabel = true,
  showDot = true,
  color,
  lineColor = '#999',
  dotColor = '#00B90E',
  label,
  tip,
  prefix = 'zent',
  className,
  style,
  type,
}) => {
  const display = type === 'vertical' ? 'inline-block' : 'block';
  const key = type === 'vertical' ? 'height' : 'width';

  return (
    <li className={cx(`${prefix}-timeline-item`, className)} style={style}>
      <Popover
        className={`${prefix}-timeline-tip`}
        wrapperClassName={`${prefix}-timeline-item-wrapper`}
        display={display}
        position={position}
        cushion={20}
      >
        <Popover.Trigger.Hover>
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
        </Popover.Trigger.Hover>
        <Popover.Content>{tip}</Popover.Content>
      </Popover>
      {showLabel && (
        <label className={`${prefix}-timeline-item-label`}>{label}</label>
      )}
    </li>
  );
};
