import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Circle from '../shapes/Circle';
import Rectangle from '../shapes/Rectangle';
import TextBlock from './TextBlock';

export default class RichTextBlock extends (PureComponent || Component) {
  static propTypes = {
    rows: PropTypes.number.isRequired,
    shape: PropTypes.oneOf(['circle', 'rect']),
    size: PropTypes.number,
    style: PropTypes.object,
    animate: PropTypes.bool,
    dashed: PropTypes.bool,
    className: PropTypes.string,
    prefix: PropTypes.string
  };

  static defaultProps = {
    style: {},
    className: '',
    prefix: 'zent',
    shape: 'circle',
    animate: true,
    dashed: true,
    size: 80
  };

  render() {
    const {
      className,
      style,
      rows,
      shape,
      prefix,
      size,
      animate,
      dashed
    } = this.props;
    const classes = cx(`${prefix}-placeholder-richtext-block`, className);
    const shapeStyle = { marginRight: 10 };

    return (
      <div className={classes} style={{ ...style, display: 'flex' }}>
        {shape === 'circle' ? (
          <Circle style={shapeStyle} radius={size / 2} animate={animate} />
        ) : (
          <Rectangle
            style={shapeStyle}
            width={size}
            height={size}
            animate={animate}
          />
        )}
        <TextBlock rows={rows} animate={animate} dashed={dashed} />
      </div>
    );
  }
}
