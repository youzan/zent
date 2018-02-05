/// <reference types="react" />

declare module 'zent/lib/placeholder' {
  interface IShapeProps {
    style?: React.CSSProperties
    animate?: boolean
    className?: string
    prefix?: string
  }

  interface ITextRowProps extends IShapeProps {
    lineSpacing?: number | string
  }

  interface ITextRowDashedProps extends ITextRowProps {
    segments?: (string | number)[]
  }

  interface ICircleProps extends IShapeProps {
    diameter?: number | string
  }

  interface IRectangleProps extends IShapeProps {
    width: number | string
    height: number | string
  }

  interface ITextBlockProps extends IShapeProps {
    rows: number
    lineSpacing?: number | string
    widths?: number[]
    dashed?: boolean
    dashSegments?: (string | number)[][]
  }

  interface IRichTextBlockProps extends ITextRowProps {
    shape?: 'circle' | 'react'
    size?: string | number
  }

  module Placeholder {
    class TextBlock extends React.Component<ITextBlockProps, any> {}
    class RichTextBlock extends React.Component<IRichTextBlockProps, any> {}
    class TextRow extends React.Component<ITextRowProps, any> {}
    class TextRowDashed extends React.Component<ITextRowDashedProps, any> {}
    class Circle extends React.Component<ICircleProps, any> {}
    class Rectangle extends React.Component<IRectangleProps, any> {}
  }

  export default Placeholder
}
