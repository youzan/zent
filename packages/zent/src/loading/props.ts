import * as React from 'react';

export interface ILoadingBaseProps {
  loading?: boolean;
  delay?: number;
  icon?: 'youzan' | 'circle';
  iconSize?: number;
  iconText?: React.ReactNode;
  textPosition?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export interface IBlockLoadingProps extends ILoadingBaseProps {
  height?: number | string;
  children?: React.ReactNode;
}

export interface IInlineLoadingProps extends ILoadingBaseProps {}

export interface IFullScreenLoadingProps extends ILoadingBaseProps {
  zIndex?: number;
}
