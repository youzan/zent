import * as React from 'react';
import { Component } from 'react';
import cx from 'classnames';
import noop from 'lodash-es/noop';

import Popover, {
  IPositionFunction,
  IPopoverClickTriggerChildProps,
  IPopoverClickTriggerProps,
  IPopoverTriggerProps,
  IPopoverHoverTriggerChildProps,
  IPopoverHoverTriggerProps,
  IPopoverFocusTriggerChildProps,
  IPopoverFocusTriggerProps,
  IPopoverBeforeHook,
} from '../popover';
import { exposePopover } from '../popover/withPopover';

import NoneTrigger from './NoneTrigger';
import getPosition, { PopPositions } from './position';
import Action, { IPopActionCallback } from './Action';

const { Trigger } = Popover;

export interface IPopNoneTriggerProps<Props extends object>
  extends IPopoverTriggerProps<Props>,
    IPopCommonProps {
  trigger: 'none';
}

export interface IPopClickTriggerProps<
  Props extends IPopoverClickTriggerChildProps
> extends IPopoverClickTriggerProps<Props>, IPopCommonProps {
  trigger: 'click';
  closeOnClickOutside?: boolean;
}

export interface IPopHoverTriggerProps<
  Props extends IPopoverHoverTriggerChildProps
> extends IPopoverHoverTriggerProps<Props>, IPopCommonProps {
  trigger: 'hover';
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}

export interface IPopFocusTriggerProps<
  Props extends IPopoverFocusTriggerChildProps
> extends IPopoverFocusTriggerProps<Props>, IPopCommonProps {
  trigger: 'focus';
}

export interface IPopCommonProps {
  content: React.ReactNode;
  position: PopPositions | IPositionFunction;
  centerArrow?: boolean;
  header?: React.ReactNode;
  onShow?: () => void;
  onClose?: () => void;
  onBeforeShow?: IPopoverBeforeHook;
  onBeforeClose?: IPopoverBeforeHook;
  onConfirm?: IPopActionCallback;
  onCancel?: IPopActionCallback;
  confirmText?: string;
  cancelText?: string;
  type: 'primary' | 'default' | 'danger' | 'success';
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  onPositionUpdated?: () => void;
  onPositionReady?: () => void;
  className?: string;
  containerSelector?: string;
  prefix: string;
}

export type IPopProps =
  | IPopNoneTriggerProps<any>
  | IPopClickTriggerProps<any>
  | IPopHoverTriggerProps<any>
  | IPopFocusTriggerProps<any>;

export interface IPopState {
  confirmPending: boolean;
  cancelPending: boolean;
}

export class Pop extends Component<IPopProps, IPopState> {
  static defaultProps = {
    trigger: 'none',
    position: 'top-center',
    type: 'primary',
    closeOnClickOutside: true,
    mouseLeaveDelay: 200,
    mouseEnterDelay: 200,
    onPositionUpdated: noop,
    onPositionReady: noop,
    containerSelector: 'body',
  };

  static withPop = exposePopover('pop');

  private popoverRef = React.createRef<Popover>();
  private isUnmounted = false;

  state = {
    confirmPending: false,
    cancelPending: false,
  };

  changePending = (
    key: keyof IPopState,
    pending: boolean,
    callback?: () => void
  ) => {
    if (this.isUnmounted) {
      return;
    }

    this.setState(
      {
        [key]: pending,
      } as any,
      callback
    );
  };

  adjustPosition() {
    const popover = this.popoverRef.current;
    if (popover) {
      popover.adjustPosition();
    }
  }

  getWrappedPopover() {
    return this.popoverRef.current;
  }

  renderContent() {
    const {
      prefix,
      content,
      header,
      onConfirm,
      onCancel,
      confirmText,
      cancelText,
      type,
    } = this.props;
    const { confirmPending, cancelPending } = this.state;
    const hasHeader = !!header;

    return (
      <Popover.Content>
        {hasHeader && <div className={`${prefix}-pop-header`}>{header}</div>}
        <div className={`${prefix}-pop-inner`}>
          {content}
          <Action
            prefix={prefix}
            onConfirm={onConfirm}
            onCancel={onCancel}
            confirmText={confirmText}
            cancelText={cancelText}
            confirmPending={confirmPending}
            cancelPending={cancelPending}
            changePending={this.changePending}
            type={type}
          />
        </div>
        <i className={`${prefix}-pop-arrow`} />
      </Popover.Content>
    );
  }

  renderTrigger() {
    const { props } = this;
    switch (props.trigger) {
      case 'click':
        return (
          <Trigger.Click
            autoClose={props.closeOnClickOutside}
            isOutside={props.isOutside}
          >
            {props.children}
          </Trigger.Click>
        );
      case 'hover':
        return (
          <Trigger.Hover
            showDelay={props.mouseEnterDelay}
            hideDelay={props.mouseLeaveDelay}
            isOutside={props.isOutside}
          >
            {props.children}
          </Trigger.Hover>
        );
      case 'focus':
        return <Trigger.Focus>{props.children}</Trigger.Focus>;
      case 'none':
        return <NoneTrigger>{props.children}</NoneTrigger>;
      default:
        throw new Error('Pop trigger not assigned');
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    const {
      className,
      trigger,
      visible,
      prefix,
      onShow,
      onClose,
      position,
      header,
      centerArrow,
      onBeforeClose,
      onBeforeShow,
      onPositionUpdated,
      onPositionReady,
      containerSelector,
    } = this.props;

    const hasHeader = !!header;
    const cls = cx(`${prefix}-pop`, className, {
      [`${prefix}-pop--has-header`]: hasHeader,
      [`${prefix}-pop--no-header`]: !hasHeader,
    });

    let { onVisibleChange } = this.props;
    if (trigger === 'none') {
      onVisibleChange = onVisibleChange || noop;
    }

    const { confirmPending, cancelPending } = this.state;
    const closePending = confirmPending || cancelPending;

    return (
      <Popover
        ref={this.popoverRef}
        visible={closePending ? true : visible}
        onVisibleChange={closePending ? noop : onVisibleChange}
        className={cls}
        cushion={10}
        position={getPosition(position, centerArrow)}
        onShow={onShow}
        onClose={onClose}
        onBeforeClose={onBeforeClose}
        onBeforeShow={onBeforeShow}
        onPositionUpdated={onPositionUpdated}
        onPositionReady={onPositionReady}
        containerSelector={containerSelector}
      >
        {this.renderTrigger()}
        {this.renderContent()}
      </Popover>
    );
  }
}

export default Pop;
