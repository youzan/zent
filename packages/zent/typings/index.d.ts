// TypeScript Version: 2.3

/// <reference types="react" />

/// <reference path="./lib/Layout.d.ts" />
/// <reference path="./lib/Icon.d.ts" />

declare module 'zent' {
  export * from 'zent/lib/layout'
  export * from 'zent/lib/icon'
  export import Alert = Zent.Alert
  export import Dialog = Zent.Dialog
  export import Loading = Zent.Loading
  export import Notify = Zent.Notify
  export import Pop = Zent.Pop
  export import SweetAlert = Zent.SweetAlert
  export import Button = Zent.Button
  export import CheckBox = Zent.CheckBox
  export import DatePicker = Zent.DatePicker
  export import MonthPicker = Zent.MonthPicker
  export import RangePicker = Zent.RangePicker
  export import Form = Zent.Form
  export import Input = Zent.Input
  export import Radio = Zent.Radio
  export import Select = Zent.Select
  export import Slider = Zent.Slider
  export import Switch = Zent.Switch
  export import Breadcrumb = Zent.Breadcrumb
  export import Menu = Zent.Menu
  export import Pagination = Zent.Pagination
  export import Steps = Zent.Steps
  export import Table = Zent.Table
  export import Tabs = Zent.Tabs
  export import Tree = Zent.Tree
  export import Popover = Zent.Popover
  export import Portal = Zent.Portal
  export import Affix = Zent.Affix
  export import Badge = Zent.Badge
  export import Tag = Zent.Tag
  export import Cascader = Zent.Cascader
  export import ColorPicker = Zent.ColorPicker
  export import CopyButton = Zent.CopyButton
  export import NumberInput = Zent.NumberInput
  export import SearchInput = Zent.SearchInput
  export import previewImage = Zent.previewImage
}

declare namespace Zent {

  type PositionFunction = (anchorBoundingBox: IBoundingBox, containerBoundingBox: IBoundingBox, contentDimension: { width: number, height: number }, options: { cushion: number, anchor: HTMLElement, container: HTMLElement, anchorBoundingBoxViewport: any, containerBoundingBoxViewport: any }) => { getCSSStyle: () => React.CSSProperties, name: string }








  interface IDatePickerCommonProps {
    value?: string | Date
    defaultValue?: string | Date
    onChange?: (value: string | number | Date) => void
    onClick?: (value: string | number | Date) => void
    onOpen?: () => void
    disabled?: boolean
    format?: string
    placeholder?: string
    className?: string
    prefix?: string
    confirmText?: string
  }

  interface IDatePickerProps extends IDatePickerCommonProps {
    showTime?: boolean
    disabledTime?: () => { disabledHour: (value: number) => boolean, disabledMinute: (value: number) => boolean, disabledSecond: (value: number) => boolean }
    disabledDate?: (date: Date) => boolean
    min?: string | number
    max?: string | number
    valueType?: 'number' | 'string' | 'date'
    placeholder?: string
  }

  class DatePicker extends React.Component<IDatePickerProps, any> { }

  type IMonthPickerProps = IDatePickerCommonProps

  class MonthPicker extends React.Component<IMonthPickerProps, any> { }

  type IRangePickerProps = IDatePickerProps

  class RangePicker extends React.Component<IRangePickerProps, any> { }


  interface IRadioProps {
    value: any
    className?: string
    prefix?: string
  }

  class Radio extends React.Component<IRadioProps, any> { }

  namespace Radio {
    interface IGroupProps {
      value: any
      onChange: React.ChangeEventHandler<HTMLInputElement>
      isValueEqual?: (value1: any, value2: any) => boolean
      className?: string
      prefix?: string
    }

    class Group extends React.Component<IGroupProps, any> { }
  }

  interface ISelectTrigger {
    selectedItems?: Array<any>
    extraFilter?: boolean
    open?: boolean
  }

  interface ISelectProps {
    data: Array<any>
    value?: any
    index?: any
    disabled?: boolean
    placeholder?: string
    searchPlaceholder?: string
    emptyText?: string
    trigger?: React.Component<ISelectTrigger, any>
    optionText?: string
    optionValue?: string
    onChange?: (event: { target: { type: any, value: any }, preventDefault: () => void, stopPropagation: () => void }, value: any) => void
    onDelete?: (date: any) => void
    filter?: (item: any) => boolean
    onAsyncFilter?: (keyword: string, callback: (data: any) => void) => void
    onEmptySelected?: (event: React.SyntheticEvent<HTMLSpanElement>, value: any) => void
    onOpen?: () => void
    className?: string
    prefix?: string
  }

  class Select extends React.Component<ISelectProps, any> { }

  interface ISliderProps {
    value: [number, number]
    onChange?: (value: number) => void
    range?: boolean
    min?: number
    max?: number
    step?: number
    withInput?: boolean
    dots?: boolean
    marks?: Object
    disabled?: boolean
    className?: string
    prefix?: string
  }

  class Slider extends React.Component<ISliderProps, any> { }


  interface ISwitchProps {
    checked?: boolean
    onChange?: (checked: boolean) => void
    disabled?: boolean
    checkedText?: string
    uncheckedText?: string
    loading?: boolean
    size?: 'default' | 'small'
    className?: string
    prefix?: string
  }

  class Switch extends React.Component<ISwitchProps, any> { }


  interface IStepsProps {
    type?: 'number' | 'card' | 'breadcrumb'
    current?: number
    status?: 'finish' | 'error' | 'wait'
    className?: string
    prefix?: string
  }

  class Steps extends React.Component<IStepsProps, any> { }

