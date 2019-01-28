import { createContext } from 'react';
import Popover from './Popover';

export interface IZentPopover {
  close(): void;
  open(): void;
  getContentNode(): Element;
  getTriggerNode(): HTMLElement;

  registerDescendant(popover: Popover): void;
  unregisterDescendant(popover: Popover): void;
}

export interface IPopoverContext {
  _zentPopover?: IZentPopover;
}

export default createContext<IPopoverContext>({});
