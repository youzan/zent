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
import isPromise from '../utils/isPromise';

import * as Position from './placement';
import PopoverContent, {
  isPopoverContent,
  IPopoverContentElement,
} from './Content';
import Trigger from './trigger';
import PopoverTrigger, {
  isPopoverTrigger,
  IPopoverTriggerElement,
} from './trigger/Trigger';
import PopoverContext from './PopoverContext';
import { IPositionFunction } from './position-function';
import withPopover, { usePopover } from './withPopover';
import { IPortalImperativeHandlers } from '../portal';
// import Position from './placement';

const SKIPPED = Symbol('ZentPopoverHookSkip');

export interface IPopoverBeforeHook {
  (continuation?: () => void, escape?: () => void): Promise<void> | void;
}

function handleBeforeHook(
  beforeFn: (
    continuation?: () => void,
    escape?: () => void
  ) => Promise<void> | void | symbol,
  arity: number,
  continuation: () => void,
  escape: () => void
) {
  // 有参数，传入continuation，由外部去控制何时调用
  // escape 用来终止 onChange 操作
  if (arity >= 1) {
    return beforeFn(continuation, escape);
  }
  // 无参数，如果返回Promise那么resolve后调用continuation, reject 的话调用 escape；
  // 如果返回不是Promise，直接调用Promise
  const mayBePromise = beforeFn();
  if (isPromise<void>(mayBePromise)) {
    mayBePromise.then(continuation, escape);
  } else if (mayBePromise !== SKIPPED) {
    return continuation();
  }
}

export type IPopoverChildren =
  | [IPopoverTriggerElement, IPopoverContentElement]
  | [IPopoverContentElement, IPopoverTriggerElement];

export interface IPopoverProps {
  position: IPositionFunction;
  cushion: number;
  // display?: string;
  onShow?: () => void;
  onClose?: () => void;
  onBeforeShow?: IPopoverBeforeHook;
  onBeforeClose?: IPopoverBeforeHook;
  containerSelector: string;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  onPositionUpdated?: () => void;
  onPositionReady?: () => void;
  className?: string;
  children: IPopoverChildren;
}

export interface IPopoverState {
  visible: boolean;
}

export class Popover extends Component<IPopoverProps, IPopoverState> {
  static defaultProps = {
    // display: 'block',
    cushion: 10,
    containerSelector: 'body',
  };

  static contextType = PopoverContext;

  static Content = PopoverContent;
  static Trigger = Trigger;
  static Position = Position;
  static withPopover = withPopover;
  static usePopover = usePopover;

  private isUnmounted = false;
  private pendingOnBeforeHook = false;
  portalRef = React.createRef<IPortalImperativeHandlers>();
  isPositionReady = false;
  triggerRef = React.createRef<PopoverTrigger>();
  contentRef = React.createRef<PopoverContent>();

  state = {
    visible: false,
  };

  private escape = () => {
    this.pendingOnBeforeHook = false;
  };

  setVisible(visible: boolean) {
    const { onBeforeClose, onBeforeShow } = this.props;
    const beforeHook = visible ? onBeforeShow : onBeforeClose;
    if (!beforeHook || this.pendingOnBeforeHook) {
      return;
    }
    const onBefore: (
      continuation?: () => void,
      escape?: () => void
    ) => Promise<void> | void | symbol = (...args) => {
      // 确保pending的时候不会触发多次beforeHook
      if (this.pendingOnBeforeHook) {
        return SKIPPED;
      }
      this.pendingOnBeforeHook = true;
      return beforeHook(...args);
    };
    handleBeforeHook(
      onBefore,
      beforeHook.length,
      () => {
        this.safeSetState({ visible });
        this.pendingOnBeforeHook = false;
      },
      this.escape
    );
  }

  adjustPosition() {
    const content = this.contentRef.current;
    if (!content) {
      return;
    }
    content.adjustPosition();
  }

  open() {
    this.setVisible(true);
  }

  close() {
    this.setVisible(false);
  }

  validateChildren() {
    const { children } = this.props;
    const childArray = Children.toArray(children) as IPopoverChildren;
    if (childArray.length !== 2) {
      throw new Error(
        'There must be one and only one trigger and content in Popover'
      );
    }
    const _0 = childArray[0];
    const _1 = childArray[1];
    let trigger: IPopoverTriggerElement;
    let content: IPopoverContentElement;
    if (isPopoverTrigger(_0)) {
      trigger = _0;
    } else if (isPopoverTrigger(_1)) {
      trigger = _1;
    } else {
      throw new Error('Missing trigger in Popover');
    }
    if (isPopoverContent(_0)) {
      content = _0;
    } else if (isPopoverContent(_1)) {
      content = _1;
    } else {
      throw new Error('Missing content in Popover');
    }
    if ((trigger as any).ref) {
      throw new Error('Ref on Trigger Component is not allowed');
    }
    if ((content as any).ref) {
      throw new Error('Ref on Content Component is not allowed');
    }
    return {
      trigger,
      content,
    };
  }

  safeSetState(
    updater:
      | ((
          prevState: Readonly<IPopoverState>,
          props: Readonly<IPopoverProps>
        ) => Partial<IPopoverState> | null)
      | (Partial<IPopoverState> | null),
    callback?: () => void
  ) {
    if (!this.isUnmounted) {
      return this.setState(updater as any, callback);
    }
  }

  static getDerivedStateFromProps({
    visible,
  }: IPopoverProps): Partial<IPopoverState> | null {
    if (typeof visible === 'boolean') {
      return {
        visible,
      };
    }
    return null;
  }

  componentDidMount() {
    const { onShow } = this.props;
    if (this.state.visible) {
      onShow && onShow();
    }
  }

  componentDidUpdate(prevProps: IPopoverProps, prevState: IPopoverState) {
    if (prevState.visible === this.state.visible) {
      return;
    }
    const { onShow, onClose } = this.props;
    if (this.state.visible) {
      this.isPositionReady = false;
      this.adjustPosition();
      onShow && onShow();
    } else {
      onClose && onClose();
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    const { trigger, content } = this.validateChildren();
    const { containerSelector, position, cushion } = this.props;
    const { visible } = this.state;
    return (
      <PopoverContext.Provider
        value={{
          popover: this,
          visible,
          containerSelector,
          placement: position,
          cushion,
          portalRef: this.portalRef,
        }}
      >
        {React.cloneElement(trigger, {
          ref: this.triggerRef,
        })}
        {React.cloneElement(content, {
          ref: this.contentRef,
        })}
      </PopoverContext.Provider>
    );
  }
}

export default Popover;
