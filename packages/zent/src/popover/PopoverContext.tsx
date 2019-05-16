import { createContext, RefObject } from 'react';
import { findDOMNode } from 'react-dom';
import Popover from './Popover';
import { IPositionFunction } from './position-function';
import { IPortalImperativeHandlers } from '../portal';

export interface IPopoverContext {
  popover: Popover;
  visible: boolean;
  containerSelector: string;
  placement: IPositionFunction;
  cushion: number;
  portalRef: RefObject<IPortalImperativeHandlers>;
}

const context = createContext<IPopoverContext | null>(null);

context.displayName = 'ZentPopoverContext';

export function getAnchor(ctx: IPopoverContext) {
  return findDOMNode(ctx.popover.triggerRef.current);
}

export function getContext({
  context,
}: {
  context?: IPopoverContext | null;
}): IPopoverContext {
  if (!context) {
    throw new Error();
  }
  return context;
}

export default context;
