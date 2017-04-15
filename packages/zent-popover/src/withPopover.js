import React, { Component } from 'react';
import omit from 'zent-utils/lodash/omit';

import { PopoverContextType } from './Popover';

/**
 * A high order component to expose imperative APIs for popover.
 *
 * Adds a popover prop to component.
 */
export default function withPopover(Base) {
  return class ExposePopover extends Component {
    static contextTypes = PopoverContextType;

    render() {
      const context = {
        popover: omit(this.context.popover, ['registerDescendant', 'unregisterDescendant'])
      };

      return <Base {...this.props} {...context} />;
    }
  };
}
