import { PROGRESS_STATE } from './constants';
import { HTMLAttributes } from 'react';

export type IProgressType = 'line' | 'circle';
export type IProgressStatus = 'success' | 'exception';
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
  status?: 'success' | 'exception';
  normalColor?: string;
  successColor?: string;
  exceptionColor?: string;
  style?: React.CSSProperties;
}

export interface IProgressInstanceProps extends ICommonProgressProps {
  color: string;
  state: PROGRESS_STATE;
  stateCls: string;
}

export interface IProgressInfoProps {
  type: IProgressType;
  percent: number;
  format?: IProgressFormatFn;
  state: PROGRESS_STATE;
}
