/// <reference types="react" />

declare module 'zent/lib/portal' {
  interface IPortalProps {
    // visible
    visible?: boolean
    onMount?: Function
    onUnmount?: Function

    // children
    children?: React.ReactChild
    render?: Function

    // parent node
    selector?: string | HTMLElement

    // layer
    layer?: string
    useLayerForClickAway?: boolean
    onClickAway?: Function
    onLayerReady?: Function

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
      render?: Function
      selector: string | HTMLElement
      onMount?: Function
      onUnmount?: Function
    }

    class PurePortal extends React.Component<IPurePortalProps, any> {}
  }

  export default Portal
}
