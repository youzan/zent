import * as React from 'react';
import { Component, Children } from 'react';
import PopoverContext, { IPopoverContext } from '../Context';
import Anchor from '../Anchor';

export interface IPopoverTriggerProps<ChildProps> {
  children: React.ReactElement<ChildProps, any> | string | number;
}

/**
 * @deprecated
 */
export class PopoverTrigger<
  TriggerChildProps = {},
  T extends IPopoverTriggerProps<TriggerChildProps> = IPopoverTriggerProps<
    TriggerChildProps
  >
> extends Component<T> {
  static contextType = PopoverContext;
  context!: IPopoverContext;

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
      throw new Error('Popover Trigger requires a child');
    }
    if (typeof child === 'number' || typeof child === 'string') {
      child = <span>{child}</span>;
    }
    return (
      <Anchor>{React.cloneElement(child, this.getTriggerProps(child))}</Anchor>
    );
  }
}

export default PopoverTrigger;
