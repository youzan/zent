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

  export default class Collapse extends React.Component<ICollapseProps, any> {}
}
