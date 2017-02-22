import React, { Component } from 'react';

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
      return <Base {...this.props} {...this.context} />;
    }
  };
}
