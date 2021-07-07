import cx from 'classnames';
import { Subscription } from 'rxjs';
import { Component, createRef } from 'react';

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
  FieldValid,
  useFieldValid,
  // eslint-disable-next-line import/no-deprecated
  useModelValid,
  // eslint-disable-next-line import/no-deprecated
  useModelValue,
  useNamedChildModel,
} from './formulr';
import memorize from '../utils/memorize-one';
import {
  FormChildrenContext,
  IFormChild,
  IZentFormChildrenContext,
} from './context';
import { ZentForm, useForm, useFormValue, useFormValid } from './ZentForm';
import { smoothScroll } from '../utils/scroll';
import { CombineErrors } from './CombineErrors';
import { ValidateOccasion, TouchWhen } from './shared';
import { Disabled } from '../disabled';
import getScrollPosition from '../utils/dom/getScollPosition';
import isPromise from '../utils/isPromise';

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

export interface IFormScrollToErrorOptions {
  /**
   * 自定义滚动的 DOM 节点，默认 `document.body`
   */
  scrollContainer?: HTMLElement;

  /**
   * 自定义滚动的 x 轴偏移量
   */
  offsetX?: number;
  /**
   * 自定义滚动的 y 轴偏移量
   */
  offsetY?: number;
}

// eslint-disable-next-line @typescript-eslint/ban-types
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
   * 禁用表单输入，开启后表单内所有元素不可编辑。注意：自定义组件需要自己实现禁用逻辑和展示
   */
  disabled?: boolean;

  /**
   * 表单校验报错时自动滚动到第一个错误的位置
   */
  scrollToError?: boolean;

  /**
   * 触发滚动到第一个错误前的回调函数
   * 如果返回一个 `Promise`，当 `Promise` `resolve` 时才会继续执行滚动，`reject` 将终止滚动操作。
   * 可以返回 `IFormScrollToErrorOptions` 用来调整滚动的位置。
   */
  willScrollToError?: (
    form: ZentForm<T>
  ) =>
    | void
    | IFormScrollToErrorOptions
    | Promise<IFormScrollToErrorOptions | void>;

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
   * 表单重置回调函数，`form.reset` 或者原生的 `DOM` 触发的 `reset` 事件都会触发 `onReset`
   */
  onReset?: (e?: React.FormEvent<HTMLFormElement>) => void;

  /**
   * 禁用表单内 `input` 元素的回车提交功能
   */
  disableEnterSubmit?: boolean;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export class Form<T extends {}> extends Component<IFormProps<T>> {
  static displayName = 'ZentForm';

  static CombineErrors = CombineErrors;
  static useForm = useForm;
  static useField = useField;
  static useFieldArray = useFieldArray;
  static useFieldSet = useFieldSet;
  static useNamedChildModel = useNamedChildModel;
  static field = field;
  static set = set;
  static array = array;
  static form = form;
  static FieldValue = FieldValue;
  static FieldSetValue = FieldSetValue;
  static useFormValue = useFormValue;
  static useFieldArrayValue = useFieldArrayValue;
  static useFieldValue = useFieldValue;
  static FieldValid = FieldValid;
  static useFormValid = useFormValid;
  static useFieldValid = useFieldValid;
  // eslint-disable-next-line import/no-deprecated
  static useModelValue = useModelValue;
  // eslint-disable-next-line import/no-deprecated
  static useModelValid = useModelValid;
  static ValidateOption = ValidateOption;
  static createAsyncValidator = createAsyncValidator;
  static isAsyncValidator = isAsyncValidator;
  static ValidateOccasion = ValidateOccasion;
  static TouchWhen = TouchWhen;

  readonly formRef = createRef<HTMLFormElement>();

  private readonly children: IFormChild[] = [];
  private getChildrenContext = memorize(makeChildrenContext);
  private submitSubscription: Subscription | null = null;
  private resetSubscription: Subscription | null = null;

  private onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    this.props.form.submit(e);
  };

  private onReset: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    this.props.form.reset(e);
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

  private reset(e?: React.FormEvent<HTMLFormElement>) {
    const { form, onReset } = this.props;
    form.resetValue();
    onReset?.(e);
  }

  private async submit(e?: React.SyntheticEvent) {
    const { onSubmit, form, onSubmitFail, onSubmitSuccess, scrollToError } =
      this.props;
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
    const { willScrollToError, form } = this.props;
    if (typeof willScrollToError !== 'function') {
      this._scrollToFirstError();
    } else {
      const p = willScrollToError(form);
      if (!isPromise<IFormScrollToErrorOptions | void>(p)) {
        this._scrollToFirstError(p);
      } else {
        // Do not scroll if promise rejects
        p.then(opt => {
          this._scrollToFirstError(opt);
        }).catch(() => {});
      }
    }
  }

  private _scrollToFirstError(options?: IFormScrollToErrorOptions | void) {
    let scrollX = Infinity;
    let scrollY = Infinity;
    for (let i = 0; i < this.children.length; i += 1) {
      const child = this.children[i];
      const el = child.getDOMNode();
      if (!el || child.valid()) {
        continue;
      }
      const elementBound = el.getBoundingClientRect();
      const y = elementBound.top;
      const x = elementBound.left;

      /**
       * Find the position of first field in view
       *
       * Example:
       * Field1  Field2
       * Field3
       */
      if (y < scrollY || (y === scrollY && x < scrollX)) {
        scrollX = x;
        scrollY = y;
      }
    }

    if (scrollX === Infinity || scrollY === Infinity) {
      return;
    }

    const scrollOptions = (options ?? {}) as IFormScrollToErrorOptions;
    const { offsetX = 0, offsetY = 0, scrollContainer } = scrollOptions;
    if (scrollContainer) {
      const containerBox = scrollContainer.getBoundingClientRect();
      const deltaX = scrollX - containerBox.left;
      const deltaY = scrollY - containerBox.top;
      const x = scrollContainer.scrollLeft + deltaX + offsetX;
      const y = scrollContainer.scrollTop + deltaY + offsetY;
      smoothScroll(scrollContainer, x, y);
    } else {
      const { x, y } = getScrollPosition();
      smoothScroll(document.body, scrollX + x + offsetX, scrollY + y + offsetY);
    }
  }

  private submitListener = (e?: React.SyntheticEvent) => {
    this.submit(e);
  };

  private resetListener = (e?: React.FormEvent<HTMLFormElement>) => {
    this.reset(e);
  };

  private subscribe() {
    const { form } = this.props;
    this.submitSubscription = form.submit$.subscribe(this.submitListener);
    this.resetSubscription = form.reset$.subscribe(this.resetListener);
  }

  private unsubscribe() {
    if (this.submitSubscription) {
      this.submitSubscription.unsubscribe();
      this.submitSubscription = null;
    }

    if (this.resetSubscription) {
      this.resetSubscription.unsubscribe();
      this.resetSubscription = null;
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
      willScrollToError,
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
              onReset={this.onReset}
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
