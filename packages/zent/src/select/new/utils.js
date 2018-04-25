import { NONE_SELECTED } from './constants';

export const stringOrNumber = value =>
  typeof value === 'string' || typeof value === 'number';

export const isUnselected = value => value === NONE_SELECTED;
