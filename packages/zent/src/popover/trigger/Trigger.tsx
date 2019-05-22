import * as React from 'react';
import { Component, Children } from 'react';
import PopoverContext, { IPopoverContext } from '../PopoverContext';

export interface IIsOutsideProps {
  contentNode: Element;
  triggerNode: Element;
}

export interface IIsOutside {
  (e: MouseEvent, props: IIsOutsideProps): boolean;
}

export interface IPopoverTriggerProps<ChildProps> {
  children: React.ReactElement<ChildProps, any> | string | number;
}

export type IPopoverTriggerElement = React.ReactElement<
  IPopoverTriggerProps<any>,
  typeof PopoverTrigger
>;

export function isPopoverTrigger(
  trigger: React.ReactElement<any, any>
): trigger is IPopoverTriggerElement {
  return !!trigger.type.prototype.isPopoverTrigger;
}

export class PopoverTrigger<
  TriggerChildProps = {},
  T extends IPopoverTriggerProps<TriggerChildProps> = IPopoverTriggerProps<
    TriggerChildProps
  >
> extends Component<T> {
  static contextType = PopoverContext;
  context!: IPopoverContext;

  isPopoverTrigger!: true;

  protected getTriggerProps(
    _child: React.ReactElement<TriggerChildProps>
  ): Partial<TriggerChildProps> {
    return {};
  }

  render() {
    let child:
      | React.ReactElement<TriggerChildProps, any>
      | string
      | number = Children.only(this.props.children);
    if (!child) {
      throw new Error();
    }
    if (typeof child === 'number' || typeof child === 'string') {
      child = <span>{child}</span>;
    }
    return React.cloneElement(child, this.getTriggerProps(child));
  }
}

PopoverTrigger.prototype.isPopoverTrigger = true;

export default PopoverTrigger;
