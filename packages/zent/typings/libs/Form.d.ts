/// <reference types="react" />

import component from "pages/goods/edit/fields/goods-quota-field/component";

declare module 'zent/lib/form' {
  interface IFormProps {
    className?: string
    prefix?: string
    vertical?: boolean
    horizontal?: boolean
    inline?: boolean
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    style?: React.CSSProperties
    disableEnterSubmit?: boolean
  }

  class Form extends React.Component<IFormProps, any> {}

  namespace Form {
    interface IConnectedFormProps {
      onChange?: (value: any) => void
      onSubmitSuccess?: (result: any) => void
      onSubmitFail?: (error?: any) => void
      scrollToError?: boolean
      [propsName: string]: any;
    }

    interface IZentForm {
      getFormValues: () => any
      getFieldError: (name: string) => any
      setFormDirty: (isDirty: boolean) => any
      setFieldExternalErrors: (error: { key: string, value: string }) => void
      setFieldsValue: (data: any) => any
      resetFieldsValue: (data: any) => void
      initialize: (data: any) => void
      isValid: () => boolean
      isSubmitting: () => boolean
      isValidating: () => boolean
      isFieldDirty: (name: string) => boolean
      isFormAsyncValidated: () => boolean
      validateForm: (forceValidate: boolean, callback: Function, relatedFields: Array<any>) => any
      asyncValidateForm: (resolve: Function, reject: Function) => any
      setFormPristine: (value: boolean) => void
      isFormSubmitFail: () => boolean
      isFormSubmitSuccess: () => boolean
      isFieldTouched: (name: string) => boolean
      isFieldValidating: (name: string) => boolean
      updateFormSubmitStatus: (submitSuccess: boolean) => any
    }

    interface IWrappedComponentProps {
      zentForm: IZentForm,
      handleSubmit: (submit: (values: any, zentForm: IZentForm) => any) => any
    }

    function createForm(config?: { formValidations?: any }): (component: React.ComponentClass<IWrappedComponentProps|any ,any> |  React.SFC) => React.ComponentClass<IWrappedComponentProps|any ,any>

    interface IValidation {
      required?: boolean
      isExisty?: boolean
      matchRegex?: RegExp
      isUndefined?: boolean
      isEmptyString?: boolean
      isEmail?: boolean
      isUrl?: boolean
      isTrue?: boolean
      isFalse?: boolean
      isNumeric?: boolean
      isInt?: boolean
      isFloat?: boolean
      isLength?: boolean
      equals?: any
      equalsField?: string
      maxLength?: number
      minLength?: number
      [propName: string]: any
    }

    interface IFieldProps {
      ref?: (ref: any) => void
      name: string
      label?: string
      component: string|React.ComponentClass<any, any> | React.SFC
      value: any
      normalize?: (value: any, previousValue: any, nextValues: any, previousValues: any) => void
      format?: (value: any, previousValue: any, nextValues: any, previousValues: any) => void
      onChange?: (value: any, previousValue: any, nextValues: any, previousValues: any) => void
      onBlur?: (value: any, previousValue: any, nextValues: any, previousValues: any) => void
      onFocus?: React.FocusEventHandler<any>
      validations?: IValidation
      validationErrors?: any
      validateOnChange?: boolean
      validateOnBlur?: boolean
      asyncValidation?: (values: Object, value: any) => Promise<any>
      displayError?: boolean
      required?: boolean
      relatedFields?: Array<any>
      [propName: string]: any 
    }

    interface IFormSectionProps {
      name: string
      component?: React.ReactNode,
    }

    interface IFieldArrayProps {
      name: string
      value?: Array<any>
      component: React.ReactNode,
    }

    class Field extends React.Component<IFieldProps, any> {}

    class FormSection extends React.PureComponent<IFormSectionProps, any> {}

    class FieldArray extends React.Component<IFieldArrayProps, any> {}

    interface IContolGroupProps {
      label?: string
      className?: string
      helpDesc?: string
      required?: boolean
    }

    function getControlGroup(component: React.Component<any, any> | React.SFC<P>): React.ComponentClass<any, any> | React.SFC<P>
  }

  export default Form
}
