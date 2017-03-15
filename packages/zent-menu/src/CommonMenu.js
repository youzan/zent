import React, { Component } from 'react';
import { getKeyFromChildrenIndex } from './utils';

export default class CommonMenu extends Component {
  renderCommonMenuItem(c, i, subIndex, extraProps) {
    const newChildProps = {
      index: getKeyFromChildrenIndex(c, i),
      onClick: this.onClick,
      ...extraProps
    };

    return React.cloneElement(c, newChildProps);
  }
}
