import Popover, { PopoverContextType } from './Popover';
import withPopover from './withPopover';
import Trigger from './trigger';
import Content from './Content';
import Position from './placement';

Popover.Content = Content;
Popover.Trigger = Trigger;
Popover.Position = Position;
Popover.popoverShape = PopoverContextType;
Popover.withPopover = withPopover;

export default Popover;
