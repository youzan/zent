import * as React from 'react';
import { PureComponent } from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

export interface IPlaceholderTextRowProps {
  className?: string;
  prefix?: string;
  style?: React.CSSProperties;
  animate?: boolean;
  lineSpacing?: string | number;
}

export default class TextRow extends PureComponent<IPlaceholderTextRowProps> {
  static propTypes = {
    lineSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    style: PropTypes.object,
    animate: PropTypes.bool,
    className: PropTypes.string,
    prefix: PropTypes.string,
  };

  static defaultProps = {
    lineSpacing: '0.7em',
    animate: true,
    prefix: 'zent',
  };

  render() {
    const { className, lineSpacing, animate, style, prefix } = this.props;
    const defaultStyles = {
      marginTop: lineSpacing,
    };
    const classes = cx(
      `${prefix}-placeholder-text-row`,
      `${prefix}-placeholder-shape`,
      {
        [`${prefix}-placeholder-shape--animate`]: animate,
      },
      className
    );

    return <div className={classes} style={{ ...defaultStyles, ...style }} />;
  }
}
