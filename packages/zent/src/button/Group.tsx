import * as React from 'react';
import { Component } from 'react';
import setClass from 'classnames';

export interface IButtonGroupProps {
  className?: string
  prefix?: string
  style?: React.CSSProperties
}

export class ButtonGroup extends Component<IButtonGroupProps> {
  static defaultProps = {
    style: null,
    className: '',
    prefix: 'zent',
  };

  render() {
    const { prefix, className, style, children, ...other } = this.props;
    const classNames = setClass(`${prefix}-btn-group`, className);

    return (
      <div className={classNames} style={style} {...other}>
        {children}
      </div>
    );
  }
}

export default ButtonGroup;
