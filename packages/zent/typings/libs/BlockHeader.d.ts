/// <reference types="react" />
/// <reference path="./Pop.d.ts" />

declare module 'zent/lib/block-header' {
  interface IBlockHeaderProps {
    className?: string
    title: string
    tooltip?: React.ReactNode
    content?: React.ReactNode
    childAlign?: 'left' | 'right'
    position?: string
    prefix?: string
  }

  export default class BlockHeader extends React.Component<IBlockHeaderProps, any> {}
}
