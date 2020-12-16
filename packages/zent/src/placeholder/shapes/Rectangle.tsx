import { PureComponent } from 'react';
import cx from 'classnames';

import Base, { IPlaceholderBaseShapeProps } from './Base';

export interface IPlaceholderRectangleProps extends IPlaceholderBaseShapeProps {
  width?: number;
  height?: number;
}

export default class Rectangle extends PureComponent<IPlaceholderRectangleProps> {
  static defaultProps = {
    style: {},
    animate: true,
    width: 80,
    height: 80,
  };

  render() {
    const { className, width, height, style, ...passThrough } = this.props;
    const classes = cx('zent-placeholder-rectangle', className);
    const mergedStyle = {
      minWidth: width,
      height,
      ...style,
    };

    return <Base className={classes} style={mergedStyle} {...passThrough} />;
  }
}
