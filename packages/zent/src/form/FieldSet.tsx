import {
  useFieldSet,
  FormProvider,
  BasicModel,
  IMaybeError,
  FieldSetModel,
  IValidators,
  $FieldSetValue,
  ModelRef,
  FieldArrayModel,
} from './formulr';
import {
  IRenderError,
  defaultRenderError,
  useFormChild,
  IFormFieldViewDrivenProps,
} from './shared';
import { useImperativeHandle } from 'react';
import { UnknownFieldSetModelChildren } from './formulr/utils';
import { useObservableEagerState } from 'observable-hooks';

export interface IFieldSetBaseProps<T extends UnknownFieldSetModelChildren> {
  /**
   * 表单提交时滚动到错误时的`DOM`元素的`ref`(来自`React.createRef`或`React.useRef`)
   */
  scrollAnchorRef?: React.RefObject<Element>;
  /**
   * 校验规则数组，按数组顺序执行，直到所有都通过或者在第一个失败的地方停止
   */
  validators?: IValidators<$FieldSetValue<T>>;
  children?: React.ReactNode;
  /**
   * 用于渲染整个 `FieldSet` 层面的错误
   */
  renderError?: IRenderError<T>;
  modelRef?: React.RefObject<FieldSetModel<T>>;
}

export interface IFieldSetModelDrivenProps<
  T extends UnknownFieldSetModelChildren
> extends IFieldSetBaseProps<T> {
  model:
    | FieldSetModel<T>
    | ModelRef<
        $FieldSetValue<T>,
        | FieldSetModel<UnknownFieldSetModelChildren>
        | FieldArrayModel<$FieldSetValue<T>, FieldSetModel<T>>,
        FieldSetModel<T>
      >;
}

export interface IFieldSetViewDrivenProps<
  T extends UnknownFieldSetModelChildren
> extends Omit<
      IFormFieldViewDrivenProps<$FieldSetValue<T>>,
      'defaultValue' | 'validators' | 'initialValue'
    >,
    IFieldSetBaseProps<T> {}

export function FieldSet<T extends UnknownFieldSetModelChildren>(
  props: IFieldSetModelDrivenProps<T> | IFieldSetViewDrivenProps<T>
) {
  const {
    scrollAnchorRef,
    renderError = defaultRenderError,
    validators,
    modelRef,
  } = props as IFieldSetBaseProps<T>;
  const { name } = props as IFieldSetViewDrivenProps<T>;
  const { model: rawModel } = props as IFieldSetModelDrivenProps<T>;

  // It's safe to use `any`
  const [ctx, model] = useFieldSet<T>((name ?? rawModel) as any, validators);

  if (isFieldSetViewDrivenProps(props)) {
    const { normalizeBeforeSubmit, destroyOnUnmount } = props;

    model.destroyOnUnmount = Boolean(destroyOnUnmount);
    if (normalizeBeforeSubmit) {
      model.normalizeBeforeSubmit = normalizeBeforeSubmit;
    }
  }

  useImperativeHandle(modelRef, () => model, [model]);
  useFormChild(model as BasicModel<unknown>, scrollAnchorRef);
  useObservableEagerState(model.error$);
  return (
    <FormProvider value={ctx}>
      {props.children}
      {renderError(model.error as IMaybeError<any>)}
    </FormProvider>
  );
}

function isFieldSetViewDrivenProps<T extends UnknownFieldSetModelChildren>(
  props: IFieldSetModelDrivenProps<T> | IFieldSetViewDrivenProps<T>
): props is IFieldSetViewDrivenProps<T> {
  return (props as IFieldSetViewDrivenProps<T>).name !== undefined;
}
