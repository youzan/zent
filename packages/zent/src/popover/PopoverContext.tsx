import { createContext } from 'react';
import Popover from './Popover';
import { findDOMNode } from 'react-dom';
import { IPositionFunction } from './position-function';

export interface IPopoverContext {
  popover: Popover;
  visible: boolean;
  containerSelector: string;
  placement: IPositionFunction;
  cushion: number;
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
