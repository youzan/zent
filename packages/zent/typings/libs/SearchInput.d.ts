/// <reference types="react" />

declare module 'zent/lib/search-input' {
  interface ISearchInputProps
    extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > {
    className?: string;
    prefix?: string;
    width?: number | string;
    defaultValue?: string;
    value?: string;
    readOnly?: boolean;
    disabled?: boolean;
    placeholder?: string;
    showClear?: boolean;
    addonBefore?: React.ReactNode;
    addonAfter?: React.ReactNode;
    autoFocus?: boolean;
    autoSelect?: boolean;
    initSelectionStart?: number;
    initSelectionEnd?: number;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
  }

  export default class SearchInput extends React.Component<
    ISearchInputProps,
    any
  > {}
}
