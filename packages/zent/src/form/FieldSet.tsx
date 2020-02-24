import * as React from 'react';
import {
  useFieldSet,
  FormProvider,
  useValue$,
  BasicModel,
  IMaybeError,
  FieldSetModel,
} from 'formulr';
import {
  IRenderError,
  defaultRenderError,
  useFormChild,
  IFormFieldViewDrivenProps,
} from './shared';

export interface IFieldSetBaseProps<
  T extends Record<string, BasicModel<unknown>>
> {
  /**
   * 表单提交时滚动到错误时的`DOM`元素的`ref`(来自`React.createRef`或`React.useRef`)
   */
  scrollAnchorRef?: React.RefObject<Element>;
  children?: React.ReactNode;
  /**
   * 用于渲染整个 `FieldSet` 层面的错误
   */
  renderError?: IRenderError<T>;
}

export interface IFieldSetModelDrivenProps<
  T extends Record<string, BasicModel<unknown>>
> extends IFieldSetBaseProps<T> {
  model: FieldSetModel<T>;
}

export interface IFieldSetViewDrivenProps<
  T extends Record<string, BasicModel<unknown>>
>
  extends Omit<IFormFieldViewDrivenProps<T>, 'defaultValue'>,
    IFieldSetBaseProps<T> {}

export function FieldSet<T extends Record<string, BasicModel<unknown>>>(
  props: IFieldSetModelDrivenProps<T> | IFieldSetViewDrivenProps<T>
) {
  const { name, validators } = props as IFieldSetViewDrivenProps<T>;
  const { model: rawModel } = props as IFieldSetModelDrivenProps<T>;
  const [ctx, model] = useFieldSet(name || rawModel, validators);

  const {
    scrollAnchorRef,
    renderError = defaultRenderError,
  } = props as IFieldSetBaseProps<T>;
  useFormChild(model as BasicModel<unknown>, scrollAnchorRef);
  useValue$(model.error$, model.error$.getValue());
  return (
    <FormProvider value={ctx}>
      {props.children}
      {renderError(model.error as IMaybeError<any>)}
    </FormProvider>
  );
}
