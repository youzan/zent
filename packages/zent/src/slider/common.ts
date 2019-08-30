import { CSSProperties } from 'react';

export const getLeft = (value: number, min: number, max: number) => {
  return ((value - min) * 100) / (max - min);
};

export const getClosest = (value: [number, number], pointValue: number) => {
  let newValue;
  if (Math.abs(value[0] - pointValue) <= Math.abs(value[1] - pointValue)) {
    newValue = [pointValue, value[1]];
  } else {
    newValue = [value[0], pointValue];
  }
  return newValue;
};

export interface ISliderChildCommonProps {
  min: number;
  max: number;
  disabled: boolean;
  decimal: number;
  value: number;
  position: string;
  onChange(value: number | string | null): void;
}

export type IComputedProps =
  | {
      range: true;
      leftProps: ISliderChildCommonProps;
      rightProps: ISliderChildCommonProps;
      trackStyle: CSSProperties;
    }
  | {
      range: false;
      props: ISliderChildCommonProps;
      trackStyle: CSSProperties;
    };
