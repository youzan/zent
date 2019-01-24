/// <reference types="react" />

declare module 'zent/lib/loading' {
  interface ILoadingProps {
    show?: boolean;
    showDelay?: number;
    float?: boolean;
    height?: number;
    zIndex?: number;
    className?: string;
    containerClass?: string;
    prefix?: string;
  }

  export default class Loading extends React.Component<ILoadingProps, any> {}
}
