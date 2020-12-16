import { PureComponent } from 'react';
import cx from 'classnames';

export interface IPlaceholderTextRowProps {
  className?: string;
  style?: React.CSSProperties;
  animate?: boolean;
  lineSpacing?: string | number;
}

export default class TextRow extends PureComponent<IPlaceholderTextRowProps> {
  static defaultProps = {
    lineSpacing: '0.7em',
    animate: true,
  };

  render() {
    const { className, lineSpacing, animate, style } = this.props;
    const defaultStyles = {
      marginTop: lineSpacing,
    };
    const classes = cx(
      'zent-placeholder-text-row',
      'zent-placeholder-shape',
      {
        'zent-placeholder-shape--animate': animate,
      },
      className
    );

    return <div className={classes} style={{ ...defaultStyles, ...style }} />;
  }
}
