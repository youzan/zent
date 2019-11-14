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
  validators?: Array<IValidator<T>>;
  children?: React.ReactNode;
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
