import * as React from 'react';
import cx from 'classnames';
import { Omit } from 'utility-types';
import { Subscription } from 'rxjs';
import {
  FormProvider,
  useField,
  useFieldArray,
  useFieldSet,
  field,
  set,
  array,
  form,
  FieldValue,
  FieldSetValue,
  useFieldArrayValue,
  ValidateOption,
  createAsyncValidator,
  isAsyncValidator,
  useFieldValue,
} from './formulr';
import memorize from '../utils/memorize-one';
import {
  FormChildrenContext,
  IFormChild,
  IZentFormChildrenContext,
} from './context';
import { ZentForm, useForm } from './ZentForm';
import scroll from '../utils/scroll';
import { CombineErrors } from './CombineErrors';
import { ValidateOccasion, TouchWhen } from './shared';
import { Disabled } from '../disabled';

export {
  IRenderError,
  IFormFieldViewDrivenProps,
  IFormFieldModelDrivenProps,
  IFormFieldModelProps,
  isViewDrivenProps,
  ValidateOccasion,
  IFormComponentProps,
} from './shared';

function makeChildrenContext(children: IFormChild[]): IZentFormChildrenContext {
  return {
    children,
  };
}

export interface IFormProps<T extends {}>
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onSubmit' | 'dangerouslySetInnerHTML'
  > {
  /**
   * 表单布局，支持水平布局和垂直布局
   * @defaultValue `'vertical'`
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * `useForm`得到的`model`
   */
  form: ZentForm<T>;
  /**
   * @deprecated
   * 禁用表单输入，开启后表单内所有元素不可编辑。注意：自定义组件需要自己实现禁用逻辑和展示
   */
  disabled?: boolean;
  /**
   * 表单校验报错时自动滚动到第一个错误的位置
   */
  scrollToError?: boolean;
  /**
   * 表单提交回调函数，`form.submit` 或者原生的 `DOM` 触发的 `submit` 事件都会触发 `onSubmit`
   */
  onSubmit?: (
    form: ZentForm<T>,
    e?: React.SyntheticEvent
  ) => void | Promise<unknown>;
  /**
   * 表单提交失败时的回调函数
   */
  onSubmitFail?: (e: unknown) => void;
  /**
   * 表单提交成功时的回调函数
   */
  onSubmitSuccess?: () => void;
  /**
   * 禁用表单内 `input` 元素的回车提交功能
   */
  disableEnterSubmit?: boolean;
}

export class Form<T extends {}> extends React.Component<IFormProps<T>> {
  static displayName = 'ZentForm';

  static CombineErrors = CombineErrors;
  static useForm = useForm;
  static useField = useField;
  static useFieldArray = useFieldArray;
  static useFieldSet = useFieldSet;
  static field = field;
  static set = set;
  static array = array;
  static form = form;
  static FieldValue = FieldValue;
  static FieldSetValue = FieldSetValue;
  static useFieldArrayValue = useFieldArrayValue;
  static useFieldValue = useFieldValue;
  static ValidateOption = ValidateOption;
  static createAsyncValidator = createAsyncValidator;
  static isAsyncValidator = isAsyncValidator;
  static ValidateOccasion = ValidateOccasion;
  static TouchWhen = TouchWhen;

  readonly formRef = React.createRef<HTMLFormElement>();

  private readonly children: IFormChild[] = [];
  private getChildrenContext = memorize(makeChildrenContext);
  private subscription: Subscription | null = null;

  private onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    this.props.form.submit(e);
  };

  private onKeyDown: React.KeyboardEventHandler<HTMLFormElement> = e => {
    const { onKeyDown, disableEnterSubmit = true } = this.props;
    if (
      disableEnterSubmit &&
      e.key === 'Enter' &&
      (e.target as Element).tagName === 'INPUT'
    ) {
      e.preventDefault();
    }
    onKeyDown && onKeyDown(e);
  };

  private async submit(e?: React.SyntheticEvent) {
    const {
      onSubmit,
      form,
      onSubmitFail,
      onSubmitSuccess,
      scrollToError,
    } = this.props;
    if (!onSubmit) {
      return;
    }

    const success = () => {
      onSubmitSuccess && onSubmitSuccess();
      form.submitSuccess();
    };
    const fail = (error: unknown) => {
      onSubmitFail && onSubmitFail(error);
      form.submitError();
    };

    try {
      form.submitStart();
      await form.validate(
        ValidateOption.IncludeAsync |
          ValidateOption.IncludeChildrenRecursively |
          ValidateOption.IncludeUntouched
      );
      if (!form.isValid()) {
        scrollToError && this.scrollToFirstError();
        fail(new Error('Form validation failed'));
        return;
      }
      await onSubmit(form, e);
      success();
    } catch (error) {
      fail(error);
    }
  }

  scrollToFirstError() {
    for (let i = 0; i < this.children.length; i += 1) {
      const child = this.children[i];
      const el = child.getDOMNode();
      if (!el) {
        continue;
      }
      const elementBound = el.getBoundingClientRect();
      const y = elementBound.top + window.pageYOffset;
      const x = elementBound.left + window.pageXOffset;
      scroll(document.body, x, y);
    }
  }

  private submitListener = (e?: React.SyntheticEvent) => {
    this.submit(e);
  };

  private subscribe() {
    const { form } = this.props;
    this.subscription = form.submit$.subscribe(this.submitListener);
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  componentDidMount() {
    this.subscribe();
  }

  componentDidUpdate(prevProps: IFormProps<T>) {
    if (prevProps.form !== this.props.form) {
      this.unsubscribe();
      this.subscribe();
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {
      children,
      layout = 'vertical',
      className,
      form,
      onSubmit,
      onSubmitFail,
      onSubmitSuccess,
      disableEnterSubmit,
      disabled = false,
      scrollToError,
      ...props
    } = this.props;
    const childrenCtx = this.getChildrenContext(this.children);
    return (
      <Disabled value={disabled}>
        <FormChildrenContext.Provider value={childrenCtx}>
          <FormProvider value={form.ctx}>
            <form
              ref={this.formRef}
              {...props}
              className={cx(
                {
                  'zent-form-vertical': layout === 'vertical',
                  'zent-form-horizontal': layout === 'horizontal',
                },
                className
              )}
              onSubmit={this.onSubmit}
              onKeyDown={this.onKeyDown}
            >
              {children}
            </form>
          </FormProvider>
        </FormChildrenContext.Provider>
      </Disabled>
    );
  }
}
