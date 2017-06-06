import React, { Component, PureComponent } from 'react';
import { getKeyFromChildrenIndex } from './utils';

export default class CommonMenu extends (PureComponent || Component) {
  renderCommonMenuItem(c, i, subPrefix, extraProps) {
    const newChildProps = {
      index: getKeyFromChildrenIndex(c, i, subPrefix),
      onClick: this.handleClick,
      ...extraProps
    };

    return React.cloneElement(c, newChildProps);
  }
}
