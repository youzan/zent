import Popover from '../popover';
import { IPopoverTriggerProps } from '../popover/trigger/Trigger';

export type INoneTriggerProps = IPopoverTriggerProps<any>;

export default class NoneTrigger extends Popover.Trigger
  .Base<INoneTriggerProps> {}
