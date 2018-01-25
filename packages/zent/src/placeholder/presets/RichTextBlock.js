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
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    lineSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    widths: PropTypes.arrayOf(PropTypes.number),
    dashed: PropTypes.bool,
    dashSegments: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    animate: PropTypes.bool,
    style: PropTypes.object,
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
      dashed,
      widths,
      dashSegments,
      lineSpacing
    } = this.props;
    const classes = cx(`${prefix}-placeholder-richtext-block`, className);
    const shapeStyle = { marginRight: 10 };

    return (
      <div className={classes} style={{ ...style, display: 'flex' }}>
        {shape === 'circle' ? (
          <Circle style={shapeStyle} diameter={size} animate={animate} />
        ) : (
          <Rectangle
            style={shapeStyle}
            width={size}
            height={size}
            animate={animate}
          />
        )}
        <TextBlock
          rows={rows}
          animate={animate}
          dashed={dashed}
          widths={widths}
          dashSegments={dashSegments}
          lineSpacing={lineSpacing}
        />
      </div>
    );
  }
}
