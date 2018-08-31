/// <reference types="react" />

declare module 'zent/lib/clamp-lines' {
  interface IClampLinesProps {
    text: string,
    lines?: number,
    delay?: number,
    ellipsis?: string,
    showPop?: boolean,
    popWidth?: number,
    trigger?: 'click' | 'hover' | 'focus',
    renderPop?: (text: string) => React.ReactNode,
    resizable?: boolean,
    extra?: React.ReactNode,
    className?: string,
    prefix?: string,
  }

  export default class ClampLines extends React.Component<IClampLinesProps, any> { }
}
