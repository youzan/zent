/// <reference types="react" />

declare module 'zent/lib/portal' {
  interface IPortalProps {
    children: React.ReactChild
    selector?: string | HTMLElement
    visible?: boolean
    className?: string
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
