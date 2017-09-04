/// <reference types="react" />

declare module 'zent/lib/block-header' {
  interface IBlockHeaderProps {
    className?: string
    title: string
    tooltip?: React.ReactNode
    content?: React.ReactNode,
    position?: string,
    prefix?: string
  }

  export default class BlockHeader extends React.Component<IBlockHeaderProps, any> {}
}
