import { PureComponent } from 'react';
import cx from 'classnames';

export interface IPlaceholderBaseShapeProps {
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
}

export default class Base extends PureComponent<IPlaceholderBaseShapeProps> {
  static defaultProps = {
    style: {},
    animate: true,
  };

  render() {
    const { className, style, animate } = this.props;

    const classes = cx(
      'zent-placeholder-shape',
      {
        'zent-placeholder-shape--animate': animate,
      },
      className
    );

    return <div className={classes} style={style} />;
  }
}
