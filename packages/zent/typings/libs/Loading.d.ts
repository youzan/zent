/// <reference types="react" />

interface IBaseLoadingProps {
  loading?: boolean;
  delay?: number;
  icon?: 'youzan' | 'circle';
  iconSize?: number;
  iconText?: React.ReactNode;
  textPosition?: 'top' | 'bottom' | 'right' | 'left';
  className?: string;
}

declare module 'zent/lib/loading/BlockLoading' {
  interface IBlockLoadingProps extends IBaseLoadingProps {
    height?: number;
  }

  const BlockLoading: React.FunctionComponent<IBlockLoadingProps>;

  export default BlockLoading;
}

declare module 'zent/lib/loading/InlineLoading' {
  interface IInlineLoadingProps extends IBaseLoadingProps {}

  const InlineLoading: React.FunctionComponent<IInlineLoadingProps>;

  export default InlineLoading;
}

declare module 'zent/lib/loading/FullScreenLoading' {
  interface IFullScreenLoadingProps extends IBaseLoadingProps {
    zIndex?: number;
  }

  const FullScreenLoading: React.FunctionComponent<IFullScreenLoadingProps>;

  export default FullScreenLoading;
}
