/// <reference types="react" />

declare module 'zent/lib/swiper' {
  interface ISwiperProps {
    className?: string
    prefix?: string
    transitionDuration?: number
    autoplay?: boolean
    autoplayInterval?: number
    dots?: boolean
    dotsColor?: string
    dotsSize?: 'normal'|'small'|'large'
    arrows?: boolean
    arrowsType?: 'dark'|'light'
    onChange?: (current: number, prev: number) => void
  }

  export default class Swiper extends React.Component<ISwiperProps, any> {
    swiperTo(index: number): void
    prev(): void
    next(): void
  }
}
