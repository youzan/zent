// TypeScript Version: 2.3

/// <reference types="react" />

/// <reference path="./libs/Layout.d.ts" />
/// <reference path="./libs/Icon.d.ts" />

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


