/// <reference types="react" />

declare module 'zent/lib/affix' {
  interface IAffixProps {
    offsetTop?: number
    offsetBottom?: number
    onPin?: Function
    onUnpin?: Function
    zindex?: number
    className?: string
    placeHoldClassName?: string
    prefix?: string
  }

  export class Affix extends React.Component<IAffixProps, any> {}
}
