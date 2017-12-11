import React, { Component, PureComponent } from 'react';
import Popover from 'popover';
import { exposePopover } from 'popover/withPopover';
import Button from 'button';
import cx from 'classnames';
import noop from 'lodash/noop';
import isFunction from 'lodash/isFunction';
import isPromise from 'utils/isPromise';
import PropTypes from 'prop-types';

import NoneTrigger from './NoneTrigger';
import getPosition from './position';

const { Trigger, withPopover } = Popover;
const stateMap = {
  onConfirm: 'confirmPending',
  onCancel: 'cancelPending'
};

class PopAction extends (PureComponent || Component) {
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
      cancelPending
    } = this.props;

    if (!onConfirm && !onCancel) {
      return null;
    }

    return (
      <div className={`${prefix}-pop-buttons`}>
        <Button
          loading={confirmPending}
          disabled={cancelPending}
          size="small"
          type={type}
          onClick={this.handleConfirm}
        >
          {confirmText}
        </Button>
        <Button
          loading={cancelPending}
          disabled={confirmPending}
          size="small"
          onClick={this.handleCancel}
        >
          {cancelText}
        </Button>
      </div>
    );
  }
}

const BoundPopAction = withPopover(PopAction);

class Pop extends (PureComponent || Component) {
  static propTypes = {
    trigger: PropTypes.oneOf(['click', 'hover', 'focus', 'none']),
    position: PropTypes.oneOf([
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
      'bottom-right'
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
    isClickOutside: PropTypes.func,

    onPositionUpdated: PropTypes.func,

    prefix: PropTypes.string,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string
  };

  static defaultProps = {
    trigger: 'none',
    position: 'top-center',
    centerArrow: false,
    block: false,
    confirmText: '确定',
    cancelText: '取消',
    type: 'primary',
    closeOnClickOutside: true,
    mouseLeaveDelay: 200,
    mouseEnterDelay: 200,
    onPositionUpdated: noop,
    className: '',
    wrapperClassName: '',
    prefix: 'zent',
    quirk: true
  };

  state = {
    confirmPending: false,
    cancelPending: false
  };

  changePending = (key, pending, callback) => {
    if (this.isUnmounted) {
      return;
    }

    this.setState(
      {
        [key]: pending
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
      type
    } = this.props;
    const { confirmPending, cancelPending } = this.state;

    return (
      <Popover.Content>
        {header && <div className={`${prefix}-pop-header`}>{header}</div>}
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
      visible,
      onVisibleChange,
      closeOnClickOutside,
      isOutside,
      mouseLeaveDelay,
      mouseEnterDelay,
      children,
      quirk
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
        <NoneTrigger visible={visible} onVisibleChange={onVisibleChange}>
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
      centerArrow,
      onBeforeClose,
      onBeforeShow,
      onPositionUpdated
    } = this.props;
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
        className={cx(`${prefix}-pop`, className)}
        cushion={10}
        position={getPosition(position, centerArrow)}
        display={block ? 'block' : 'inline-block'}
        onShow={onShow}
        onClose={onClose}
        onBeforeClose={onBeforeClose}
        onBeforeShow={onBeforeShow}
        onPositionUpdated={onPositionUpdated}
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

Pop.withPop = exposePopover('pop');

export default Pop;
