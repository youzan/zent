import * as React from 'react';
import { Component, createRef } from 'react';
import { Form, IFormModel, ModelType, IModels } from 'formulr';
import { FormField } from './Field';
import { FieldArray } from './FieldArray';
import { FieldSet } from './FieldSet';
import globalValidations from './validationRules';
import { Validations, hasError } from './utils';
import { FormContext } from './context';
import SubmissionError from './SubmissionError';

export interface IZentForm<T> {
  getFormValues(): T;
  getFieldError(name: string): any;
  setFormDirty(isDirty: boolean): void;
  getFormDirty(): boolean;
  setFieldExternalErrors(): void;
  setFieldsValue(values: any): void;
  resetFieldsValue(values: any): void;
  initialize(): void;
  isValid(): boolean;
  isSubmitting(): boolean;
  isValidating(): boolean;
  isFieldDirty(): boolean;
  isFormAsyncValidated(): boolean;
  validateForm(
    forceValidate: boolean,
    callback: () => void,
    relatedFields: string[]
  ): void;
  asyncValidateForm(resolve: () => void, reject: () => void): void;
  isFormSubmitFail(): boolean;
  isFormSubmitSuccess(): boolean;
  updateFormSubmitStatus(submitSuccess: boolean): void;
}

type IForm = {
  getForm(): Form;
} & Component<IZentFormHOCProps<unknown>, IZentFormHOCState>;

function isValid(control: IModels<unknown>) {
  if (hasError(control.error as { [key: string]: unknown })) {
    return false;
  }
  if (control.type !== ModelType.Field) {
    for (const child of Object.values(control.controls)) {
      if (!isValid(child)) {
        return false;
      }
    }
  }
  return true;
}

function makeZentForm<T>(comp: IForm): IZentForm<T> {
  const getForm = comp.getForm;
  return {
    getFormValues() {
      return getForm()
        .getModel()
        .getRawValue();
    },
    getFieldError(name) {
      const model = getForm().getModel();
      const control = model.controls[name];
      return control && control.error;
    },
    setFormDirty(isDirty: boolean) {
      const form = getForm();
      form.isDirty = isDirty;
    },
    getFormDirty() {
      return getForm().isDirty;
    },
    setFieldExternalErrors() {
      // notImplemented('setFieldExternalErrors');
    },
    setFieldsValue<T>(values: T) {
      getForm().setValue(values as any);
    },
    resetFieldsValue() {
      // notImplemented('resetFieldsValue');
    },
    initialize() {
      // notImplemented('initialize');
    },
    isValid() {
      const form = getForm().getModel();
      return isValid(form as IModels<unknown>);
    },
    isSubmitting() {
      return false;
    },
    isValidating() {
      return getForm().validationState.validating.size > 0;
    },
    isFieldDirty() {
      return false;
    },
    isFormAsyncValidated() {
      return false;
    },
    validateForm() {
      getForm()
        .getModel()
        .verify({
          source: 'manual',
        });
    },
    asyncValidateForm() {
      getForm()
        .getModel()
        .verify({
          source: 'async',
        });
    },
    isFormSubmitFail() {
      return comp.state.submitFail;
    },
    isFormSubmitSuccess() {
      return comp.state.submitSuccess;
    },
    updateFormSubmitStatus(submitSuccess) {
      comp.setState({
        submitSuccess,
        submitFail: !submitSuccess,
      });
    },
  };
}

export interface ICreateFormOption {
  validations: Validations<unknown>;
}

export interface IZentFormHOCProps<T> {
  onSubmit?: (value: T, zentForm: IZentForm<T>) => any;
  onSubmitSuccess?: (result: any) => void;
  onSubmitFail?: (error: any) => void;
  scrollToError?: boolean;
}

export interface IZentFormHOCState {
  isFormValid: boolean;
  isSubmitting: boolean;
  submitFail: boolean;
  submitSuccess: boolean;
}

