import * as React from 'react';
import { Component } from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import noop from 'lodash-es/noop';
import isFunction from 'lodash-es/isFunction';

import Popover, { PositionFunction } from '../popover';
import Button from '../button';
import isPromise from '../utils/isPromise';
import { exposePopover } from '../popover/withPopover';
import { I18nReceiver as Receiver } from '../i18n';

import NoneTrigger from './NoneTrigger';
import getPosition from './position';

const { Trigger, withPopover } = Popover;
const stateMap = {
  onConfirm: 'confirmPending',
  onCancel: 'cancelPending',
};

export type PopPositions =
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'auto-bottom-center'
  | 'auto-bottom-left'
  | 'auto-bottom-right'
  | 'auto-top-center'
  | 'auto-top-left'
  | 'auto-top-right';

export interface IPopProps {
  content: React.ReactNode;
  trigger?: 'none' | 'click' | 'hover' | 'focus';
  position?: PopPositions | PositionFunction;
  centerArrow?: boolean;
  header?: React.ReactNode;
  block?: boolean;
  onShow?: () => void;
  onClose?: () => void;
  onBeforeShow?: (callback?: () => void, escape?: () => void) => void;
  onBeforeClose?: (callback?: () => void, escape?: () => void) => void;
  onConfirm?: ((close: () => void) => void) | (() => Promise<any>);
  onCancel?: ((close: () => void) => void) | (() => Promise<any>);
  confirmText?: string;
  cancelText?: string;
  type?: 'primary' | 'default' | 'danger' | 'success';
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  onPositionUpdated?: () => void;
  onPositionReady?: () => void;
  className?: string;
  wrapperClassName?: string;
  containerSelector?: string;
  prefix?: string;
  isOutside?: (
    target: HTMLElement,
    node: { contentNode: HTMLElement; triggerNode: HTMLElement }
  ) => boolean;

  // trigger: click
  closeOnClickOutside?: boolean;

  // trigger: hover
  quirk?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}

class PopAction extends Component<any> {
  // 支持异步的回调函数
  // onConfirm/onCancel异步等待的时候要禁用用户关闭
  handleClick(callbackName) {
    const callback = this.props[callbackName];
    const { popover } = this.props;
    if (!isFunction(callback)) {
      return popover.close();
    }

    const { changePending } = this.props;
    const stateKey = stateMap[callbackName];
    const startClose = () => {
      changePending(stateKey, true);
    };
    const finishClose = () => {
      changePending(stateKey, false, popover.close);
    };

    if (callback.length >= 1) {
      startClose();
      return callback(finishClose);
    }

    const maybePromise = callback();
    if (isPromise(maybePromise)) {
      startClose();
      maybePromise
        .then(finishClose)
        .catch(() => changePending(stateKey, false));
    } else {
      popover.close();
    }
  }

  handleConfirm = () => {
    this.handleClick('onConfirm');
  };

  handleCancel = () => {
    this.handleClick('onCancel');
  };

  render() {
    const {
      prefix,
      type,
      onConfirm,
      onCancel,
      confirmText,
      cancelText,
      confirmPending,
      cancelPending,
    } = this.props;

    if (!onConfirm && !onCancel) {
      return null;
    }

    return (
      <div className={`${prefix}-pop-buttons`}>
        <Receiver componentName="Pop">
          {i18n => (
            <Button
              loading={cancelPending}
              disabled={confirmPending}
              size="small"
              onClick={this.handleCancel}
            >
              {cancelText || i18n.cancel}
            </Button>
          )}
        </Receiver>
        <Receiver componentName="Pop">
          {i18n => (
            <Button
              loading={confirmPending}
              disabled={cancelPending}
              size="small"
              type={type}
              onClick={this.handleConfirm}
            >
              {confirmText || i18n.confirm}
            </Button>
          )}
        </Receiver>
      </div>
    );
  }
}

const BoundPopAction = withPopover(PopAction) as React.ComponentType<any>;

