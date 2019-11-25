import * as React from 'react';
import {
  IValidator,
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
  asFormChild,
  IFormFieldViewDrivenProps,
} from './shared';

export interface IFieldSetProps<T extends Record<string, BasicModel<unknown>>> {
  /**
   * 表单提交时滚动到错误时的`DOM`元素的`ref`(来自`React.createRef`或`React.useRef`)
   */
  scrollAnchorRef?: React.RefObject<Element>;
  /**
   * 校验规则数组，按数组顺序执行，直到所有都通过或者在第一个失败的地方停止
   */
  validators?: Array<IValidator<T>>;
  children?: React.ReactNode;
  /**
   * 用于渲染整个 `FieldSet` 层面的错误
   */
  renderError?: IRenderError<T>;
}

export function FieldSet<T extends Record<string, BasicModel<unknown>>>(
  props: IFieldSetProps<T> &
    IFormFieldViewDrivenProps<T> & { model: FieldSetModel<T> }
) {
  const [ctx, model] = useFieldSet(props.name || props.model, props.validators);
  const { scrollAnchorRef, renderError = defaultRenderError } = props;
  asFormChild(model as BasicModel<unknown>, scrollAnchorRef);
  useValue$(model.error$, model.error$.getValue());
  return (
    <FormProvider value={ctx}>
      {props.children}
      {renderError(model.error as IMaybeError<any>)}
    </FormProvider>
  );
}
