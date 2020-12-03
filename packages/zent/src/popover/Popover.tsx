import { Component, createRef } from 'react';

import * as Position from './placement';
import PopoverContent from './Content';
import Trigger from './trigger';
import PopoverContext, {
  IPopoverContentImperativeHandle,
  IPopoverContext,
} from './Context';
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
  static contextType = PopoverContext;
  declare context: IPopoverContext | null;

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

  /**
   * 使用内置的Trigger或者直接用Anchor的情况下由Anchor设置
   * 使用自定义的Trigger也可以直接用Anchor，不用Anchor需要手动设置
   */
  getAnchor: (() => Element | Text | null) | null = null;
  private isUnmounted = false;
  private pendingOnBeforeHook = false;
  private didMountHooks: Array<() => () => void> = [];
  private didMountCleanup: Array<() => void> = [];
  readonly portalRef = createRef<IPortalImperativeHandlers>();
  isPositionReady = false;
  readonly contentRef = createRef<IPopoverContentImperativeHandle>();

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
    this.contentRef.current?.adjustPosition();
  }

  open = () => {
    this.setVisible(true);
  };

  close = () => {
    this.setVisible(false);
  };

  /** @internal */
  positionUpdated() {
    const { onPositionReady, onPositionUpdated } = this.props;
    onPositionUpdated?.();
    if (!this.isPositionReady) {
      this.isPositionReady = true;
      onPositionReady?.();
    }
  }

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
    if (prevState.visible !== this.state.visible) {
      const { onShow, onClose } = this.props;
      if (this.state.visible) {
        this.isPositionReady = false;
        onShow && onShow();
      } else {
        onClose && onClose();
      }
    }
    this.adjustPosition();
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
