import Popover from '../popover';
import { IPopoverTriggerProps } from '../popover/trigger/Trigger';

export interface INoneTriggerProps extends IPopoverTriggerProps {}

export default class NoneTrigger extends Popover.Trigger.Base<
  INoneTriggerProps
> {}
