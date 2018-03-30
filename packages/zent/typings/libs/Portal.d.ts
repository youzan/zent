/// <reference types="react" />

declare module 'zent/lib/portal' {
  interface IPortalProps {
    // visible
    visible?: boolean

    // children
    children: React.ReactChild
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
  }

  export default Portal
}
