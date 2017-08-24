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

  export class Popover extends React.Component<IPopoverProps, any> {}
}
