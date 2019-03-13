import * as React from 'react';
import { ReactNode, FunctionComponent, CSSProperties } from 'react';
import { ASYNC } from './utils';
import isPromise from '../utils/isPromise';

export interface IZentFormErrorProps {
  errors?: {
    [key: string]: boolean | Promise<boolean>;
  } | null;
  display: {
    [key: string]: ReactNode;
  };
  style?: CSSProperties;
}

export const FormError: FunctionComponent<IZentFormErrorProps> = ({ errors, display, style }) => {
  if (!errors) {
    return null;
  }
  for (const key of Object.keys(errors)) {
    const value = errors[key];
    if (isPromise(value)) {
      continue;
    }
    if (value !== null && value !== undefined && !value) {
      return (
        <div className="zent-form__error-desc" style={style}>
          {display[key] || '' + value}
        </div>
      );
    }
  }
  // TODO: remove as any after typescript fix symbol as key
  if (errors[ASYNC as any]) {
    return (
      <div className="zent-form__error-desc" style={style}>
        {errors[ASYNC as any]}
      </div>
    );
  }
  return null;
};

export default FormError;
