/// <reference types="react" />

declare module 'zent/lib/popover' {

  type Position = { getCSSStyle: () => React.CSSProperties, name: string }

  type PositionFunction = (
    anchorBoundingBox: ClientRect,
    containerBoundingBox: ClientRect,
    contentDimension: {width: number, height: number },
    options: { cushion: number, anchor: HTMLElement, container: HTMLElement, anchorBoundingBoxViewport: any, containerBoundingBoxViewport: any }
  ) => Position

  interface IPopoverProps {
    position: PositionFunction
    cushion?: number
    display?: string
    onShow?: () => void
    onClose?: () => void
    onBeforeShow?: ((callback: () => void, escape: () => void) => void) | (() => Promise<any>)
    onBeforeClose?: ((callback: () => void, escape: () => void) => void) | (() => Promise<any>)
    containerSelector?: string
    visible?: boolean
    onVisibleChange?: (visible: boolean) => void
    onPositionUpdated?: () => void
    onPositionReady?: () => void
    className?: string
    wrapperClassName?: string
    width?: number | string
    prefix?: string
  }

  class Popover extends React.Component<IPopoverProps, any> {
    adjustPosition(): void
  }

  namespace Popover {
    namespace Trigger {
      interface IBaseProps {
        getTriggerNode?: () => HTMLElement
        getContentNode?: () => HTMLElement
        open?: () => void
        close?: () => void
        contentVisible?: boolean
        onTriggerRefChange?: (instance: React.ReactInstance, getNodeForTriggerRefChange: (el: HTMLElement) => HTMLElement) => void
        getNodeForTriggerRefChange?: (el: HTMLElement) => HTMLElement
      }

      interface IClickProps extends IBaseProps {
        autoClose?: boolean
        isOutside?: (target: HTMLElement, node: { contentNode: HTMLElement, triggerNode: HTMLElement }) => boolean
      }

      class Click extends React.Component<IClickProps, any> {}

      interface IHoverProps extends IBaseProps {
        showDelay?: number
        hideDelay?: number
        isOutside?: (target: HTMLElement, node: { contentNode: HTMLElement, triggerNode: HTMLElement }) => boolean
        quirk?: boolean
      }

      class Hover extends React.Component<IHoverProps, any> {}

      type IFocusProps = IBaseProps

      class Focus extends React.Component<IFocusProps, any> {}
    }

    namespace Position {
      function create(fn: PositionFunction): Position
    }

    interface IHocPopoverProps {
      getTriggerNode: () => HTMLElement
      getContentNode: () => HTMLElement
      open: () => void
      close: () => void
    }

    function withPopover(component: React.Component<any, any>): React.Component<IHocPopoverProps, any>
  }

  export default Popover
}
