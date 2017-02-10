/**
 * 设计：
 *
 * Popover组件只是一个壳子，负责组装Trigger和Content。
 *
 * 弹层实际的打开／关闭都是Content完成的，而什么情况打开弹层是Trigger控制的。
 */

import React, { Component, PropTypes, Children } from 'react';
import ReactDOM from 'react-dom';
import cx from 'zent-utils/classnames';
import noop from 'lodash/noop';
import uniqueId from 'lodash/uniqueId';

import PopoverContent from './Content';
import PopoverTrigger from './trigger/Trigger';

function instanceOf(MaybeDerive, Base) {
  return MaybeDerive === Base || MaybeDerive.prototype instanceof Base;
}

export const PopoverContextType = {
  popover: PropTypes.shape({
    close: PropTypes.func.isRequired,
    open: PropTypes.func.isRequired,
    getContentNode: PropTypes.func.isRequired,
    getTriggerNode: PropTypes.func.isRequired
  })
};

export default class Popover extends Component {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,

    // container的display属性
    display: PropTypes.string,

    // position strategy
    position: PropTypes.func.isRequired,

    // 定位时的偏移量
    cushion: PropTypes.number,

    onBeforeClose: PropTypes.func,
    onBeforeShow: PropTypes.func,
    onClose: PropTypes.func,
    onShow: PropTypes.func,

    // defaults to body
    containerSelector: PropTypes.string,

    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    prefix: 'zent',
    className: '',
    display: 'block',
    onBeforeClose: noop,
    onBeforeShow: noop,
    onClose: noop,
    onShow: noop,
    cushion: 0,
    containerSelector: 'body'
  };

  static childContextTypes = PopoverContextType;

  getChildContext() {
    return {
      popover: {
        close: this.close,
        open: this.open,
        getContentNode: this.getPopoverNode,
        getTriggerNode: this.getTriggerNode
      }
    };
  }

  state = {
    visible: false,
  };

  constructor(props) {
    super(props);

    // id用来唯一标识popover实例
    this.id = uniqueId(`${props.prefix}-popover-internal-id-`);
  }

  getPopoverNode = () => {
    return document.querySelector(`.${this.id}`);
  }

  onTriggerRefChange = (triggerInstance) => {
    this.triggerNode = ReactDOM.findDOMNode(triggerInstance);
  };

  getTriggerNode = () => {
    return this.triggerNode;
  };

  open = () => {
    this.props.onBeforeShow();

    this.setState({
      visible: true
    }, this.props.onShow);
  };

  close = () => {
    this.props.onBeforeClose();

    this.setState({
      visible: false
    }, this.props.onClose);
  }

  validateChildren() {
    const { children } = this.props;
    const childArray = Children.toArray(children);

    if (childArray.length !== 2) {
      throw new Error('There must be one and only one trigger and content in Popover');
    }

    const { trigger, content } = childArray.reduce((state, c) => {
      const type = c.type;
      if (instanceOf(type, PopoverTrigger)) {
        state.trigger = c;
      } else if (instanceOf(type, PopoverContent)) {
        state.content = c;
      }

      return state;
    }, { trigger: null, content: null });

    if (!trigger) {
      throw new Error('Missing trigger in Popover');
    }
    if (!content) {
      throw new Error('Missing content in Popover');
    }

    return { trigger, content };
  }

  render() {
    const { trigger, content } = this.validateChildren();
    const { display, prefix, className, containerSelector, position, cushion } = this.props;
    const { visible } = this.state;

    return (
      <div style={{ display }} className={cx(`${prefix}-popover-wrapper`, className && `${className}-wrapper`)}>
        {React.cloneElement(trigger, {
          prefix,
          contentVisible: visible,
          onTriggerRefChange: this.onTriggerRefChange,
          getTriggerNode: this.getTriggerNode,
          getContentNode: this.getPopoverNode,
          open: this.open,
          close: this.close
        })}
        {React.cloneElement(content, {
          prefix,
          className,
          id: this.id,
          getContentNode: this.getPopoverNode,
          getAnchor: this.getTriggerNode,
          visible,
          cushion,
          containerSelector,
          placement: position
        })}
      </div>
    );
  }
}
