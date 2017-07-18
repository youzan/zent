// TypeScript Version: 2.3

/// <reference types="react" />

declare module 'zent' {
  export import Layout = Zent.Layout
  export import Icon = Zent.Icon
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

  namespace Layout {
    interface IRowProps {
      className?: string
      prefix?: string
    }

    export class Row extends React.Component<IRowProps, any> { }

    interface IColProps {
      span: number
      offset?: number
      className?: string
      prefix?: string
    }
  }

  type TIconType = 'summary-o' | 'summary' | 'shop-o' | 'shop' | 'goods-o' | 'goods' | 'order-o' | 'order' | 'customer-o' | 'customer' | 'chart-o' | 'chart' | 'capital-o' | 'capital' | 'casher' | 'marketing' | 'settings-o' | 'settings' | 'youzan-o' | 'youzan' | 'close' | 'close-circle-o' | 'close-circle' | 'message' | 'message-o' | 'bell' | 'bell-o' | 'calendar' | 'calendar-o' | 'search' | 'customer-service' | 'feedback' | 'error-circle-o' | 'error-circle' | 'check-circle-o' | 'check-circle' | 'help-circle-o' | 'help-circle' | 'clock-o' | 'clock' | 'countdown' | 'download' | 'share' | 'shop-decorate' | 'shop-template' | 'gift' | 'caret-up' | 'caret-down' | 'arrow-up' | 'arrow-down' | 'right' | 'plus' | 'star-o' | 'star' | 'check' | 'info-circle-o' | 'info-circle' | 'warning-o' | 'warning' | 'lock' | 'unlock'

  interface IIconProps {
    type: TIconType
    className?: string
  }

  export class Icon extends React.Component<IIconProps, any> { }

  type TAlertType = 'info' | 'warning' | 'danger'
  type TAlertSize = 'normal' | 'large'

  interface IAlertProps {
    type: TAlertType
    size?: TAlertSize
    rounded?: boolean
    closable?: boolean
    onClose?: () => void
    className?: string
    prefix?: string
  }

  export class Alert extends React.Component<IAlertProps, any> { }

  interface IDialogProps {
    title?: React.ReactNode
    children?: React.ReactNode
    footer?: React.ReactNode
    visible?: boolean
    closeBtn?: boolean
    onClose?: () => void
    mask?: boolean
    maskClosable?: boolean
    className?: string
    prefix?: string
    style?: React.CSSProperties
  }

  interface IOpenDialogOption extends IDialogProps {
    dialogId: string
  }

  interface ICloseDialogOption {
    triggerOnClose: boolean
  }

  class Dialog extends React.Component<IDialogProps, any> {
    static openDialog(option: IOpenDialogOption): (close: boolean) => void
    static closeDialog(dialogId: string, option: ICloseDialogOption): void
  }

  interface ILoadingProps {
    show?: boolean
    static?: boolean
    height?: number
    zIndex?: number
    className?: string
    containerClass?: string
    prefix?: string
  }

  class Loading extends React.Component<ILoadingProps, any> {
    static on(): void
    static off(): void
  }

  interface INotifyProps {
    text?: any
    duration?: number
    callback?: () => void
  }

  class Notify extends React.Component<INotifyProps, any> {
    static success(): number
    static error(): number
    static clear(id: number): void
  }

  interface IPopProps {
    content: React.ReactNode
    trigger?: 'none' | 'click' | 'hover' | 'focus'
    position?: string
    centerArrow?: boolean
    header: React.ReactNode
    block?: boolean
    onShow?: () => void
    onClose?: () => void
    onBeforeShow?: () => void
    onBeforeClose?: () => void
    onConfirm?: () => void
    onCancel?: () => void
    confirmText?: string
    cancelText?: string
    type?: 'primary' | 'default' | 'danger' | 'success'
    visible?: boolean
    onVisibleChange?: () => void
    className?: string
    wrapperClassName?: string
    prefix?: string
    closeOnClickOutside?: boolean
    isOutside?: (target: HTMLElement, node: { contentNode: HTMLElement, triggerNode: HTMLElement }) => boolean
    mouseEnterDelay?: number
    mouseLeaveDelay?: number
  }

