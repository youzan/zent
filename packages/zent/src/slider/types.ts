import { ReactNode } from 'react';

export interface ISliderCommonProps {
  min: number;
  max: number;
  step: number | string;
  withInput?: boolean;
  dots?: boolean;
  width?: number | string;
  disabled?: boolean;
  className?: string;
  marks?: Record<number, ReactNode>;
}

export interface ISliderSingleProps extends ISliderCommonProps {
  range: false;
  value: number;
  onChange?: (value: number) => void;
}

export interface ISliderRangeProps extends ISliderCommonProps {
  range: true;
  value: [number, number];
  onChange?: (value: [number, number]) => void;
}

export type ISliderProps = ISliderSingleProps | ISliderRangeProps;
