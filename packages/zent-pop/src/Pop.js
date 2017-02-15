import React, { Component, PropTypes } from 'react';
import Popover from 'zent-popover';
import Button from 'zent-button';
import cx from 'zent-utils/classnames';

import NoneTrigger from './NoneTrigger';

const { Trigger, Position, withPopover } = Popover;

function capitalize(str) {
  if (!str) return str;

  return `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;
}

class PopAction extends Component {
  handleClick(callbackName) {
    const { popover, trigger } = this.props;
    popover.close();

    const callback = this.props[callbackName];
    trigger !== 'none' && callback && callback();
  }

  handleConfirm = () => {
    this.handleClick('onConfirm');
  };

  handleCancel = () => {
    this.handleClick('onCancel');
  };

  render() {
    const { prefix, type, onConfirm, onCancel, confirmText, cancelText } = this.props;

    if (!onConfirm && !onCancel) {
      return null;
    }

    return (
      <div className={`${prefix}-pop-buttons`}>
        <Button size="small" type={type} onClick={this.handleConfirm}>{confirmText}</Button>
        <Button size="small" onClick={this.handleCancel}>{cancelText}</Button>
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

    // 这两个只有当trigger为none时才生效
    visible: PropTypes.bool,

    // 只有trigger为hover时才有效
    mouseLeaveDelay: PropTypes.number,
    mouseEnterDelay: PropTypes.number,

    // 只有trigger为click时才有效
    closeOnClickOutside: PropTypes.bool,

    prefix: PropTypes.string,
    className: PropTypes.string
  };

  static defaultProps = {
    trigger: 'none',
    position: 'top-center',
    block: false,
    confirmText: '确定',
    cancelText: '取消',
    type: 'primary',
    visible: false,
    closeOnClickOutside: true,
    mouseLeaveDelay: 200,
    mouseEnterDelay: 200,
    className: '',
    prefix: 'zent',
  };

  getPosition() {
    const { position } = this.props;
    const positionName = position.split('-').map(s => capitalize(s)).join('');
    return Position[positionName] || Position.TopCenter;
  }

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
    const { trigger, visible, onVisibleChange, closeOnClickOutside, mouseLeaveDelay, mouseEnterDelay, children } = this.props;

    if (trigger === 'click') {
      return <Trigger.Click autoClose={closeOnClickOutside}>{children}</Trigger.Click>;
    }

    if (trigger === 'hover') {
      return <Trigger.Hover showDelay={mouseEnterDelay} hideDelay={mouseLeaveDelay}>{children}</Trigger.Hover>;
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
    const { className, prefix, block } = this.props;

    return (
      <Popover wrapperClassName={cx(`${prefix}-pop-wrapper`, `${className}-wrapper`)} className={cx(`${prefix}-pop`, className)} cushion={10} position={this.getPosition()} display={block ? 'block' : 'inline-block'}>
        {this.renderTrigger()}
        {this.renderContent()}
      </Popover>
    );
  }
}
