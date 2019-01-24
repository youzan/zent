/// <reference types="react" />

declare module 'zent/lib/pop' {
  type PopPositions =
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

  interface IPopProps {
    content: React.ReactNode;
    trigger?: 'none' | 'click' | 'hover' | 'focus';
    position?: PopPositions;
    centerArrow?: boolean;
    header?: React.ReactNode;
    block?: boolean;
    onShow?: () => void;
    onClose?: () => void;
    onBeforeShow?:
      | ((callback: () => void, escape: () => void) => void)
      | (() => Promise<any>);
    onBeforeClose?:
      | ((callback: () => void, escape: () => void) => void)
      | (() => Promise<any>);
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

  class HocPopComponent extends React.Component<any, any> {
    open: () => void;
    close: () => void;
  }

  export default class Pop extends React.Component<IPopProps, any> {
    static withPop(component: React.Component<any, any>): HocPopComponent;
    adjustPosition(): void;
    getWrappedPopover(): React.Component<any, any>;
  }
}
