/// <reference types="react" />

declare module 'zent/lib/auto-complete' {
  interface IMenuItem {
    value: any;
    content?: React.ReactNode;
    isGroup?: boolean;
    isDivider?: boolean;
    searchContent?: string;
    icon?:string;
    disabled?:boolean;
    active?:boolean | (() => boolean);
  }

  interface IAutoCompleteProps {
    value?: any;
    initialValue?: any;
    placeholder?: string;
    data?: Array<string | number | IMenuItem>;
    onChange?: (value: string) => void;
    onSelect?: (value: string) => void;
    onSearch?: (searchText: string) => void;
    filterOption?: (searchText: string, menuItem: IMenuItem) => boolean;
    valueFromOption?: boolean;
    className?: string;
    popupClassName?: string;
    width?: number | string;
  }

  export default class AutoComplete extends React.Component<IAutoCompleteProps, any> {}
}
