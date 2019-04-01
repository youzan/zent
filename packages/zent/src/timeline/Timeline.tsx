import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';
import isString from 'lodash-es/isString';
import { isElement } from 'react-is';

import { TimelineItem, ITimelineItemProps } from './Item';
import { TimelineLegend } from './Dot';

function normalize(timeline, size) {
  return timeline.map((item, index) => {
    if (isString(item)) {
      return {
        key: item,
        label: item,
      };
    }
    const { id, percent, ...others } = item;
    return {
      key: id || index,
      size: percent && percent * size,
      ...others,
    };
  });
}

export interface ITimelineArrayItem extends ITimelineItemProps {
  id?: string;
  percent?: number;
}

export interface ITimelineProps {
  size?: number | string;
  timeline?: ITimelineArrayItem[];
  type?: 'vertical' | 'horizontal';
  className?: string;
  prefix?: string;
  style?: React.CSSProperties;
}

export class Timeline extends PureComponent<ITimelineProps> {
  static defaultProps = {
    prefix: 'zent',
    type: 'horizontal',
    size: '100%',
    style: {},
  };

  static Item = TimelineItem;

  static Legend = TimelineLegend;

  renderChildren() {
    const { children, timeline, type, size } = this.props;
    if (timeline && timeline.length) {
      return normalize(timeline, size).reduce((ret, item) => {
        ret.push(<TimelineItem {...item} type={type} />);
        return ret;
      }, []);
    }
    return React.Children.map(children, child => {
      if (!isElement(child)) {
        return null;
      }

      return React.cloneElement(child, {
        type,
      });
    });
  }

  render() {
    const { size, prefix, type, className } = this.props;
    const key = type === 'horizontal' ? 'width' : 'height';
    const style = {
      ...this.props.style,
      [key]: size,
    };

    return (
      <ul
        className={cx(
          `${prefix}-timeline`,
          `${prefix}-timeline-${type}`,
          {
            [`${prefix}-timeline-dynamic`]: Boolean(size),
          },
          className
        )}
        style={style}
      >
        {this.renderChildren()}
      </ul>
    );
  }
}

export default Timeline;
