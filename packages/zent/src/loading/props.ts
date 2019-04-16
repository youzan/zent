import * as React from 'react';

export interface ILoadingBaseProps {
  loading: boolean;
  delay: number;
  icon: 'youzan' | 'circle';
  iconSize?: number;
  iconText?: React.ReactNode;
  textPosition: 'top' | 'bottom' | 'left' | 'right';
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

export const BaseDefaultProps = {
  loading: false,
  icon: 'youzan',
  delay: 0,
  textPosition: 'bottom',
};

// export const BlockPropTypes = {
//   ...BasePropTypes,
//   height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
// };

export const BlockDefaultProps = BaseDefaultProps;

// export const InlinePropTypes = BasePropTypes;

export const InlineDefaultProps = BaseDefaultProps;

// export const FullScreenPropTypes = {
//   ...BasePropTypes,
//   zIndex: PropTypes.number,
// };

export const FullScreenDefaultProps = BaseDefaultProps;
