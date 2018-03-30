import React, { Component, PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import LayeredPortal from './LayeredPortal';

export default class Portal extends (PureComponent || Component) {
  static propTypes = {
    // visible
    visible: PropTypes.bool.isRequired,

    // children
    children: PropTypes.node.isRequired,
    render: PropTypes.func,

    // parent node
    selector: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
      .isRequired,

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

  static contextTypes = {
    zentI18n: PropTypes.object,
  };

  render() {
    const { prefix, className, ...other } = this.props;
    return (
      <LayeredPortal className={cx(`${prefix}-portal`, className)} {...other} />
    );
  }
}
