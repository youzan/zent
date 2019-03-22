/// <reference types="react" />

declare module 'zent/lib/layout' {
  export namespace Layout {
    interface IRowProps {
      className?: string
      prefix?: string
    }
  
    class Row extends React.Component<IRowProps, any> { }
  
    interface IColProps {
      span: number
      offset?: number
      className?: string
      prefix?: string
    }
    class Col extends React.Component<IColProps, any> { }
  }

  export default Layout
}


