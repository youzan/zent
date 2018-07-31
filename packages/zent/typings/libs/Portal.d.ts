/// <reference types="react" />

declare module 'zent/lib/portal' {
  interface IPortalProps {
    // visible
    visible?: boolean
    onMount?: () => void
    onUnmount?: () => void

    // children
    children?: React.ReactNode
    render?: () => React.ReactNode

    // parent node
    selector?: string | HTMLElement

    // layer
    layer?: string
    useLayerForClickAway?: boolean
    onClickAway?: React.MouseEventHandler<HTMLElement> | React.TouchEventHandler<HTMLElement>
    onLayerReady?: (el: HTMLElement) => void

    // layer style
    className?: string
    style?: React.CSSProperties
    css?: React.CSSProperties
    prefix?: string
  }

  class Portal extends React.Component<IPortalProps, any> { }

  namespace Portal {
    interface IEscPortalProps extends IPortalProps {
      onClose: () => void
    }

    function withESCToClose(component: Portal): React.Component<IEscPortalProps, any>

    type INonScrollablePortalProps = IPortalProps

    function withNonScrollable(component: Portal): React.Component<INonScrollablePortalProps, any>

    interface IPurePortalProps {
      children?: React.ReactChild
      render?: () => React.ReactNode
      selector: string | HTMLElement
      onMount?: () => void
      onUnmount?: () => void
    }

    class PurePortal extends React.Component<IPurePortalProps, any> {}
  }

  export default Portal
}
