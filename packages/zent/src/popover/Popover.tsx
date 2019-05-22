import * as React from 'react';
import { Component, Children } from 'react';

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
import memorize from '../utils/memorize-one';

export interface IPopoverBeforeHook {
  (continuation?: () => void, escape?: () => void): Promise<void> | void;
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
    cushion: 0,
    containerSelector: 'body',
  };

  static Content = PopoverContent;
  static Trigger = Trigger;
  static Position = Position;
  static withPopover = withPopover;
  static usePopover = usePopover;
  static Context = PopoverContext;

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
    const { onBeforeClose, onBeforeShow, onVisibleChange } = this.props;
    const hook = visible ? onBeforeShow : onBeforeClose;
    if (this.pendingOnBeforeHook) {
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

  validateChildrenImpl(children: React.ReactNode) {
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

  validateChildren = memorize((children: IPopoverChildren) =>
    this.validateChildrenImpl(children)
  );

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
    const {
      containerSelector,
      position,
      cushion,
      className,
      children,
    } = this.props;
    const { visible } = this.state;
    const { validateChildren } = this;
    const { trigger, content } = validateChildren(children);
    /**
     * content must before trigger here,
     * because trigger need to get content's instance in its componentDidMount.
     * if trigger is ahead of content, content's ref (including portal's ref) will be null in trigger's componentDidMount.
     * this is bound to React's internal implementation.
     * THIS IS DANGEROUS, DO NOT IMITATE!
     */
    return (
      <PopoverContext.Provider
        value={{
          popover: this,
          visible,
          containerSelector,
          placement: position,
          cushion,
          portalRef: this.portalRef,
          className,
        }}
      >
        {React.cloneElement(content, {
          ref: this.contentRef,
        })}
        {React.cloneElement(trigger, {
          ref: this.triggerRef,
        })}
      </PopoverContext.Provider>
    );
  }
}

export default Popover;
