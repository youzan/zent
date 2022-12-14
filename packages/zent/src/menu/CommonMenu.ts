import { cloneElement, PropsWithChildren, PureComponent } from 'react';
import { getKeyFromChildrenIndex } from './utils';

export default abstract class CommonMenu<T, S> extends PureComponent<
  PropsWithChildren<T>,
  S
> {
  abstract handleClick(e: React.MouseEvent, index: unknown): void;

  renderCommonMenuItem(component, index, subPrefix, extraProps?: any) {
    const newChildProps = {
      specKey: getKeyFromChildrenIndex(component, index, subPrefix),
      onClick: this.handleClick,
      ...extraProps,
    };

    return cloneElement(component, newChildProps);
  }
}
