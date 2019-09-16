import { HTMLAttributes } from 'react';

export type IProgressType = 'line' | 'circle';
export type IProgressStatus = 'normal' | 'success' | 'exception';
export type IProgressFormatFn = (precent: number) => React.ReactNode;

export interface ICommonProgressProps {
  percent?: number;
  showInfo?: boolean;
  strokeWidth?: number;
  width?: number;
  bgColor?: string;
  format?: IProgressFormatFn;
}

export interface IProgressProps
  extends ICommonProgressProps,
    HTMLAttributes<HTMLDivElement> {
  type?: IProgressType;
  status?: IProgressStatus;
  normalColor?: string;
  successColor?: string;
  exceptionColor?: string;
  style?: React.CSSProperties;
}

export interface IProgressInstanceProps extends ICommonProgressProps {
  color: string;
  state: IProgressStatus;
}

export interface IProgressInfoProps {
  type: IProgressType;
  percent: number;
  format: IProgressFormatFn;
  state: IProgressStatus;
}