export function createForm<Props>(option: ICreateFormOption) {
  const validations: Validations<unknown> = {
    ...globalValidations,
    ...option.validations,
  };
  return (
    Child: React.ComponentType<Props>
  ): React.ComponentClass<Props, IZentFormHOCState> => {
    const childName = Child.displayName || Child.name || 'Component';
    return class ZentFormHOC<T> extends Component<
      Props & IZentFormHOCProps<T>,
      IZentFormHOCState
    > {
      static displayName = `ZentForm(${childName})`;

      private readonly children: Array<FormField<unknown, {}, unknown> | FieldArray<unknown, {}> | FieldSet> = [];
      private readonly ctx = {
        validations,
        children: this.children,
      };
      readonly formRef = createRef<Form>();
      private submitPromise: Promise<unknown> | null = null;
      zentForm = makeZentForm(this);

      state = {
        isFormValid: true,
        isSubmitting: false,
        submitFail: false,
        submitSuccess: false,
      };

      getForm = () => {
        const form = this.formRef.current;
        if (!form) {
          throw new Error(
            'Fatal, this looks like a bug of zent, please file an issue'
          );
        }
        return form;
      };

      private getModel = () => {
        return this.getForm().getModel();
      }

      scrollToError = () => {
        for (const child of this.children) {
          const model = child.getModel();
          if (hasError(model)) {
            child.scrollTo();
            return;
          }
        }
      }

      updateFormSubmitStatus = (submitSuccess: boolean) => {
        this.setState({
          submitFail: !submitSuccess,
          submitSuccess,
        });
      };

      doSubmit = (submit: (values: unknown, zentForm: IZentForm<unknown>) => unknown) => (e: React.FormEvent<HTMLFormElement>) => {
        const { scrollToError } = this.props;
        if (typeof e.preventDefault === 'function') {
          e.preventDefault();
        }
        if (this.submitPromise) {
          return;
        }
        const { onSubmitFail, onSubmitSuccess } = this.props;
        if (this.zentForm.isValidating()) {
          this.updateFormSubmitStatus(false);
          const error = new SubmissionError({
            isValidating: true,
          });
          if (onSubmitFail) {
            return onSubmitFail(error);
          }
          return;
        }
        this.getModel().verify({
          source: 'submit',
        });
        if (!this.zentForm.isValid()) {
          this.updateFormSubmitStatus(false);
          scrollToError && this.scrollToError();
          const error = new SubmissionError({
            isValid: false,
          });
          if (onSubmitFail) {
            return onSubmitFail(error);
          }
          return;
        }
        this.setState({
          isSubmitting: true,
        });
        this.submitPromise = new Promise<unknown>((resolve, reject) => {
          try {
            resolve(submit(this.zentForm.getFormValues(), this.zentForm));
          } catch (error) {
            reject(error);
          }
        }).then(
          result => {
            this.submitPromise = null;
            this.setState({
              isSubmitting: false,
              submitFail: false,
              submitSuccess: true,
            });
            onSubmitSuccess && onSubmitSuccess(result);
          },
          error => {
            this.submitPromise = null;
            this.setState({
              isSubmitting: false,
              submitFail: true,
              submitSuccess: false,
            });
            if (onSubmitFail) {
              onSubmitFail(error);
            } else {
              // throw error;
            }
          },
        );
      };

      handleSubmit = (e: React.FormEvent<HTMLFormElement> | (() => Promise<unknown> | void)) => {
        if (!this.formRef.current) {
          return;
        }
        const { onSubmit } = this.props;
        if (typeof e === 'function') {
          return this.doSubmit(e);
        } else if (onSubmit) {
          return this.doSubmit(onSubmit)(e);
        } else {
          throw new Error('You must either pass handleSubmit() an onSubmit function or pass onSubmit as a prop');
        }
      };


      componentWillUnmount() {
        this.setState = () => {};
      }

      render() {
        const {
          onSubmit,
          onSubmitFail,
          onSubmitSuccess,
          scrollToError,
          children,
          ...otherProps
        } = this.props;
        return (
          <FormContext.Provider value={this.ctx}>
            <Form ref={this.formRef}>
              <Child {...otherProps as Props}>{children}</Child>
            </Form>
          </FormContext.Provider>
        );
      }
    };
  };
}
