import * as React from 'react';
import { Component } from 'react';
import { Assign } from 'utility-types';

import PopoverContext, { IPopoverContext } from './PopoverContext';
import Popover from './Popover';

/**
 * A high order component to expose imperative APIs for popover.
 *
 * Adds a popover prop to component.
 */
export function exposePopover<N extends string>(propName: N) {
  return function<T extends {}>(Base: React.ComponentType<T>) {
    return class ExposePopover extends Component<T> {
      render() {
        const { _zentPopover: popover } =
          this.context || ({} as IPopoverContext);
        const { registerDescendant, unregisterDescendant, ...others } = popover;
        const context = {
          [propName]: others,
        };

        return <Base {...this.props} {...context} />;
      }
    };
  };
}

export default exposePopover('popover') as <T extends {}>(
  Comp: React.ComponentType<T & { popover: Popover }>
) => React.ComponentType<T>;