  class Pop extends React.Component<IPopProps, any> { }

  namespace SweetAlert {
    interface IAlertOption {
      content: React.ReactNode
      type: 'info' | 'success' | 'error' | 'warning'
      title?: React.ReactNode
      onConfirm?: () => void | Promise<any>
      confirmText?: string
      confirmType?: 'default' | 'primary' | 'danger' | 'success'
      className?: string
      prefix?: string
    }

    interface IConfirmOption extends IAlertOption {
      onCancel?: () => void
      cancelText?: string
    }

    function alert(option: IAlertOption): () => void
    function confirm(option: IConfirmOption): () => void
  }

  interface IButtonProps {
    type?: 'default' | 'primary' | 'danger' | 'success'
    size?: 'medium' | 'large' | 'small'
    htmlType?: 'button' | 'submit' | 'reset'
    block?: boolean
    disabled?: boolean
    loading?: boolean
    outline?: boolean
    bordered?: boolean
    component?: (() => string) | string
    href?: string
    target?: string
    className?: string
    prefix?: string
  }

  class Button extends React.Component<IButtonProps, any> { }

  interface ICheckBoxProps {
    checked?: boolean
    value?: any
    disabled?: boolean
    indeterminate?: boolean
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    className?: string
    prefix?: string
  }

  interface ICheckBoxGroupProps {
    value: Array<any>
    isValueEqual?: (value1: any, value2: any) => boolean
    disabled?: boolean
    onChange?: (values: Array<any>) => void
    className?: string
    prefix?: string
  }

  class CheckBox extends React.Component<ICheckBoxProps, any> { }

  namespace CheckBox {
    class Group extends React.Component<ICheckBoxGroupProps, any> { }
  }

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

  interface IFormProps {
    className?: string
    prefix?: string
    horizontal?: boolean
    inline?: boolean
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    style?: React.CSSProperties
  }

  class Form extends React.Component<IFormProps, any> {}

  namespace Form {
    interface IConnectedFormProps {
      onChange?: (value: any) => void
      onSubmitSuccess?: (result: any) => void
      // onSubmitFail?: (error?: SubmissionError) => void
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
      asyncValidation?: (values: Object, values: any) => Promise<any>
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

  interface IInputProps {
    className?: string
    prefix?: string
    type?: 'text' | 'number' | 'password' | 'textarea'
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

  class Input extends React.Component<IInputProps, any> {
    focus()
  }

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

  interface IBreadcrumbProps {
    breads?: Array<React.ReactNode>
    className?: string
    prefix?: string
  }

  class Breadcrumb extends React.Component<IBreadcrumbProps, any> { }

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

  namespace Breadcrumb {
    interface IItemProps {
      className?: string
      name: React.ReactNode
      href: string
    }

    class Item extends React.Component<IItemProps, any> { }
  }

  interface IMenuProps {
    onClick?: (event: React.SyntheticEvent<HTMLLIElement> | React.SyntheticEvent<HTMLDivElement>, index: number) => void
    className?: string
    prefix?: string
  }

  class Menu extends React.Component<IMenuProps, any> { }

  namespace Menu {
    interface IMenuItemProps {
      key?: string
      disabled?: boolean
      className?: string
      prefix?: string
    }

    class MenuItem extends React.Component<MenuItem, any> { }

    interface ISubMenuProps {
      title: string
      disabled?: boolean
      overlayClassName?: string
      className?: string
      prefix?: string
    }

    class SubMenu extends React.Component<ISubMenuProps, any> { }
  }

  interface IPaginationProps {
    current: number
    totalItem: number
    pageSize?: number
    maxPageToShow?: number
    onChange?: (value: number) => void
    className?: string
    prefix?: string
  }

  class Pagination extends React.Component<IPaginationProps, any> { }

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


