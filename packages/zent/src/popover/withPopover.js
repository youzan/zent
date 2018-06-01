import React, { PureComponent } from 'react';
import omit from 'lodash/omit';

import { PopoverContextType } from './Popover';

/**
 * A high order component to expose imperative APIs for popover.
 *
 * Adds a popover prop to component.
 */
export const exposePopover = propName => Base => {
  return class ExposePopover extends PureComponent {
    static contextTypes = PopoverContextType;

    render() {
      const { _zentPopover: popover } = this.context || {};
      const context = {
        [propName]: omit(popover, [
          'registerDescendant',
          'unregisterDescendant',
        ]),
      };

      return <Base {...this.props} {...context} />;
    }
  };
};

export default exposePopover('popover');
