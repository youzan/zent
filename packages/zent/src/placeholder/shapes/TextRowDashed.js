import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import sample from 'lodash/sample';
import isArray from 'lodash/isArray';

export const DEFAULT_SEGMENTS = [
  [61.8, 38],
  [30, 25, 44],
  [20, 75],
  [33, 16, 20, 27],
  [12, 32, 53],
  [45, 12, 42],
  [20, 10, 47, 18],
  [14, 47, 37]
];

export default class TextRowDashed extends (PureComponent || Component) {
  static propTypes = {
    style: PropTypes.object,
    lineSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    segments: PropTypes.array,
    animate: PropTypes.bool,
    className: PropTypes.string,
    prefix: PropTypes.string
  };

  static defaultProps = {
    lineSpacing: '0.7em',
    animate: true,
    prefix: 'zent'
  };

  constructor(props) {
    super(props);

    this.state = {
      segments: sample(DEFAULT_SEGMENTS)
    };
  }

  render() {
    const {
      className,
      lineSpacing,
      animate,
      segments,
      style,
      prefix
    } = this.props;
    const defaultStyles = {
      marginTop: lineSpacing
    };
    const classes = cx(`${prefix}-placeholder-text-row-dashed`, className);
    const segmengtClasses = cx(`${prefix}-placeholder-shape`, {
      [`${prefix}-placeholder-shape--animate`]: animate
    });
    const rawSegments = isArray(segments) ? segments : this.state.segments;

    return (
      <div className={classes} style={{ ...defaultStyles, ...style }}>
        {rawSegments.map((seg, i) => (
          <div
            key={i}
            className={`${prefix}-placeholder-text-row-dashed-segment`}
            style={{ width: `${seg}%`, paddingLeft: i === 0 ? 0 : '0.3em' }}
          >
            <div className={segmengtClasses} />
          </div>
        ))}
      </div>
    );
  }
}
