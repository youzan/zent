import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import TextRow from '../shapes/TextRow';
import TextRowDashed, { DEFAULT_SEGMENTS } from '../shapes/TextRowDashed';

export default class TextBlock extends (PureComponent || Component) {
  static propTypes = {
    rows: PropTypes.number.isRequired,
    lineSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    widths: PropTypes.arrayOf(PropTypes.number),
    dashSegments: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number, PropTypes.string)
    ),
    dashed: PropTypes.bool,
    animate: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    prefix: PropTypes.string
  };

  static defaultProps = {
    widths: [97, 99, 94, 92, 96, 95, 98, 60],
    dashSegments: DEFAULT_SEGMENTS,
    animate: true,
    dashed: true,
    lineSpacing: '0.7em',
    prefix: 'zent'
  };

  getRowStyle = i => {
    const { widths } = this.props;

    return {
      width: `${widths[i % widths.length]}%`
    };
  };

  getRows = () => {
    const {
      rows,
      lineSpacing,
      prefix,
      animate,
      dashed,
      dashSegments
    } = this.props;
    const textRows = [];

    for (let i = 0; i < rows; i++) {
      const Comp = dashed ? TextRowDashed : TextRow;
      const props = {
        style: this.getRowStyle(i),
        lineSpacing: i ? lineSpacing : 0,
        prefix,
        animate,
        key: i
      };
      if (dashed) {
        props.segments = dashSegments[i % dashSegments.length];
      }

      textRows.push(<Comp {...props} />);
    }

    return textRows;
  };

  render() {
    const { style, className, prefix } = this.props;
    const classes = cx(`${prefix}-placeholder-text-block`, className);

    return (
      <div className={classes} style={{ ...style, width: '100%' }}>
        {this.getRows()}
      </div>
    );
  }
}
