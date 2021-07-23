import { createElement, forwardRef, useContext } from 'react';
import { isForwardRef } from 'react-is';

import PopoverContext from './Context';
import Popover from './Popover';

function isClassComponent(component: any) {
  return !!component?.prototype?.isReactComponent;
}

export function usePopover() {
  const ctx = useContext(PopoverContext);
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
    const comp = forwardRef<any, Props>((props, ref) => {
      const popover = usePopover();
      const childProps: any = {
        [propName]: popover,
      };
      if (shouldPassRef) {
        childProps.ref = ref;
      }
      return createElement(Base, {
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
