import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';

// FIXME: export from zenticons

export interface IIconProps extends React.HTMLAttributes<HTMLElement> {
  type: string;
  className?: string;
  spin?: boolean;
}

export class Icon extends Component<IIconProps> {
  static defaultProps = {
    className: '',
    spin: false,
  };

  render() {
    const { type, className, spin, ...otherProps } = this.props;
    const cls = cx('zenticon', `zenticon-${type}`, className, {
      'zenticon-spin': spin,
    });

    return <i className={cls} {...otherProps} />;
  }
}

export default Icon;
