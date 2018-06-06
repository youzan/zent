import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import isString from 'lodash/isString';

import { TimelineItem } from './Item';
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

export class Timeline extends PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(['vertical', 'horizontal']),
    className: PropTypes.string,
    style: PropTypes.object,
    prefix: PropTypes.string,
  };

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
    return React.Children.map(children, child =>
      React.cloneElement(child, {
        type,
      })
    );
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
