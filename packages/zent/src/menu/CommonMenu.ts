import * as React from 'react';
import { PureComponent } from 'react';
import { getKeyFromChildrenIndex } from './utils';

export default abstract class CommonMenu<T, S> extends PureComponent<T, S> {
  abstract handleClick(e: React.MouseEvent, index: unknown): void;

  renderCommonMenuItem(component, index, subPrefix, extraProps?: any) {
    const newChildProps = {
      specKey: getKeyFromChildrenIndex(component, index, subPrefix),
      onClick: this.handleClick,
      ...extraProps,
    };

    return React.cloneElement(component, newChildProps);
  }
}
