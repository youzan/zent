import * as React from 'react';
import { Component } from 'react';
import { Omit } from 'utility-types';

import PopoverContext, { IPopoverContext } from './PopoverContext';
import Popover from './Popover';

/**
 * A high order component to expose imperative APIs for popover.
 *
 * Adds a popover prop to component.
 */
export function exposePopover<N extends string>(propName: N) {
  return function expose<T extends IPopoverContext>(
    Base: React.ComponentType<T>
  ) {
    return class ExposePopover extends Component<T> {
      static contextType = PopoverContext;
      context!: IPopoverContext;

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

export default exposePopover('popover') as <T extends { popover: Popover }>(
  Comp: React.ComponentType<T>
) => React.ComponentType<Omit<T, 'popover'>>;
