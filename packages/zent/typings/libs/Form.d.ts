/// <reference types="react" />

declare module 'zent/lib/form' {
  interface IFormProps {
    className?: string
    prefix?: string
    horizontal?: boolean
    inline?: boolean
    onSubmit?: Function
    style?: React.CSSProperties
  }

  class Form extends React.Component<IFormProps, any> {}

  namespace Form {
    interface IConnectedFormProps {
      onChange?: (value: any) => void
      onSubmitSuccess?: (result: any) => void
      onSubmitFail?: (error?: any) => void
    }

    interface IZentForm {
      getFormValues: () => any
      getFieldError: (name: string) => any
      setFormPristine: (value: boolean) => void
      setFieldExternalErrors: (error: { key: string, value: string }) => void
      resetFieldsValue: (data: any) => void
      isValid: () => boolean
      isSubmitting: () => boolean
      isValidating: () => boolean
      isFieldTouched: (name: string) => boolean
      isFieldValidating: (name: string) => boolean
    }

    interface IWrappedComponentProps {
      zentForm: IZentForm,
      handleSubmit: (submit: (values: any, zentForm: IZentForm) => any) => any
    }

    function createForm(config?: { formValidations?: any }): (component: React.Component<IWrappedComponentProps|any ,any>) => React.Component<IConnectedFormProps, any>

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
    }

    interface IFieldProps {
      ref?: (ref: any) => void
      name: string
      component: string|React.Component<any, any>
      normalize?: (value: any, previousValue: any, nextValues: any, previousValues: any) => void
      format?: (value: any, previousValue: any, nextValues: any, previousValues: any) => void
      onChange?: (value: any, previousValue: any, nextValues: any, previousValues: any) => void
      onBlur?: (value: any, previousValue: any, nextValues: any, previousValues: any) => void
      onFocus?: React.FocusEventHandler<any>
      validations?: IValidation
      validationErrors?: any
      asyncValidation?: (values: Object, value: any) => Promise<any>
      value: any
    }

    class Field extends React.Component<IFieldProps, any> {}

    interface IContolGroupProps {
      label?: string
      className?: string
      helpDesc?: string
      required?: boolean
    }

    function getControlGroup(component: React.Component<any, any>): React.Component<any, any>
  }

  export default Form
}
