import * as React from 'react';
import { Omit } from 'utility-types';
import { isForwardRef } from 'react-is';

import PopoverContext from './PopoverContext';
import Popover from './Popover';

function isClassComponent(component: Function) {
  return !!component.prototype.isReactComponent;
}

export function usePopover() {
  const ctx = React.useContext(PopoverContext);
  if (ctx === null) {
    throw new Error('usePopover must be used as child of Popover');
  }
  return ctx.popover;
}

/**
 * A high order component to expose imperative APIs for popover.
 *
 * Adds a popover prop to component.
 */
export function exposePopover<N extends string>(propName: N) {
  return function expose<Props extends Record<N, Popover> = Record<N, Popover>>(
    Base: React.ComponentType<Props>
  ) {
    const componentName =
      Base.displayName || Base.constructor.name || 'Component';
    const shouldPassRef = isClassComponent(Base) || isForwardRef(Base);
    const comp = React.forwardRef<any, Props>((props, ref) => {
      const popover = usePopover();
      const childProps: any = {
        [propName]: popover,
      };
      if (shouldPassRef) {
        childProps.ref = ref;
      }
      return React.createElement(Base, {
        ...props,
        ...childProps,
      });
    });
    comp.displayName = `withPopover(${componentName})`;
    return comp;
  };
}

export default exposePopover('popover') as <T extends { popover: Popover }>(
  Comp: React.ComponentType<T>
) => React.ComponentType<Omit<T, 'popover'>>;
