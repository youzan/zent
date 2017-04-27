import React, { Component } from 'react';
import omit from 'lodash/omit';

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
      const { _zentPopover: popover } = this.context || {};
      const context = {
        popover: omit(popover, ['registerDescendant', 'unregisterDescendant'])
      };

      return <Base {...this.props} {...context} />;
    }
  };
}
