/// <reference types="react" />

declare module 'zent/lib/checkbox' {

  type CheckBoxOnChangeEvent = {
    target: ICheckBoxProps & {
      type: 'checkbox';
      checked: boolean;
    };
    preventDefault: () => void;
    stopPropagation: () => void;
  }

  interface ICheckBoxProps {
    checked?: boolean
    value?: any
    disabled?: boolean
    readOnly?: boolean
    indeterminate?: boolean
    onChange?: (e: CheckBoxOnChangeEvent) => void;
    className?: string
    prefix?: string
  }

  interface ICheckBoxGroupProps {
    value: Array<any>
    isValueEqual?: (value1: any, value2: any) => boolean
    disabled?: boolean
    readOnly?: boolean
    onChange?: (values: Array<any>) => void
    className?: string
    prefix?: string
  }

  class CheckBox extends React.Component<ICheckBoxProps, any> { }

  namespace CheckBox {
    class Group extends React.Component<ICheckBoxGroupProps, any> { }
  }

  export default CheckBox
}
