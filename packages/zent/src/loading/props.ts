export type LoadingColorPreset = 'primary' | 'grey';

export interface ILoadingBaseProps {
  loading?: boolean;
  delay?: number;
  icon?: 'youzan' | 'circle';
  iconSize?: number;
  iconText?: React.ReactNode;
  colorPreset?: LoadingColorPreset;
  textPosition?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export interface IBlockLoadingProps extends ILoadingBaseProps {
  height?: number | string;
  children?: React.ReactNode;
}

export type IInlineLoadingProps = ILoadingBaseProps;

export interface IFullScreenLoadingProps extends ILoadingBaseProps {
  zIndex?: number;
}
