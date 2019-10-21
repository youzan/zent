import { createContext, RefObject, useContext } from 'react';
import { BehaviorSubject } from 'rxjs';
import { IPositionFunction } from './position-function';
import { IPortalImperativeHandlers } from '../portal';
import Popover from './Popover';

export interface IPopoverContentImperativeHandle {
  adjustPosition(): void;
}

export interface IPopoverContext {
  popover: Popover;
  visible: boolean;
  containerSelector: string;
  placement: IPositionFunction;
  cushion: number;
  portalRef: RefObject<IPortalImperativeHandlers>;
  className?: string;
  contentRef: RefObject<IPopoverContentImperativeHandle>;
  anchor$: BehaviorSubject<Element | null>;
  didMount(cb: () => () => void): void;
}

const context = createContext<IPopoverContext | null>(null);

context.displayName = 'ZentPopoverContext';

export function usePopoverContext(): IPopoverContext {
  const ctx = useContext(context);
  if (!ctx) {
    throw new Error();
  }
  return ctx;
}

export default context;
