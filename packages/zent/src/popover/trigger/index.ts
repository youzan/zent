export * from './ClickTrigger';
export * from './HoverTrigger';
export * from './FocusTrigger';
export * from './Trigger';

import ClickTrigger from './ClickTrigger';
import HoverTrigger from './HoverTrigger';
import FocusTrigger from './FocusTrigger';
import Trigger from './Trigger';

export default {
  Click: ClickTrigger,
  Hover: HoverTrigger,
  Focus: FocusTrigger,
  Base: Trigger,
};
