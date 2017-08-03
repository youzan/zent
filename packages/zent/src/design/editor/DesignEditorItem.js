import React, { PureComponent, Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

export default class DesignEditorItem extends (PureComponent || Component) {
  static propTypes = {
    children: PropTypes.node.isRequired,

    disabled: PropTypes.bool,

    prefix: PropTypes.string
  };

  static defaultProps = {
    disabled: false,
    prefix: 'zent'
  };

  render() {
    const { disabled, prefix } = this.props;

    return (
      <div className={`${prefix}-design-editor-item`}>
        {disabled && <div className={`${prefix}-design__disabled-mask`} />}
        {this.props.children}
      </div>
    );
  }

  getBoundingBox() {
    const node = findDOMNode(this);
    return node && node.getBoundingClientRect();
  }
}
