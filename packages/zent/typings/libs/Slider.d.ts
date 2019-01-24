/// <reference types="react" />

declare module 'zent/lib/slider' {
  type SliderValueType = number | [number, number];
  interface ISliderProps {
    value: SliderValueType;
    onChange?: (value: SliderValueType) => void;
    range?: boolean;
    min?: number;
    max?: number;
    step?: number;
    withInput?: boolean;
    dots?: boolean;
    marks?: Object;
    disabled?: boolean;
    className?: string;
    width?: number | string;
    prefix?: string;
  }

  export default class Slider extends React.Component<ISliderProps, any> {}
}
