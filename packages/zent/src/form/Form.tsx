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
  BasicModel,
  ValidateOption,
  createAsyncValidator,
  isAsyncValidator,
} from 'formulr';
import memorize from '../utils/memorize-one';
import { FormContext, IFormChild, IZentFormContext } from './context';
import { ZentForm, useForm } from './ZentForm';
import scroll from '../utils/scroll';
import { CombineErrors } from './CombineErrors';
import { ValidateOccasion, TouchWhen } from './shared';

export {
  IRenderError,
  IFormFieldViewDrivenProps,
  IFormFieldModelDrivenProps,
  IFormFieldModelProps,
  isViewDrivenProps,
  ValidateOccasion,
  IFormFieldPropsBase,
  IFormFieldProps,
  IFormComponentProps,
  IFormFieldChildProps,
} from './shared';

function makeContext(
  disabled: boolean,
  children: IFormChild[]
): IZentFormContext {
  return {
    disabled,
    children,
  };
}

export interface IFormProps<
  T extends Record<string, BasicModel<unknown>> = any
>
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    'onSubmit' | 'dangerouslySetInnerHTML'
  > {
  layout: 'horizontal' | 'vertical';
  /**
   * `useForm`得到的`model`
   */
  form: ZentForm<T>;
  disabled?: boolean;
  scrollToError?: boolean;
  /**
   * 表单提交，`form.submit`或者原生的`DOM`触发的`submit`事件都会触发`onSubmit`
   */
  onSubmit?: (form: ZentForm<T>, e?: React.SyntheticEvent) => void;
  onSubmitFail?: (e: unknown) => void;
  onSubmitSuccess?: () => void;
  disableEnterSubmit?: boolean;
}

export class Form<
  T extends Record<string, BasicModel<unknown>> = any
> extends React.Component<IFormProps<T>> {
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
  static ValidateOption = ValidateOption;
  static createAsyncValidator = createAsyncValidator;
  static isAsyncValidator = isAsyncValidator;
  static ValidateOccasion = ValidateOccasion;
  static TouchWhen = TouchWhen;

  readonly formRef = React.createRef<HTMLFormElement>();

  private readonly children: IFormChild[] = [];
  private getContext = memorize(makeContext);
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
    try {
      await form.validate(
        ValidateOption.IncludeAsync |
          ValidateOption.IncludeChildrenRecursively |
          ValidateOption.IncludeUntouched
      );
      if (!form.isValid()) {
        scrollToError && this.scrollToFirstError();
        return;
      }
      await onSubmit(form, e);
      onSubmitSuccess && onSubmitSuccess();
      form.submitSuccess();
    } catch (error) {
      onSubmitFail && onSubmitFail(error);
      form.submitError(error);
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

  private listenEvents() {
    const { form } = this.props;
    this.subscription = form.submit$.subscribe(this.submitListener);
  }

  private removeEventListeners() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  componentDidMount() {
    this.listenEvents();
  }

  componentDidUpdate(prevProps: IFormProps<T>) {
    if (prevProps.form !== this.props.form) {
      this.removeEventListeners();
      this.listenEvents();
    }
  }

  componentWillUnmount() {
    this.removeEventListeners();
  }

  render() {
    const {
      children,
      layout = 'vertical',
      className,
      form,
      onSubmit,
      disabled = false,
      scrollToError,
      ...props
    } = this.props;
    const ctx = this.getContext(disabled, this.children);
    return (
      <FormContext.Provider value={ctx}>
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
      </FormContext.Provider>
    );
  }
}
