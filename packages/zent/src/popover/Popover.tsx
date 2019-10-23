import * as React from 'react';
import { Component } from 'react';
import { BehaviorSubject } from 'rxjs';

import * as Position from './placement';
import PopoverContent from './Content';
import Trigger from './trigger';
import PopoverContext, { IPopoverContentImperativeHandle } from './Context';
import { IPositionFunction } from './position-function';
import withPopover from './withPopover';
import { IPortalImperativeHandlers } from '../portal';
import Anchor from './Anchor';

export interface IPopoverBeforeHook {
  (continuation?: () => void, escape?: () => void): Promise<void> | void;
}

export interface IPopoverProps {
  position: IPositionFunction;
  cushion: number;
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
  style?: React.CSSProperties;
}

export interface IPopoverState {
  visible: boolean;
}

export class Popover extends Component<IPopoverProps, IPopoverState> {
  static defaultProps = {
    cushion: 0,
    containerSelector: 'body',
  };

  static Anchor = Anchor;
  static Content = PopoverContent;
  static Trigger = Trigger;
  static Position = Position;
  static withPopover = withPopover;
  static Context = PopoverContext;

  private isUnmounted = false;
  private pendingOnBeforeHook = false;
  private readonly anchor$ = new BehaviorSubject<Element | null>(null);
  private didMountHooks: Array<() => () => void> = [];
  private didMountCleanup: Array<() => void> = [];
  portalRef = React.createRef<IPortalImperativeHandlers>();
  isPositionReady = false;
  contentRef = React.createRef<IPopoverContentImperativeHandle>();

  state = {
    visible: false,
  };

  private escape = () => {
    this.pendingOnBeforeHook = false;
  };

  private didMount = (cb: () => () => void) => {
    this.didMountHooks.push(cb);
  };

  setVisible(visible: boolean) {
    const { onBeforeClose, onBeforeShow, onVisibleChange } = this.props;
    const hook = visible ? onBeforeShow : onBeforeClose;
    if (this.pendingOnBeforeHook || visible === this.state.visible) {
      return;
    }
    if (onVisibleChange) {
      return onVisibleChange(visible);
    }
    if (!hook) {
      return this.safeSetState({ visible });
    }
    this.pendingOnBeforeHook = true;
    const continuation = () => {
      this.safeSetState({
        visible,
      });
      this.pendingOnBeforeHook = false;
    };
    if (hook.length >= 1) {
      return hook(continuation, this.escape);
    }
    Promise.resolve(hook()).then(continuation, this.escape);
  }

  adjustPosition() {
    const content = this.contentRef.current;
    if (!content) {
      return;
    }
    content.adjustPosition();
  }

  open = () => {
    this.setVisible(true);
  };

  close = () => {
    this.setVisible(false);
  };

  // validateChildrenImpl(children: React.ReactNode) {
  //   const childArray = Children.toArray(children) as IPopoverChildren;
  //   if (childArray.length !== 2) {
  //     throw new Error(
  //       'There must be one and only one trigger and content in Popover'
  //     );
  //   }
  //   const _0 = childArray[0];
  //   const _1 = childArray[1];
  //   let trigger: IPopoverTriggerElement;
  //   let content: IPopoverContentElement;
  //   if (isPopoverTrigger(_0)) {
  //     trigger = _0;
  //   } else if (isPopoverTrigger(_1)) {
  //     trigger = _1;
  //   } else {
  //     throw new Error('Missing trigger in Popover');
  //   }
  //   if (isPopoverContent(_0)) {
  //     content = _0;
  //   } else if (isPopoverContent(_1)) {
  //     content = _1;
  //   } else {
  //     throw new Error('Missing content in Popover');
  //   }
  //   if ((trigger as any).ref) {
  //     throw new Error('Ref on Trigger Component is not allowed');
  //   }
  //   if ((content as any).ref) {
  //     throw new Error('Ref on Content Component is not allowed');
  //   }
  //   return {
  //     trigger,
  //     content,
  //   };
  // }

  // validateChildren = memorize((children: IPopoverChildren) =>
  //   this.validateChildrenImpl(children)
  // );

  safeSetState(nextState: IPopoverState, callback?: () => void) {
    if (!this.isUnmounted) {
      return this.setState(nextState, callback);
    }
  }

  static getDerivedStateFromProps(
    props: IPopoverProps
  ): Partial<IPopoverState> | null {
    if (typeof props.visible === 'boolean') {
      return {
        visible: props.visible,
      };
    }
    return null;
  }

  componentDidMount() {
    const { onShow } = this.props;
    if (this.state.visible) {
      onShow && onShow();
    }
    this.didMountCleanup = this.didMountHooks.map(it => it());
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
    this.didMountCleanup.forEach(it => it());
  }

  render() {
    const {
      containerSelector,
      position,
      cushion,
      className,
      children,
      style,
    } = this.props;
    const { visible } = this.state;
    return (
      <PopoverContext.Provider
        value={{
          visible,
          containerSelector,
          placement: position,
          cushion,
          className,
          portalRef: this.portalRef,
          contentRef: this.contentRef,
          anchor$: this.anchor$,
          popover: this,
          didMount: this.didMount,
          style,
        }}
      >
        {children}
      </PopoverContext.Provider>
    );
  }
}

export default Popover;
