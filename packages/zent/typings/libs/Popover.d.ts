/// <reference types="react" />

declare module 'zent/lib/popover' {
  type PositionFunction = (
    anchorBoundingBox: ClientRect,
    containerBoundingBox: ClientRect,
    contentDimension: {width: number, height: number },
    options: { cushion: number, anchor: HTMLElement, container: HTMLElement, anchorBoundingBoxViewport: any, containerBoundingBoxViewport: any }
  ) => { getCSSStyle: () => React.CSSProperties, name: string }

  interface IPopoverProps {
    position: PositionFunction
    cushion?: number
    display?: string
    onShow?: Function
    onClose?: Function
    onBeforeShow?: Function
    onBeforeClose?: Function
    containerSelector?: string
    visible?: boolean
    onVisibleChange?: Function
    className?: string
    wrapperClassName?: string
    prefix?: string
  }

  class Popover extends React.Component<IPopoverProps, any> {}

  namespace Popover {
    namespace Trigger {
      interface IBaseProps {
        getTriggerNode?: () => HTMLElement
        getContentNode?: () => HTMLElement
        open?: () => void
        close?: () => void
        contentVisible?: boolean
        onTriggerRefChange?: () => React.ReactInstance
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
      }

      class Hover extends React.Component<IHoverProps, any> {}

      type IFocusProps = IBaseProps

      class Focus extends React.Component<IFocusProps, any> {}
    }
  }

  export default Popover
}
