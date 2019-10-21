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
  trigger?: 'none' | 'click' | 'hover' | 'focus';
  position: PopPositions | IPositionFunction;
  cushion?: number;
  centerArrow?: boolean;
  header?: React.ReactNode;
  onShow?: () => void;
  onClose?: () => void;
  onBeforeShow?: IPopoverBeforeHook;
  onBeforeClose?: IPopoverBeforeHook;
  type: 'primary' | 'default' | 'danger' | 'success';
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  onPositionUpdated?: () => void;
  onPositionReady?: () => void;
  className?: string;
  containerSelector?: string;
  onConfirm?: IPopActionCallback;
  onCancel?: IPopActionCallback;
  confirmText?: string;
  cancelText?: string;
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
    cushion: 10,
    type: 'primary',
    mouseLeaveDelay: 200,
    mouseEnterDelay: 200,
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

  // renderContent() {
  //   const {
  //     content,
  //     header,
  //     onConfirm,
  //     onCancel,
  //     confirmText,
  //     cancelText,
  //     type,
  //   } = this.props;
  //   const { confirmPending, cancelPending } = this.state;
  //   const hasHeader = !!header;

  //   return (
  //     <Popover.Content>
  //       {hasHeader && <div className="zent-pop-header">{header}</div>}
  //       <div className="zent-pop-inner">
  //         {content}

  //       </div>
  //       <i className="zent-pop-arrow" />
  //     </Popover.Content>
  //   );
  // }

  renderTrigger() {
    const { props } = this;
    switch (props.trigger) {
      case 'click':
        return (
          <Trigger.Click closeOnClickOutside={props.closeOnClickOutside}>
            {props.children}
          </Trigger.Click>
        );
      case 'hover':
        return (
          <Trigger.Hover
            showDelay={props.mouseEnterDelay}
            hideDelay={props.mouseLeaveDelay}
          >
            {props.children}
          </Trigger.Hover>
        );
      case 'focus':
        return <Trigger.Focus>{props.children}</Trigger.Focus>;
      case 'none':
        return <Popover.Anchor>{props.children}</Popover.Anchor>;
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
      onShow,
      onClose,
      position,
      cushion,
      header,
      content,
      centerArrow,
      onBeforeClose,
      onBeforeShow,
      onPositionUpdated,
      onPositionReady,
      containerSelector,
      onCancel,
      onConfirm,
      confirmText,
      cancelText,
      type,
    } = this.props;

    const hasHeader = header != null;

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
        className={cx('zent-pop', className, {
          'zent-pop--has-header': hasHeader,
          'zent-pop--no-header': !hasHeader,
        })}
        cushion={cushion}
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
        <Popover.Content>
          {hasHeader && <div className="zent-pop-header">{header}</div>}
          <div className="zent-pop-inner">{content}</div>
          {(onCancel || onConfirm) && (
            <Action
              onConfirm={onConfirm}
              onCancel={onCancel}
              confirmText={confirmText}
              cancelText={cancelText}
              confirmPending={confirmPending}
              cancelPending={cancelPending}
              changePending={this.changePending}
              type={type}
            />
          )}
          <div className="zent-pop-arrow" />
        </Popover.Content>
      </Popover>
    );
  }
}

export default Pop;