export class Pop extends Component<IPopProps> {
  static propTypes = {
    trigger: PropTypes.oneOf(['click', 'hover', 'focus', 'none']),
    position: PropTypes.oneOfType([
      PropTypes.oneOf([
        'left-top',
        'left-center',
        'left-bottom',
        'right-top',
        'right-center',
        'right-bottom',
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
        'auto-bottom-center',
        'auto-bottom-left',
        'auto-bottom-right',
        'auto-top-center',
        'auto-top-left',
        'auto-top-right',
      ]),
      PropTypes.func,
    ]),

    // 是否按小箭头居中对齐trigger来定位
    centerArrow: PropTypes.bool,

    // trigger是否块级显示
    block: PropTypes.bool,

    content: PropTypes.node,
    header: PropTypes.node,

    // confirm形式相关
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    type: PropTypes.oneOf(['primary', 'default', 'danger', 'success']),

    // 打开之后的回调函数
    onShow: PropTypes.func,

    // 关闭之后的回调函数
    onClose: PropTypes.func,

    // 打开／关闭前的回调函数，只有用户触发的操作才会调用；通过外部改变`visible`不会触发
    onBeforeShow: PropTypes.func,
    onBeforeClose: PropTypes.func,

    visible: PropTypes.bool,
    onVisibleChange: PropTypes.func,

    // 只有trigger为hover时才有效
    mouseLeaveDelay: PropTypes.number,
    mouseEnterDelay: PropTypes.number,
    quirk: PropTypes.bool,

    // 只有trigger为click时才有效
    closeOnClickOutside: PropTypes.bool,

    isOutside: PropTypes.func,

    // 在 popover-content 进入屏幕内时触发, 生命周期内仅触发一次
    onPositionReady: PropTypes.func,

    // 在 popover-content 新位置计算完成时触发
    onPositionUpdated: PropTypes.func,

    // defaults to body
    containerSelector: PropTypes.string,

    prefix: PropTypes.string,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
  };

  static defaultProps = {
    trigger: 'none',
    position: 'top-center',
    centerArrow: false,
    block: false,
    confirmText: '',
    cancelText: '',
    type: 'primary',
    closeOnClickOutside: true,
    mouseLeaveDelay: 200,
    mouseEnterDelay: 200,
    onPositionUpdated: noop,
    onPositionReady: noop,
    className: '',
    wrapperClassName: '',
    containerSelector: 'body',
    prefix: 'zent',
    quirk: true,
  };

  static withPop = exposePopover('pop');

  popover: Popover;
  isUnmounted = false;

  state = {
    confirmPending: false,
    cancelPending: false,
  };

  changePending = (key, pending, callback) => {
    if (this.isUnmounted) {
      return;
    }

    this.setState(
      {
        [key]: pending,
      },
      callback
    );
  };

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
          <BoundPopAction
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
    const {
      trigger,
      closeOnClickOutside,
      isOutside,
      mouseLeaveDelay,
      mouseEnterDelay,
      children,
      quirk,
    } = this.props;

    if (trigger === 'click') {
      return (
        <Trigger.Click autoClose={closeOnClickOutside} isOutside={isOutside}>
          {children}
        </Trigger.Click>
      );
    }

    if (trigger === 'hover') {
      return (
        <Trigger.Hover
          showDelay={mouseEnterDelay}
          hideDelay={mouseLeaveDelay}
          isOutside={isOutside}
          quirk={quirk}
        >
          {children}
        </Trigger.Hover>
      );
    }

    if (trigger === 'focus') {
      return <Trigger.Focus>{children}</Trigger.Focus>;
    }

    if (trigger === 'none') {
      return (
        <NoneTrigger>
          {children}
        </NoneTrigger>
      );
    }

    return null;
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    const {
      className,
      wrapperClassName,
      trigger,
      visible,
      prefix,
      block,
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
        visible={closePending ? true : visible}
        onVisibleChange={closePending ? noop : onVisibleChange}
        prefix={prefix}
        wrapperClassName={cx(`${prefix}-pop-wrapper`, wrapperClassName)}
        className={cls}
        cushion={10}
        position={getPosition(position, centerArrow)}
        display={block ? 'block' : 'inline-block'}
        onShow={onShow}
        onClose={onClose}
        onBeforeClose={onBeforeClose}
        onBeforeShow={onBeforeShow}
        onPositionUpdated={onPositionUpdated}
        onPositionReady={onPositionReady}
        containerSelector={containerSelector}
        ref={this.onPopoverRefChange}
      >
        {this.renderTrigger()}
        {this.renderContent()}
      </Popover>
    );
  }

  onPopoverRefChange = popoverInstance => {
    this.popover = popoverInstance;
  };

  adjustPosition() {
    if (this.popover) {
      this.popover.adjustPosition();
    }
  }

  getWrappedPopover() {
    return this.popover;
  }
}

export default Pop;
