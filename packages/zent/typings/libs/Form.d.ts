/// <reference types="react" />
/// <reference path="./Input.d.ts" />
/// <reference path="./Select.d.ts" />

declare module 'zent/lib/form' {

  import Input from 'zent/lib/input';
  import Select from 'zent/lib/select';

  namespace FieldFeatureBase {
    // 类型覆盖时使用
    export interface INativeAttributesBlock {
      onBlur
      onChange
      onFocus
      name
      value
    }

    export interface UnknownProps {
      isDirty
      isTouched
      isPristine
      isValid
      isActive
      isAsyncValidated
      error
      errors
      validationError
      validationErrors
      validations
      validateOnChange
      validateOnBlur
      clearErrorOnFocus
      asyncValidation
      normalize
      format
      fields
      relatedFields
      submitFailed
      submitSuccess
    }

    export type ReplaceBlockList<SOURCE> = {
      [key in keyof SOURCE]: key extends (keyof INativeAttributesBlock) ? IFieldPropsBase[key] : SOURCE[key]
    } & IFieldPropsBase

    export interface IValidation {
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

    export type TransformInvoke = (value: any, previousValue: any, nextValues: any, previousValues: any) => void

    export interface IFieldPropsBase {
      ref?: (ref: any) => void
      name: string
      value: any
      normalize?: TransformInvoke
      format?: TransformInvoke
      onChange?: TransformInvoke
      onBlur?: TransformInvoke
      onFocus?: React.FocusEventHandler<any>
      validations?: IValidation
      validationErrors?: any
      validateOnChange?: boolean
      validateOnBlur?: boolean
      asyncValidation?: (values: Object, value: any) => Promise<any>
      displayError?: boolean
      relatedFields?: Array<any>
    }

  }

  namespace FieldNS {
    import base = FieldFeatureBase;

    export interface Base extends base.IFieldPropsBase {
      component: string | React.Component<any, any>
    }

    export interface Input extends Partial<base.UnknownProps>, Input.IProps { }
    export interface Select extends Partial<base.UnknownProps>, Select.IProps { }
  }

  namespace Form {

    import base = FieldFeatureBase;
    import FieldProps = FieldNS;
    import IFieldProps = FieldNS.Base;

    export interface IConnectedFormProps {
      onChange?: (value: any) => void
      onSubmitSuccess?: (result: any) => void
      onSubmitFail?: (error?: any) => void
      scrollToError?: boolean
    }

    export interface IZentForm {
      getFormValues: () => any
      getFieldError: (name: string) => any
      setFormDirty: (isDirty: boolean) => any
      setFieldExternalErrors: (error: { key: string, value: string }) => void
      setFieldsValue: (data: any) => any
      resetFieldsValue: (data?: any) => void
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

    export interface IWrappedComponentProps {
      zentForm: IZentForm
      handleSubmit: (submit: (values: any, zentForm: IZentForm) => any) => any
    }

    interface Constructor<T> {
      new(...args: any[]): T;
    }

    type IWrappedComponentGenerator = <T = any, S = any>(component: Constructor<React.Component<T, S>>) => Constructor<React.Component<IConnectedFormProps & T, S>>;

    export function createForm(config?: { formValidations?: any }): IWrappedComponentGenerator;

    export interface IContolGroupProps {
      label?: string
      className?: string
      helpDesc?: string
      required?: boolean
    }

    export function getControlGroup(component: Constructor<React.Component<any, any>>): React.Component<any, any>

    export interface IFormSectionProps {
      name: string
      component?: React.ReactNode
    }

    export interface IFieldArrayProps {
      name: string
      value?: Array<any>
      component: React.ReactNode
    }

    export class Field extends React.Component<IFieldProps, any> { }

    export class FormSection extends React.PureComponent<IFormSectionProps, any> { }

    export class FieldArray extends React.Component<IFieldArrayProps, any> { }

    export class InputField extends React.Component<FieldProps.Input, any> { }
    export class SelectField extends React.Component<FieldProps.Select, any> { }

    export interface IFormInputFieldProps extends base.ReplaceBlockList<Input.IProps>, IContolGroupProps { }
    export interface IFormSelectFieldProps extends base.ReplaceBlockList<Select.IProps>, IContolGroupProps { }

    export class FormInputField extends React.Component<IFormInputFieldProps, any> { }
    export class FormSelectField extends React.Component<IFormSelectFieldProps, any> { }

    export interface IProps {
      className?: string
      prefix?: string
      vertical?: boolean
      horizontal?: boolean
      inline?: boolean
      onSubmit?: React.FormEventHandler<HTMLFormElement>
      style?: React.CSSProperties
      disableEnterSubmit?: boolean
    }

    export {
      FieldProps,
      IFieldProps
    }

  }

  class Form extends React.Component<Form.IProps, any> { }

  export default Form
}
