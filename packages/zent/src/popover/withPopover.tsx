import * as React from 'react';
import { Component } from 'react';

import PopoverContext, { IPopoverContext } from './PopoverContext';

/**
 * A high order component to expose imperative APIs for popover.
 *
 * Adds a popover prop to component.
 */
export const exposePopover = (propName: string) => (
  Base: React.ComponentType<any>
) => {
  return class ExposePopover extends Component {
    static contextType = PopoverContext;

    render() {
      const { _zentPopover: popover } = this.context || ({} as IPopoverContext);
      const { registerDescendant, unregisterDescendant, ...others } = popover;
      const context = {
        [propName]: others,
      };

      return <Base {...this.props} {...context} />;
    }
  };
};

export default exposePopover('popover');