  interface IPortalProps {
    children: React.ReactChild
    selector?: string | HTMLElement
    visible?: boolean
    className?: string
    css?: React.CSSProperties
    prefix?: string
  }

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

  namespace Popover {
    namespace Trigger {
      interface IBaseProps {
        getTriggerNode?: () => HTMLElement
        getContentNode?: () => HTMLElement
        open?: () => void
        close?: () => void
        contentVisible?: boolean
        onTriggerRefChange?: () => React.ReactInstance
      }

      interface IClickProps extends IBaseProps {
        autoClose?: boolean
        isOutside?: (target: HTMLElement, node: { contentNode: HTMLElement, triggerNode: HTMLElement }) => boolean
      }

      class Click extends React.Component<IClickProps, any> {}

      interface IHoverProps extends IBaseProps {
        showDelay?: number
        hideDelay?: number
        isOutside?: (target: HTMLElement, node: { contentNode: HTMLElement, triggerNode: HTMLElement }) => boolean
      }

      class Hover extends React.Component<IHoverProps, any> {}

      type IFocusProps = IBaseProps

      class Focus extends React.Component<IFocusProps, any> {}
    }

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
  }

  class Portal extends React.Component<IPortalProps, any> { }

  namespace Portal {
    interface IEscPortalProps extends IPortalProps {
      onClose: () => void
    }

    function withESCToClose(component: Portal): React.Component<IEscPortalProps, any>

    type INonScrollablePortalProps = IPortalProps

    function withNonScrollable(component: Portal): React.Component<INonScrollablePortalProps, any>
  }

  interface IAffixProps {
    offsetTop?: number
    offsetBottom?: number
    onPin?: () => void
    onUnpin?: () => void
    zindex?: number
    className?: string
    placeHoldClassName?: string
    prefix?: string
  }

  class Affix extends React.Component<IAffixProps, any> {}

  interface IBadgeProps {
    count?: number
    maxCount?: number
    dot?: boolean
    showZero?: boolean
    className?: string
    prefix?: string
  }

  class Badge extends React.Component<IBadgeProps, any> {}

  interface ITagProps {
    color?: 'red'|'green'|'yellow'|'blue'|'darkgreen'
    ontline?: boolean
    closable?: boolean
    onClose?: () => void
    className?: string
    prefix?: string
  }

  class Tag extends React.Component<ITagProps, any> {}

  interface ICascaderProps {
    value?: Array<any>
    options?: Array<any>
    title?: Array<any>
    onChange?: (any) => any
    loadMore?: () => Promise<any>
    changeOnSelect?: boolean
    placeholder?: string
    prefix?: string
    className?: string
    popClassName?: string
  }

  class Cascader extends React.Component<ICascaderProps, any> {}

  interface IColorPickerProps {
    color: string
    showAlpha?: boolean
    type?: 'default'|'simple'
    presetColors?: Array<string>
    onChange?: (string) => any
    className?: string
    wrapperClassName?: string
    prefix?: string
  }

  class ColorPicker extends React.Component<IColorPickerProps, any> {}

  namespace ColorPicker {
    interface IColorBoardProps {
      color: string
      showAlpha?: boolean
      onChange?: (string) => any
      className?: string
      prefix?: string
    }

    class ColorBoard extends React.Component<IColorBoardProps, any> {}
  }

  interface ICopyButtonProps {
    text: string
    onCopySuccess?: Function | string
    onCopyError?: Function | string
  }

  class CopyButton extends React.Component<ICopyButtonProps, any> {}

  interface INumberInputProps {
    value?: number
    onChange?: (number) => any
    showStepper?: boolean
    decimal?: number
    min?: number
    max?: number
    placeholder?: string
    disabled?: boolean
    className?: string
    prefix?: string
  }

  class NumberInput extends React.Component<INumberInputProps, any> {}

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

  interface IPreviewImageConfig {
    images: Array<string>
    index?: number
    showRotateBtn?: boolean
    className?: string
    prefix?: string
  }

  function previewImage(config: IPreviewImageConfig): any
}


