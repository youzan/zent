/// <reference types="react" />

declare module 'zent/lib/collapse' {
  interface ICollapseProps {
    activeKey?: string | string[]
    onChange: (value: string|string[]) => any
    accordion?: boolean
    bordered?: boolean
    className?: string
    prefix?: string
  }

  interface ICollapsePanelProps {
    title: React.ReactNode
    disabled?: boolean
    showArrow?: boolean
    style?: React.CSSProperties
    className?: string
    prefix?: string
  }

  class Collapse extends React.Component<ICollapseProps, any> {}

  namespace Collapse {
    class Panel extends React.PureComponent<ICollapsePanelProps, any> {}
  }

  export default Collapse
}
