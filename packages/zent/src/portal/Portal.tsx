import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';

import LayeredPortal, { ILayeredPortalProps } from './LayeredPortal';
import withESCToClose from './withESCToClose';
import withNonScrollable from './withNonScrollable';
import PurePortal from './PurePortal';

export interface IPortalProps extends ILayeredPortalProps {
  prefix?: string;
}

export class Portal extends Component<IPortalProps> {
  static defaultProps = {
    prefix: 'zent',
    visible: true,
  };

  static withESCToClose = withESCToClose;
  static withNonScrollable = withNonScrollable;
  static PurePortal = PurePortal;
  static LayeredPortal = LayeredPortal;

  render() {
    const { prefix, className, ...other } = this.props;
    return (
      <LayeredPortal className={cx(`${prefix}-portal`, className)} {...other} />
    );
  }
}

export default Portal;
