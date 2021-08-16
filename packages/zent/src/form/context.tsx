import { createContext, useContext, CSSProperties } from 'react';

export interface IFormChild {
  valid(): boolean;
  getDOMNode(): Element | null | undefined;
}

export interface IZentFormChildrenContext {
  children: IFormChild[];
}

export const FormChildrenContext =
  createContext<IZentFormChildrenContext | null>(null);

FormChildrenContext.displayName = 'ZentFormChildrenContext';

export function useFormChildrenContext(): IZentFormChildrenContext {
  const ctx = useContext(FormChildrenContext);
  if (ctx === null) {
    throw new Error('Component must be used under Form');
  }
  return ctx;
}

export interface IZentFormContext {
  /**
   * 表单项 label 样式
   */
  labelStyle?: CSSProperties;
  /**
   * 表单项容器样式
   */
  controlStyle?: CSSProperties;
}

export const FormContext = createContext<IZentFormContext>({});
