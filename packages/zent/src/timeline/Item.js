import React, { Component } from 'react';
import Popover from 'popover';
import cx from 'classnames';
import PropTypes from 'prop-types';

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

const TimelineItemOptionalPop = ({ children, tip, display, prefix }) => {
  if (tip) {
    return (
      <Popover
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

export class TimelineItem extends Component {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    label: PropTypes.node,
    tip: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    type: PropTypes.oneOf(['vertical', 'horizontal']),
    prefix: PropTypes.string,
    showLabel: PropTypes.bool,
    showDot: PropTypes.bool,
    lineColor: PropTypes.string,
    dotColor: PropTypes.string,
  };

  static defaultProps = {
    prefix: 'zent',
    showLabel: true,
    showDot: true,
    lineColor: '#999',
    dotColor: '#4b0',
  };

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
      <li className={cx(`${prefix}-timeline-item`, className)} style={style}>
        <TimelineItemOptionalPop display={display} tip={tip} prefix={prefix}>
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
