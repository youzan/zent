/**
 * 设计：
 *
 * Popover组件只是一个壳子，负责组装Trigger和Content。
 *
 * 弹层实际的打开／关闭都是Content完成的，而什么情况打开弹层是Trigger控制的。
 *
 * Popover 组件是一个递归的组件，支持嵌套。
 *
 *
 *            context                       context
 *            ------>                       ------>
 * Popover               Popover child                    Popover grand-child     ......
 *            <------                       <------
 *        isOutsideStacked              isOutsideStacked
 *
 */

import * as React from 'react';
import { Component, Children } from 'react';
import * as ReactDOM from 'react-dom';
import cx from 'classnames';
import noop from 'lodash-es/noop';
import uniqueId from 'lodash-es/uniqueId';
import isFunction from 'lodash-es/isFunction';
import isBoolean from 'lodash-es/isBoolean';
import isPromise from '../utils/isPromise';
import kindOf from '../utils/kindOf';
import getWidth from '../utils/getWidth';
import memoize from '../utils/memorize-one';

import PopoverContent from './Content';
import Trigger from './trigger';
import PopoverTrigger from './trigger/Trigger';
import PopoverContext, { IPopoverContext } from './PopoverContext';
import { PositionFunction } from './position-function';
import withPopover from './withPopover';
import Position from './placement';

const SKIPPED = () => {};

function handleBeforeHook(beforeFn, arity, continuation, escape) {
  // 有参数，传入continuation，由外部去控制何时调用
  // escapse 用来终止 onChange 操作
  if (arity === 1) {
    return beforeFn(continuation);
  }

  if (arity >= 2) {
    return beforeFn(continuation, escape);
  }

  // 无参数，如果返回Promise那么resolve后调用continuation, reject 的话调用 escape；
  // 如果返回不是Promise，直接调用Promise
  const mayBePromise = beforeFn();
  if (!isPromise(mayBePromise) && mayBePromise !== SKIPPED) {
    return continuation();
  }

  mayBePromise.then(continuation, escape);
}

export interface IPopoverProps {
  position: PositionFunction;
  cushion?: number;
  display?: string;
  onShow?: () => void;
  onClose?: () => void;
  onBeforeShow?: (callback?: () => void, escape?: () => void) => void;
  onBeforeClose?: (callback?: () => void, escape?: () => void) => void;
  containerSelector?: string;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  onPositionUpdated?: () => void;
  onPositionReady?: () => void;
  className?: string;
  wrapperClassName?: string;
  width?: number | string;
  prefix?: string;
}

export interface IPopoverState {
  visible?: boolean;
}

export class Popover extends Component<IPopoverProps, IPopoverState> {
  static defaultProps = {
    prefix: 'zent',
    className: '',
    wrapperClassName: '',
    display: 'block',
    onBeforeClose: noop,
    onBeforeShow: noop,
    onClose: noop,
    onShow: noop,
    cushion: 0,
    containerSelector: 'body',
    onPositionUpdated: noop,
    onPositionReady: noop,
  };

  static contextType = PopoverContext;

  static Content = PopoverContent;
  static Trigger = Trigger;
  static Position = Position;
  static withPopover = withPopover;

  registerDescendant = (popover: Popover) => {
    this.descendants.push(popover);
  };

  unregisterDescendant = (popover: Popover) => {
    const idx = this.descendants.indexOf(popover);
    this.descendants.splice(idx, 1);
  };

  getPopoverContext = memoize(
    (): IPopoverContext => {
      return {
        _zentPopover: {
          close: this.close,
          open: this.open,
          getContentNode: this.getPopoverNode,
          getTriggerNode: this.getTriggerNode,

          registerDescendant: this.registerDescendant,
          unregisterDescendant: this.unregisterDescendant,
        },
      };
    }
  );

  context!: IPopoverContext;
  id: string;
  isUnmounted: boolean;
  descendants: Popover[];
  pendingOnBeforeHook: boolean;
  triggerNode: HTMLElement | null;
  triggerInstance: PopoverTrigger<any>;
  contentInstance: PopoverContent;
  isOutsideSelf: (el: HTMLElement) => boolean | null;

  constructor(props) {
    super(props);

    // id用来唯一标识popover实例
    this.id = uniqueId(`${props.prefix}-popover-internal-id-`);

    // 记录 Popover 子孙
    this.descendants = [];

    if (!this.isVisibilityControlled(props)) {
      this.state = {
        // eslint-disable-next-line
        visible: false,
      };
    }

    this.isUnmounted = false;
  }

  isVisibilityControlled(props?: IPopoverProps) {
    const { visible, onVisibleChange } = props || this.props;
    const hasOnChange = isFunction(onVisibleChange);
    const hasVisible = isBoolean(visible);

    if ((hasVisible && !hasOnChange) || (hasOnChange && !hasVisible)) {
      throw new Error('visible and onVisibleChange must be used together');
    }

    return hasVisible && hasOnChange;
  }

  getVisible = (props?: IPopoverProps, state?: IPopoverState) => {
    if (this.isVisibilityControlled(props)) {
      props = props || this.props;
      return props.visible;
    }

    state = state || this.state;
    return state.visible;
  };

