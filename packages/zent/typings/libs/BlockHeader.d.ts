/// <reference types="react" />

declare module 'zent/lib/block-header' {
  interface IBlockHeaderProps {
    className?: string
    title: string
    tooltip?: React.ReactNode
    content?: React.ReactNode,
    childAlign?: string,
    position?: string,
    prefix?: string
  }

  export default class BlockHeader extends React.Component<IBlockHeaderProps, any> {}
}
