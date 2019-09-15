import { IProgressStatus } from './types';

export const avaliableStatus: IProgressStatus[] = [
  'normal',
  'success',
  'exception',
];

export const DEFAULT_WIDTH = {
  CIRCLE: 132,
  LINE: '100%',
};

export const defaultFormat = (percent: number) => `${percent}%`;