  setVisible = (
    visible: boolean,
    props?: IPopoverProps,
    state?: IPopoverState
  ) => {
    props = props || this.props;
    state = state || this.state;
    const beforeHook = visible ? props.onBeforeShow : props.onBeforeClose;
    const onBefore = (...args) => {
      // 确保pending的时候不会触发多次beforeHook
      if (this.pendingOnBeforeHook) {
        return SKIPPED;
      }

      this.pendingOnBeforeHook = true;
      return beforeHook(...args);
    };
    const escapse = () => {
      this.pendingOnBeforeHook = false;
    };

    if (this.isVisibilityControlled(props)) {
      if (this.pendingOnBeforeHook || props.visible === visible) {
        return;
      }

      handleBeforeHook(
        onBefore,
        beforeHook.length,
        () => {
          props.onVisibleChange(visible);
          this.pendingOnBeforeHook = false;
        },
        escapse
      );
    } else {
      if (this.pendingOnBeforeHook || state.visible === visible) {
        return;
      }

      handleBeforeHook(
        onBefore,
        beforeHook.length,
        () => {
          this.safeSetState({ visible });
          this.pendingOnBeforeHook = false;
        },
        escapse
      );
    }
  };

  getPopoverNode = () => {
    return document.querySelector(`.${this.id}`);
  };

  onTriggerRefChange = (triggerInstance, nodeFilter) => {
    const node = triggerInstance
      ? ReactDOM.findDOMNode(triggerInstance)
      : undefined;

    this.triggerNode = isFunction(nodeFilter) ? nodeFilter(node) : node;

    this.triggerInstance = triggerInstance;
  };

  onContentRefChange = contentInstance => {
    this.contentInstance = contentInstance;
  };

  getTriggerNode = () => {
    return this.triggerNode;
  };

  adjustPosition() {
    if (this.contentInstance && this.contentInstance.adjustPosition) {
      this.contentInstance.adjustPosition();
    }
  }

  onPositionUpdated = () => {
    // 嵌套的时候需要通知下层更新位置
    this.descendants.forEach(child => {
      child.adjustPosition();
    });

    const { onPositionUpdated } = this.props;
    if (onPositionUpdated) {
      onPositionUpdated();
    }
  };

  open = () => {
    this.setVisible(true);
  };

  close = () => {
    this.setVisible(false);
  };

  injectIsOutsideSelf = impl => {
    this.isOutsideSelf = impl;
  };

  // Popover up in the tree will call this method to see if the node lies outside
  isOutsideStacked = node => {
    if (this.isOutsideSelf) {
      // 在自身内部，肯定不在外面
      if (!this.isOutsideSelf(node)) {
        return false;
      }
    }

    // 问下面的 Popover 是否在外面
    if (this.descendants.some(popover => !popover.isOutsideStacked(node))) {
      return false;
    }

    return true;
  };

  validateChildren() {
    const { children } = this.props;
    const childArray = Children.toArray(children);

    if (childArray.length !== 2) {
      throw new Error(
        'There must be one and only one trigger and content in Popover'
      );
    }

    const { trigger, content } = childArray.reduce<{
      trigger: any;
      content: any;
    }>(
      (state, c: React.ReactElement<any>) => {
        const type = c.type;
        if (kindOf(type, PopoverTrigger)) {
          state.trigger = c;
        } else if (kindOf(type, PopoverContent)) {
          state.content = c;
        }

        return state;
      },
      { trigger: null, content: null }
    );

    if (!trigger) {
      throw new Error('Missing trigger in Popover');
    }
    if (!content) {
      throw new Error('Missing content in Popover');
    }

    return { trigger, content };
  }

  safeSetState(updater, callback?: () => void) {
    if (!this.isUnmounted) {
      return this.setState(updater, callback);
    }
  }

  componentDidMount() {
    const { _zentPopover: popover } = this.context || ({} as IPopoverContext);
    if (popover && popover.registerDescendant) {
      popover.registerDescendant(this);
    }

    if (this.isVisibilityControlled() && this.props.visible) {
      this.props.onShow();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const visible = this.getVisible();
    if (visible !== this.getVisible(prevProps, prevState)) {
      const afterHook = visible ? this.props.onShow : this.props.onClose;
      afterHook();
    }
  }

  componentWillUnmount() {
    const { _zentPopover: popover } = this.context || ({} as IPopoverContext);
    if (popover && popover.unregisterDescendant) {
      popover.unregisterDescendant(this);
    }

    this.isUnmounted = true;
  }

  render() {
    const { trigger, content } = this.validateChildren();
    const {
      display,
      prefix,
      className,
      wrapperClassName,
      containerSelector,
      position,
      cushion,
      width,
      onPositionReady,
    } = this.props;
    const visible = this.getVisible();

    return (
      <div
        style={{ display, ...getWidth(width) }}
        className={cx(`${prefix}-popover-wrapper`, wrapperClassName)}
      >
        <PopoverContext.Provider value={this.getPopoverContext()}>
          {React.cloneElement(trigger, {
            prefix,
            contentVisible: visible,
            onTriggerRefChange: this.onTriggerRefChange,
            getTriggerNode: this.getTriggerNode,
            getContentNode: this.getPopoverNode,
            open: this.open,
            close: this.close,
            isOutsideStacked: this.isOutsideStacked,
            injectIsOutsideSelf: this.injectIsOutsideSelf,
          })}
          {React.cloneElement(content, {
            prefix,
            className,
            id: this.id,
            getContentNode: this.getPopoverNode,
            getAnchor: this.getTriggerNode,
            ref: this.onContentRefChange,
            visible,
            cushion,
            containerSelector,
            placement: position,
            onPositionUpdated: this.onPositionUpdated,
            onPositionReady,
          })}
        </PopoverContext.Provider>
      </div>
    );
  }
}

export default Popover;
