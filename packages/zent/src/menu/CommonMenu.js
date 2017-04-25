import React, { Component } from 'react';
import { getKeyFromChildrenIndex } from './utils';

export default class CommonMenu extends Component {
  renderCommonMenuItem(c, i, subPrefix, extraProps) {
    const newChildProps = {
      index: getKeyFromChildrenIndex(c, i, subPrefix),
      onClick: this.handleClick,
      ...extraProps
    };

    return React.cloneElement(c, newChildProps);
  }
}