  namespace Steps {
    interface IStepProps {
      title: React.ReactNode
      description?: React.ReactNode
    }

    class Step extends React.Component<IStepProps, any> { }
  }

  interface ITableColumn {
    title: string
    name: string
    width?: number
    textAign?: 'left' | 'right' | 'center'
    isMoney?: boolean
    bodyRender?: (data: any) => React.ReactNode
  }

  interface ITableProps {
    columns: Array<ITableColumn>
    datasets: Array<Object>
    rowKey?: string
    sortBy?: string
    sortType?: 'desc' | 'asc'
    onChange?: (conf: any) => void
    emptyLabel?: string
    selection?: { selectedRowKeys?: Array<string>, onSelect?: (selectedkeys: string, selectedRows: Array<any>, currentRow: number) => void }
    loading?: boolean
    getRowConf?: (data: Object, index: number) => { canSelect: boolean, rowClass: string }
    expandation?: { isExpanded?: boolean, expandRender?: (data: any) => React.ReactNode }
    autoStick?: boolean
    autoScroll?: boolean
    className?: string
    prefix?: string
  }

  class Table extends React.Component<ITableProps, any> { }

  interface ITab {
    tab: string | number
    id: string | number
    disabled?: boolean
  }

  interface ITabsProps {
    activeId: string
    type?: 'normal' | 'card' | 'slider'
    size?: 'normal' | 'huge'
    align?: 'left' | 'right' | 'center'
    onTabChange?: (id: string) => void
    onTabDel?: (id: string) => void
    onTabAdd?: () => void
    candel?: boolean
    canadd?: boolean
    tabs?: Array<ITab>
    className?: string
    prefix?: string
  }

  class Tabs extends React.Component<ITabsProps, any> { }

  interface ITreeData {
    id: number | string
    title: number | string
    children?: Array<ITreeData>
    parendId?: string | number
    expand?: boolean
    isLeaf?: boolean
  }

  interface ITreeOperation {
    name: string
    icon?: string | React.ReactElement<any>
    action: (data: ITreeData) => void
    shouldRender?: (data: ITreeData) => boolean
  }

  interface ITreeProps {
    dataType?: 'tree' | 'plain'
    data: Array<ITreeData>
    render?: (data: ITreeData) => React.ReactNode
    operations?: Array<ITreeOperation>
    foldable?: boolean
    checkable?: boolean
    onCheck?: (data: Array<number | string>) => void
    defaultCheckedKeys?: Array<number | string>
    disabledCheckedKeys?: Array<number | string>
    size?: 'medium' | 'small' | 'large'
    commonStyle?: React.CSSProperties
    expandAll?: boolean
    onExpand?: (data: ITreeData, config: { isExpanded: boolean }) => void
    autoExpandOnSelect?: boolean
    onSelect?: (data: ITreeData, target: HTMLSpanElement) => void
    isRoot?: (data: ITreeData) => boolean
  }

  class Tree extends React.Component<ITreeProps, any> { }



  interface IBoundingBox {
    top: number
    left: number
    right: number
    bottom: number
    width: number
    height: number
  }

  interface IPopoverProps {
    position: PositionFunction
    cushion?: number
    display?: string
    onShow?: () => void
    onClose?: () => void
    onBeforeShow?: () => void
    onBeforeClose?: () => void
    containerSelector?: string
    visible?: boolean
    onVisibleChange?: () => void
    className?: string
    wrapperClassName?: string
    predix?: string
  }

  class Popover extends React.Component<IPopoverProps, any> {}



    namespace Position {
      function create(func: (anchorBoundingBox: IBoundingBox, containerBoundingBox: IBoundingBox, contentDimension: { width: number, height: number }, options: { cushion: number, anchor: HTMLElement, container: HTMLElement, anchorBoundingBoxViewport: any, containerBoundingBoxViewport: any }) => { getCSSStyle: () => React.CSSProperties }): PositionFunction
      const BottomLeft: PositionFunction
      const BottomCenter: PositionFunction
      const BottomRight: PositionFunction
      const LeftTop: PositionFunction
      const LeftCenter: PositionFunction
      const LeftBottom: PositionFunction
      const RightTop: PositionFunction
      const RightCenter: PositionFunction
      const RightBottom: PositionFunction
      const TopLeft: PositionFunction
      const TopCenter: PositionFunction
      const TopRight: PositionFunction
      const AutoBottomLeft: PositionFunction
      const AutoBottomRight: PositionFunction
      const AutoBottomCenter: PositionFunction
      const AutoTopLeft: PositionFunction
      const AutoTopRight: PositionFunction
      const AutoTopCenter: PositionFunction
    }

    interface IWithPopverProps {
      getTriggerNode?: () => HTMLElement
      getContentNode?: () => HTMLElement
      open?: () => void
      close?: () => void
    }

    function withPopover(component: React.Component<any, any>): React.Component<IWithPopverProps, any>
  





  interface ITagProps {
    color?: 'red'|'green'|'yellow'|'blue'|'darkgreen'
    ontline?: boolean
    closable?: boolean
    onClose?: () => void
    className?: string
    prefix?: string
  }

  class Tag extends React.Component<ITagProps, any> {}



  interface ISearchInputProps {
    className?: string
    prefix?: string
    defaultValue?: string
    value?: string
    readOnly?: boolean
    disabled?: boolean
    placeholder?: string
    addonBefore?: React.ReactNode
    addonAfter?: React.ReactNode
    autoFocus?: boolean
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onPressEnter?: React.KeyboardEvent<HTMLInputElement>
  }

  class SearchInput extends React.Component<ISearchInputProps, any> {}
}


