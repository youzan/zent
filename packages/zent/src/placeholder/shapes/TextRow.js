import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class TextRow extends (PureComponent || Component) {
  static propTypes = {
    lineSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    animate: PropTypes.bool,
    className: PropTypes.string,
    prefix: PropTypes.string
  };

  static defaultProps = {
    lineSpacing: '0.7em',
    animate: true,
    prefix: 'zent'
  };

  render() {
    const { className, lineSpacing, animate, style, prefix } = this.props;
    const defaultStyles = {
      marginTop: lineSpacing
    };
    const classes = cx(
      `${prefix}-placeholder-text-row`,
      `${prefix}-placeholder-shape`,
      {
        [`${prefix}-placeholder-shape--animate`]: animate
      },
      className
    );

    return <div className={classes} style={{ ...defaultStyles, ...style }} />;
  }
}
