/// <reference types="react" />

declare module 'zent/lib/auto-complete' {
    interface IMenuItem {
        value: string,
        content?: any,
        isGroup?: boolean,
        isDivider?: boolean,
    }

    interface IAutoCompleteProps {
        value?: any,
        initialValue?: any,
        placeholder?: string,
        data?: Array<string | IMenuItem>,
        onChange?: (value: string) => void,
        onSelect?: (value: string) => void,
        onSearch?: (searchText: string) => void,
        filterOption?: (searchText: string, menuItem: IMenuItem) => boolean,
        valueFromOption?: boolean,
        className?: string,
        popupClassName?: string,
        width?: number | string,
    }

    export default class AutoComplete extends React.Component<IAutoCompleteProps, any> { }
}
