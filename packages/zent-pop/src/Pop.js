import React, { Component, PropTypes } from 'react';
import Popover from 'zent-popover';
import Button from 'zent-button';
import cx from 'zent-utils/classnames';
import noop from 'zent-utils/lodash/noop';
import isFunction from 'zent-utils/lodash/isFunction';
import isPromise from 'zent-utils/isPromise';

import NoneTrigger from './NoneTrigger';
import getPosition from './position';

const { Trigger, withPopover } = Popover;
const stateMap = {
  onConfirm: 'confirmPending',
  onCancel: 'cancelPending'
};

class PopAction extends Component {
  state = {
    confirmPending: false,
    cancelPending: false
  };

  // 支持异步的回调函数
  handleClick(callbackName) {
    const callback = this.props[callbackName];
    const { popover } = this.props;
    if (!isFunction(callback)) {
      return popover.close();
    }

    const stateKey = stateMap[callbackName];
    const startClose = () => {
      this.setState({
        [stateKey]: true
      });
    };
    const finishClose = () => {
      this.setState({
        [stateKey]: false
      });
      popover.close();
    };

    if (callback.length >= 1) {
      startClose();
      return callback(finishClose);
    }

    const maybePromise = callback();
    if (isPromise(maybePromise)) {
      startClose();
      maybePromise.then(finishClose);
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
    const { prefix, type, onConfirm, onCancel, confirmText, cancelText } = this.props;
    const { confirmPending, cancelPending } = this.state;

    if (!onConfirm && !onCancel) {
      return null;
    }

    return (
      <div className={`${prefix}-pop-buttons`}>
        <Button loading={confirmPending} size="small" type={type} onClick={this.handleConfirm}>{confirmText}</Button>
        <Button loading={cancelPending} size="small" onClick={this.handleCancel}>{cancelText}</Button>
      </div>
    );
  }
}

const BoundPopAction = withPopover(PopAction);

export default class Pop extends Component {
  static propTypes = {
    trigger: PropTypes.oneOf([
      'click', 'hover', 'focus', 'none'
    ]),
    position: PropTypes.oneOf([
      'left-top', 'left-center', 'left-bottom',
      'right-top', 'right-center', 'right-bottom',
      'top-left', 'top-center', 'top-right',
      'bottom-left', 'bottom-center', 'bottom-right'
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
    type: PropTypes.oneOf([
      'primary', 'default', 'danger', 'success'
    ]),

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

    // 只有trigger为click时才有效
    closeOnClickOutside: PropTypes.bool,
    isClickOutside: PropTypes.func,

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
    className: '',
    wrapperClassName: '',
    prefix: 'zent',
  };

  renderContent() {
    const { prefix, content, header, onConfirm, onCancel, confirmText, cancelText, type } = this.props;

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
            type={type}
          />
        </div>
        <i className={`${prefix}-pop-arrow`} />
      </Popover.Content>
    );
  }

  renderTrigger() {
    const { trigger, visible, onVisibleChange, closeOnClickOutside, isOutside, mouseLeaveDelay, mouseEnterDelay, children } = this.props;

    if (trigger === 'click') {
      return <Trigger.Click autoClose={closeOnClickOutside} isOutside={isOutside}>{children}</Trigger.Click>;
    }

    if (trigger === 'hover') {
      return <Trigger.Hover showDelay={mouseEnterDelay} hideDelay={mouseLeaveDelay} isOutside={isOutside}>{children}</Trigger.Hover>;
    }

    if (trigger === 'focus') {
      return <Trigger.Focus>{children}</Trigger.Focus>;
    }

    if (trigger === 'none') {
      return <NoneTrigger visible={visible} onVisibleChange={onVisibleChange}>{children}</NoneTrigger>;
    }

    return null;
  }

  render() {
    const {
      className, wrapperClassName, trigger, visible,
      prefix, block, onShow, onClose, position, centerArrow,
      onBeforeClose, onBeforeShow
    } = this.props;
    let { onVisibleChange } = this.props;
    if (trigger === 'none') {
      onVisibleChange = onVisibleChange || noop;
    }

    return (
      <Popover
        visible={visible}
        onVisibleChange={onVisibleChange}
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
      >
        {this.renderTrigger()}
        {this.renderContent()}
      </Popover>
    );
  }
}
