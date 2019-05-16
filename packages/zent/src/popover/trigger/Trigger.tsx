import * as React from 'react';
import { Component, Children } from 'react';
import PopoverContext, { IPopoverContext } from '../PopoverContext';

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

  protected triggerProps: Partial<TriggerChildProps> = {};

  // helper to trigger event on child
  // triggerEvent(element, eventName, event) {
  //   const handler = element.props[eventName];
  //   if (handler) handler(event);
  // }

  // validateChildren() {
  //   const { children } = this.props;
  //   const count = Children.count(children);

  //   if (count === 0) {
  //     throw new Error('Popover trigger requires a child');
  //   }

  //   const childrenType = typeof children;
  //   if (
  //     (count === 1 && childrenType === 'string') ||
  //     childrenType === 'number'
  //   ) {
  //     return <span>{children}</span>;
  //   }

  //   if (count > 1) {
  //     throw new Error(
  //       `Popover trigger requires only one child, but found ${count}`
  //     );
  //   }

  //   const child = Children.only(this.props.children);
  //   if (child.ref && !isFunction(child.ref)) {
  //     throw new Error('String ref is not allowed on Popover trigger');
  //   }

  //   return child;
  // }

  // onRefChange = instance => {
  //   const { onTriggerRefChange, getNodeForTriggerRefChange } = this.props;

  //   onTriggerRefChange(instance, getNodeForTriggerRefChange);

  //   const child = this.validateChildren();
  //   if (isFunction(child.ref)) {
  //     (child as any).ref(instance);
  //   }
  // };

  render() {
    const child:
      | React.ReactElement<TriggerChildProps, any>
      | string
      | number = Children.only(this.props.children);
    if (!child) {
      throw new Error();
    }
    if (typeof child === 'number' || typeof child === 'string') {
      return <span {...this.triggerProps}>{child}</span>;
    }
    return React.cloneElement(child, this.triggerProps);
  }
}

PopoverTrigger.prototype.isPopoverTrigger = true;

export default PopoverTrigger;
