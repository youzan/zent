import * as React from 'react';
import isFunction from 'lodash-es/isFunction';
import { Component, Children } from 'react';
import DOMRef from '../../utils/component/DOMRef';

export interface IPopoverTriggerProps {
  getTriggerNode?: () => HTMLElement;
  getContentNode?: () => HTMLElement;
  open?: () => void;
  close?: () => void;
  contentVisible?: boolean;
  onTriggerRefChange?: (
    instance: React.ReactInstance,
    getNodeForTriggerRefChange: (el: HTMLElement) => HTMLElement
  ) => void;
  getNodeForTriggerRefChange?: (el: HTMLElement) => HTMLElement;
  children: React.ReactNode;
  isOutside?: (
    el: Element,
    options: {
      contentNode: HTMLElement;
      triggerNode: HTMLElement;
    }
  ) => void;
  isOutsideStacked?: (target: Element) => boolean;
}

export class PopoverTrigger<
  T extends IPopoverTriggerProps = IPopoverTriggerProps
> extends Component<T> {
  constructor(props) {
    super(props);

    props.injectIsOutsideSelf(this.isOutsideSelf);
  }

  // 注意：
  // 在Trigger里判断一个节点在外面请用this.props.isOutsideStacked
  //
  // 这个函数之所以放在这里是为了兼容老的API，因为 isOutside 原来是放在Trigger上的，其实放在 Popover 上更好。
  isOutsideSelf = target => {
    const { isOutside, getContentNode, getTriggerNode } = this.props;
    const box = getContentNode();
    const anchor = getTriggerNode();
    if (isOutside) {
      return isOutside(target, {
        contentNode: box,
        triggerNode: anchor,
      });
    }

    if (anchor && anchor.contains(target)) {
      return false;
    }

    if (box && box.contains(target)) {
      return false;
    }

    return true;
  };

  // Override this function to add custom event handlers
  getTriggerProps(child?: JSX.Element) {
    return {};
  }

  // helper to trigger event on child
  triggerEvent(element, eventName, event) {
    const handler = element.props[eventName];
    if (handler) handler(event);
  }

  validateChildren() {
    const { children } = this.props;
    const count = Children.count(children);

    if (count === 0) {
      throw new Error('Popover trigger requires a child');
    }

    const childrenType = typeof children;
    if (
      (count === 1 && childrenType === 'string') ||
      childrenType === 'number'
    ) {
      return <span>{children}</span>;
    }

    if (count > 1) {
      throw new Error(
        `Popover trigger requires only one child, but found ${count}`
      );
    }

    const child = Children.only<any>(this.props.children);
    if (child.ref && !isFunction(child.ref)) {
      throw new Error('String ref is not allowed on Popover trigger');
    }

    return child;
  }

  onRefChange = (instance: DOMRef) => {
    const { onTriggerRefChange, getNodeForTriggerRefChange } = this.props;

    onTriggerRefChange(instance, getNodeForTriggerRefChange);
  };

  render() {
    const child = this.validateChildren();

    return (
      <DOMRef ref={this.onRefChange}>
        {React.cloneElement(child, this.getTriggerProps(child))}
      </DOMRef>
    );
  }
}

export default PopoverTrigger;
