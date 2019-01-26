import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import * as PropTypes from 'prop-types';

import LayeredPortal, { ILayeredPortalProps } from './LayeredPortal';
import withESCToClose from './withESCToClose';
import withNonScrollable from './withNonScrollable';
import PurePortal from './PurePortal';

export interface IPortalProps extends ILayeredPortalProps {
  prefix?: string;
}

// Portal.withESCToClose = withESCToClose;
// Portal.withNonScrollable = withNonScrollable;
// Portal.PurePortal = PurePortal;
// Portal.LayeredPortal = LayeredPortal;

export class Portal extends Component<IPortalProps> {
  static propTypes = {
    // visible
    visible: PropTypes.bool,
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,

    // children
    children: PropTypes.node,
    render: PropTypes.func,

    // parent node
    selector: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    // layer
    layer: PropTypes.string,
    useLayerForClickAway: PropTypes.bool,
    onClickAway: PropTypes.func,
    onLayerReady: PropTypes.func,

    // layer style
    prefix: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    css: PropTypes.object, // deprecated
  };

  static defaultProps = {
    prefix: 'zent',
    visible: true,
  };

  static withESCToClose = withESCToClose;
  static withNonScrollable = withNonScrollable;
  static PurePortal = PurePortal
  static LayeredPortal = LayeredPortal;

  render() {
    const { prefix, className, ...other } = this.props;
    return (
      <LayeredPortal className={cx(`${prefix}-portal`, className)} {...other} />
    );
  }
}

export default Portal;
