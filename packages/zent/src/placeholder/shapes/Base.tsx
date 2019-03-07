import * as React from 'react';
import { PureComponent } from 'react';
import cx from 'classnames';

export interface IPlaceholderBaseShapeProps {
  className?: string;
  style?: React.CSSProperties;
  prefix?: string;
  animate?: boolean;
}

export default class Base extends PureComponent<IPlaceholderBaseShapeProps> {
  static defaultProps = {
    style: {},
    prefix: 'zent',
    animate: true,
  };

  render() {
    const { className, style, prefix, animate } = this.props;

    const classes = cx(
      `${prefix}-placeholder-shape`,
      {
        [`${prefix}-placeholder-shape--animate`]: animate,
      },
      className
    );

    return <div className={classes} style={style} />;
  }
}
