// TypeScript Version: 2.3

/// <reference types="react" />

import * as React from "react";

export = zent;
export as namespace zent;

declare namespace zent {

  interface IAffixProps {
    offsetTop?: number
    offsetBottom?: number
    onPin?: Function
    onUnpin?: Function
    zindex?: number
    className?: string
    placeHoldClassName?: string
    prefix?: string
  }

  class Affix extends React.Component<IAffixProps, any> {}

  interface IAlertProps {
    type: 'info' | 'warning' | 'danger'
    size?: 'normal' | 'large'
    rounded?: boolean
    closable?: boolean
    onClose?: () => void
    className?: string
    prefix?: string
  }

  class Alert extends React.Component<IAlertProps, any> { }


  interface _IMenuItem {
    value: string,
    content?: any,
    isGroup?: boolean,
    isDivider?: boolean,
  }

  type IMenuItem = _IMenuItem | string;

  interface IAutoCompleteProps {
    value?: any,
    initialValue?: any,
    placeholder?: string,
    data?: Array<IMenuItem>,
    onChange?: (value: string) => void,
    onSelect?: (value: string) => void,
    onSearch?: (searchText: string) => void,
    filterOption?: (searchText: string, menuItem: IMenuItem) => boolean,
    valueFromOptions?: boolean,
    className?: string,
    popupClassName?: string,
    width?: number | string,
  }

  class AutoComplete extends React.Component<IAutoCompleteProps, any> { }

  interface IAvatarProps {
    shape?: 'circle' | 'square'
    size?: 'small' | 'default' | 'large' | number
    icon?: string
    src?: string
    children?: string
    bordered?: boolean
    style?: React.CSSProperties
    className?: string
    prefix?: string
  }

  class Avatar extends React.Component<IAvatarProps, any> {}

  interface IBadgeProps {
    count?: number
    maxCount?: number
    dot?: boolean
    showZero?: boolean
    className?: string
    prefix?: string
  }

  class Badge extends React.Component<IBadgeProps, any> {}

  interface IBlockHeaderProps {
    className?: string
    title: string
    tooltip?: React.ReactNode
    content?: React.ReactNode,
    childAlign?: string,
    position?: string,
    prefix?: string
  }

  class BlockHeader extends React.Component<IBlockHeaderProps, any> {}

  interface Bread extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    name?: React.ReactNode;
    href?: string;
  }

  interface IBreadcrumbProps {
    breads?: Array<Bread>
    className?: string
    prefix?: string
  }

  class Breadcrumb extends React.Component<IBreadcrumbProps, any> { }

  namespace Breadcrumb {
    class Item extends React.Component<Bread, any> { }
  }

  interface IButtonProps {
    type?: 'default' | 'primary' | 'danger' | 'success'
    size?: 'medium' | 'large' | 'small'
    htmlType?: 'button' | 'submit' | 'reset'
    icon?: TIconType
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
    onClick?: React.UIEventHandler<HTMLButtonElement>
  }

  class Button extends React.Component<IButtonProps, null> { }

  namespace Button {
    interface IGroup extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
      style?: React.CSSProperties;
      className?: string;
      prefix?: string;
    }
    class Group extends React.Component<IGroup, null> { }
  }

  interface ICardProps {
    title?: React.ReactNode,
    action?: React.ReactNode,
    style?: React.CSSProperties,
    bodyStyle?: React.CSSProperties,
    loading?: boolean
    className?: string,
    prefix?: string,
    type?: 'normal' | 'nested',
  }

  class Card extends React.Component<ICardProps, any> {}

  interface ICascaderProps {
    type?: 'tabs' | 'menu'
    value?: Array<any>
    options?: Array<any>
    title?: Array<any>
    onChange?: Function
    loadMore?: (item: any, stage: number) => Promise<any>
    changeOnSelect?: boolean
    placeholder?: string
    prefix?: string
    className?: string
    popClassName?: string
  }

  class Cascader extends React.Component<ICascaderProps, any> {}

  interface ICheckBoxProps {
    checked?: boolean
    value?: any
    disabled?: boolean
    readOnly?: boolean
    indeterminate?: boolean
    onChange?: React.ChangeEventHandler<HTMLInputElement>
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

  class Checkbox extends React.Component<ICheckBoxProps, any> { }

  namespace Checkbox {
    class Group extends React.Component<ICheckBoxGroupProps, any> { }
  }


  interface ICollapseProps {
    activeKey: string | string[]
    onChange: (value: string|string[]) => any
    accordion?: boolean
    bordered?: boolean
    className?: string
    prefix?: string
  }

  class Collapse extends React.Component<ICollapseProps, any> {}

  interface IColorPickerProps {
    color: string
    showAlpha?: boolean
    type?: 'default'|'simple'
    presetColors?: Array<string>
    onChange?: (value: string) => any
    className?: string
    wrapperClassName?: string
    prefix?: string
  }

  namespace Collapse {
    interface IPanelProps {
      key: string;
      title: string;
      disabled?: boolean;
      showArrow?: boolean;
      style?: React.CSSProperties;
      className?: string;
      prefix?: string;
    }
    class Panel extends React.Component<IPanelProps, null> {}
  }

  class ColorPicker extends React.Component<IColorPickerProps, any> {}

  namespace ColorPicker {
    interface IColorBoardProps {
      color: string
      showAlpha?: boolean
      onChange?: (value: string) => any
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

  interface IDateRangeQuickPickerProps {
    prefix?: string
    className?: string
    onChange: Function
    value?: [string, string] | [number, number]
    valueType?: 'string' | 'number'
    format?: string
    chooseDays?: number
    preset?: Array<any>
    min?: string|number|Date
    max?: string|number|Date
  }

  class DateRangeQuickPicker extends React.Component<IDateRangeQuickPickerProps, any> {}

  interface IDateCommonProps {
    prefix?: string,
    name?: string,
    className?: string,
    placeholder?: string,
    confirmText?: string,
    width?: string | number,
    format?: string,
    openPanel?: boolean,
    defaultTime?: string,
    // onChange 返回值类型, date | number | string， 默认 string
    valueType?: 'date'|'number'|'string',
    popPosition?: 'left'|'right',
    // min 和 max 可以传入和 format 一致的字符串或者 Date 实例
    min?: string|number|Date,
    max?: string|number|Date,
    disabledDate?: Function,
    onChange?: Function,
    onClick?: Function,
    onOpen?: Function,
    onClose?: Function,
    canClear?: boolean
  }

  interface IDatePickerProps extends IDateCommonProps {
    showTime?: boolean,
    disabledTime?: Function,
    onBeforeConfirm?: Function,
    onBeforeClear?: Function,
  }

  class DatePicker extends React.Component<IDatePickerProps, any> {}

  interface IMonthPickerProps extends IDateCommonProps {
    value?: string|Date,
    disabled?: boolean,
  }

  class MonthPicker extends React.Component<IMonthPickerProps, any> {}

  interface IDateRangePickerProps extends IDateCommonProps {
    showTime: boolean
    value?: [string, string],
    disabledTime?: Function,
  }

  class DateRangePicker extends React.Component<IDateRangePickerProps, any> {}

  interface IWeekPickerProps extends IDateCommonProps {
    startDay?: number
  }

  class WeekPicker extends React.Component<IWeekPickerProps, any> {}

  interface IYearPickerProps extends IDateCommonProps {
    needConfirm?: boolean
  }

  class YearPicker extends React.Component<IYearPickerProps, any> {}

  interface ITimePickerProps extends IDateCommonProps {
    isFooterVisble?: boolean,
    showSecond?: boolean,
    hourStep?: number,
    minuteStep?: number,
    secondStep?: number,
    onBeforeConfirm?: Function,
    onBeforeClear?: Function,
  }

  class TimePicker extends React.Component<ITimePickerProps, any> {}

  interface ITimeRangePickerProps extends IDateCommonProps {
    isFooterVisble?: boolean,
    showSecond?: boolean,
    hourStep?: number,
    minuteStep?: number,
    secondStep?: number,
  }

  class TimeRangePicker extends React.Component<ITimeRangePickerProps, any> {}

  interface IQuarterPickerProps extends IDateCommonProps {
  }

  class QuarterPicker extends React.Component<IQuarterPickerProps, any> {}

  interface IDesignComponent {
    type: string|Array<string>

    // 预览这个组件的 Component
    preview: Function

    // 预览组件的包裹层
    previewItem?: Function

    // 所有预览界面上的事件都是在这个里面处理的
    previewController?: Function

    // 编辑这个组件的 Component
    editor: Function

    // 编辑组件的包裹层
    editorItem?: Function

    // 传给 editor 的额外 props
    editorProps?: Function|Object

    // 传给 preview 的额外 props
    previewProps?: Function|Object

    // 组件是否可以拖拽
    dragable?: boolean

    // 组件是否出现在添加组件的列表里面
    appendable?: boolean

    // 是否显示右下角的编辑区域(编辑/加内容/删除)
    // 不支持在这里配置编辑区域的按钮，参数太多。
    // 如果要自定义编辑区域，可以通过重写 previewController 的方式来做。
    configurable?: boolean

    // 组件是否可以编辑
    // 可以选中的组件一定是可以编辑的
    // 不可编辑的组件不可选中，只能展示。
    // 右下角的编辑区域由 configurable 单独控制
    editable?: boolean

    // 选中时是否高亮
    highlightWhenSelect?: boolean
  }

  interface IDesignProps {
    components: Array<IDesignComponent>

    value?: Array<Object>

    // 默认选中的组件下标
    defaultSelectedIndex?: number

    // onChange(value: object)
    onChange: (value: Object) => void

    // 用来渲染整个 Design 组件
    preview?: Function

    // 有未保存数据关闭窗口时需要用户确认
    // 离开时的确认文案新版本的浏览器是不能自定义的。
    // https://www.chromestatus.com/feature/5349061406228480
    confirmUnsavedLeave?: boolean

    // 是否将未保存的数据暂存到 localStorage 中
    // 下次打开时如果有未保存的数据会提示从 localStorage 中恢复
    // 这个 props 不支持动态修改，只会在 mount 的时候检查一次状态
    cache?: boolean

    // Design 实例的缓存 id，根据这个 id 识别缓存
    cacheId?: string

    // 恢复缓存时的提示文案
    cacheRestoreMessage?: string

    // 是否禁用编辑功能
    // 开启后，会忽略 components 里面的 editable 设置，全部不可编辑
    disabled?: boolean

    // 一些用户自定义的全局配置
    globalConfig?: Object

    // 滚动到顶部时的偏移量
    scrollTopOffset?: number|Function

    // 滚动到左侧时的偏移量
    scrollLeftOffset?: number|Function

    children?: React.ReactChildren

    className?: string

    prefix?: string
  }

  class Design extends React.Component<IDesignProps, any> {}

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

  interface IErrorBoundaryFallbackComponentProps {
    error: Error;
    stackTrace: string;
  }

  interface IOnErrorCallback {
    (error: Error, stackTrace: string): void;
  }

  interface IErrorBoundaryProps {
    children?: React.ReactChild;
    onError?: IOnErrorCallback;
    FallbackComponent?: React.Component<
      IErrorBoundaryFallbackComponentProps,
      any
    >;
  }

  class ErrorBoundary extends React.Component<IErrorBoundaryProps, any> {}

  namespace ErrorBoundary {
    function withErrorBoundary(spec: {
      Component: React.Component<any, any>;
      FallbackComponent?: React.Component<
        IErrorBoundaryFallbackComponentProps,
        any
      >;
      onError?: IOnErrorCallback;
    }): React.Component<any, any>;
  }

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


  interface IGridColumn {
    title: string
    name?: string
    width?: number
    textAign?: 'left' | 'right' | 'center'
    bodyRender?: ((data: any, pos: number, name: string) => React.ReactNode) | React.ReactNode
    className?: string
    needSort?: boolean
    colSpan?: number
    fixed?: 'left' | 'right' | true
    onCellClick?: (data: any, event: React.MouseEvent<HTMLTableDataCellElement>) => null
    nowrap?: boolean
  }

  interface IGridProps {
    columns: Array<IGridColumn>
    datasets: Array<Object>
    rowKey?: string
    onChange?: (conf: any) => void
    scroll?: { x?: number, y?: number }
    sortBy?: string
    sortType?: 'desc' | 'asc'
    emptyLabel?: string
    selection?: { selectedRowKeys?: Array<string>, onSelect?: (selectedkeys: string, selectedRows: Array<any>, currentRow: number) => void, getCheckboxProps?: (data: object) => { disabled?: boolean }}
    expandation?: { isExpanded?: (record: any, index: number) => boolean, expandRender?: (data: any) => React.ReactNode }
    loading?: boolean
    className?: string
    rowClassName?: string
    prefix?: string
    pageInfo?: {
      current: number
      totalItem: number
      pageSize?: number
      maxPageToShow?: number
      onChange?: (value: number) => void
      className?: string
      prefix?: string
    }
    onRowClick?: (data: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => null
    ellipsis?: boolean
  }

  class Grid extends React.Component<IGridProps, any> { }


  type TIconType = 'summary-o' | 'summary' | 'shop-o' | 'shop' | 'goods-o' | 'goods' | 'order-o' | 'order' | 'customer-o' | 'customer' | 'chart-o' | 'chart' | 'capital-o' | 'capital' | 'casher' | 'marketing' | 'settings-o' | 'settings' | 'youzan-o' | 'youzan' | 'close' | 'close-circle-o' | 'close-circle' | 'message' | 'message-o' | 'bell' | 'bell-o' | 'calendar' | 'calendar-o' | 'search' | 'customer-service' | 'feedback' | 'error-circle-o' | 'error-circle' | 'check-circle-o' | 'check-circle' | 'help-circle-o' | 'help-circle' | 'clock-o' | 'clock' | 'countdown' | 'download' | 'share' | 'shop-decorate' | 'shop-template' | 'gift' | 'caret-up' | 'caret-down' | 'arrow-up' | 'arrow-down' | 'right' | 'plus' | 'star-o' | 'star' | 'check' | 'info-circle-o' | 'info-circle' | 'warning-o' | 'warning' | 'lock' | 'unlock'

  interface IIconProps {
    type: TIconType
    className?: string
  }

  class Icon extends React.Component<IIconProps, any> { }

  interface IInfiniteScrollerProps {
    className?: string
    prefix?: string
    hasMore?: boolean
    loadMore?: Function
    offset?: number
    initialLoad?: boolean
    useWindow?: boolean
    useCapture?: boolean
    loader?: React.ReactNode
  }

  class InfiniteScroller extends React.Component<IInfiniteScrollerProps, any> {}

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
    onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>
  }

  class Input extends React.Component<IInputProps, any> {
    focus: () => void;
  }

  namespace Layout {
    interface IRowProps {
      className?: string
      prefix?: string
    }

    class Row extends React.Component<IRowProps, any> { }

    interface IColProps {
      span: number
      offset?: number
      className?: string
      prefix?: string
    }
    class Col extends React.Component<IColProps, any> { }
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

  interface ICompoundMentionSuggestion {
    value: any
    content?: React.ReactNode
    isGroup?: boolean
    isDivider?: boolean
    icon?: string
    disabled?: boolean
  }

  interface IMentionProps {
    value: string;
    onChange: (value: string) => any;
    multiLine?: boolean;
    position?: 'top' | 'bottom';
    onSearchChange?: (value: string) => any;
    suggestions: string | number | ICompoundMentionSuggestion;
    suggestionNotFoundContent?: React.ReactNode;
    triggerText?: string;
    className?: string;
    prefix?: string;
  }

  class Mention extends React.Component<IMentionProps, any> {}

  interface IMenuProps {
    onClick?: React.UIEventHandler<HTMLDivElement|HTMLLIElement>
    style?: React.CSSProperties
    mode?: 'pop' | 'inline'
    defautExpandKeys?: Array<string>
    defaultSelectedKey?: string
    inlineIndent?: number
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
      key?: string
      title: React.ReactNode
      disabled?: boolean
      overlayClassName?: string
      className?: string
      prefix?: string
    }

    class SubMenu extends React.Component<ISubMenuProps, any> { }
  }

  interface INotifyProps {
    text?: any
    duration?: number
    callback?: () => void
  }

  class Notify extends React.Component<INotifyProps, any> {
    static success(text: React.ReactNode, duration?: number, callback?: Function): number
    static error(text: React.ReactNode, duration?: number, callback?: Function): number
    static clear(id: number): void
  }

  interface INumberInputProps {
    value?: number
    onChange?: (e: INumberInputChangeEvent) => any
    showStepper?: boolean
    decimal?: number
    min?: number
    max?: number
    placeholder?: string
    disabled?: boolean
    className?: string
    prefix?: string
  }

  interface INumberInputTarget extends INumberInputProps {
    type: 'number'
    value: number
  }

  interface INumberInputChangeEvent {
    target: INumberInputTarget
    preventDefault: Function
    stopPropagation: Function
  }

  class NumberInput extends React.Component<INumberInputProps, any> {}

  interface IPaginationProps {
    current: number
    totalItem: number
    pageSize?: number
    onPageSizeChange?: (pageSize: number) => any
    maxPageToShow?: number
    onChange?: (value: number) => void
    className?: string
    prefix?: string
  }

  class Pagination extends React.Component<IPaginationProps, any> { }

  interface IShapeProps {
    style?: React.CSSProperties
    animate?: boolean
    className?: string
    prefix?: string
  }

  interface ITextRowProps extends IShapeProps {
    lineSpacing?: number | string
  }

  interface ITextRowDashedProps extends ITextRowProps {
    segments?: (string | number)[]
  }

  interface ICircleProps extends IShapeProps {
    diameter?: number | string
  }

  interface IRectangleProps extends IShapeProps {
    width: number | string
    height: number | string
  }

  interface ITextBlockProps extends IShapeProps {
    rows: number
    lineSpacing?: number | string
    widths?: number[]
    dashed?: boolean
    dashSegments?: (string | number)[][]
  }

  interface IRichTextBlockProps extends ITextRowProps {
    shape?: 'circle' | 'react'
    size?: string | number
  }

  namespace Placeholder {
    class TextBlock extends React.Component<ITextBlockProps, any> {}
    class RichTextBlock extends React.Component<IRichTextBlockProps, any> {}
    class TextRow extends React.Component<ITextRowProps, any> {}
    class TextRowDashed extends React.Component<ITextRowDashedProps, any> {}
    class Circle extends React.Component<ICircleProps, any> {}
    class Rectangle extends React.Component<IRectangleProps, any> {}
  }

  interface IPopProps {
    content?: React.ReactNode
    trigger?: 'none' | 'click' | 'hover' | 'focus'
    position?: string
    centerArrow?: boolean
    header?: React.ReactNode
    block?: boolean
    onShow?: Function
    onClose?: Function
    onBeforeShow?: Function
    onBeforeClose?: Function
    onConfirm?: Function
    onCancel?: Function
    confirmText?: string
    cancelText?: string
    type?: 'primary' | 'default' | 'danger' | 'success'
    visible?: boolean
    onVisibleChange?: Function
    className?: string
    wrapperClassName?: string
    prefix?: string
    closeOnClickOutside?: boolean
    isOutside?: (target: HTMLElement, node: { contentNode: HTMLElement, triggerNode: HTMLElement }) => boolean
    mouseEnterDelay?: number
    mouseLeaveDelay?: number
  }

  class Pop extends React.Component<IPopProps, any> { }

  type PositionFunction = (
    anchorBoundingBox: ClientRect,
    containerBoundingBox: ClientRect,
    contentDimension: {width: number, height: number },
    options: { cushion: number, anchor: HTMLElement, container: HTMLElement, anchorBoundingBoxViewport: any, containerBoundingBoxViewport: any }
  ) => { getCSSStyle: () => React.CSSProperties, name: string }

  interface IPopoverProps {
    position: PositionFunction
    cushion?: number
    display?: string
    onShow?: Function
    onClose?: Function
    onBeforeShow?: Function
    onBeforeClose?: Function
    containerSelector?: string
    visible?: boolean
    onVisibleChange?: Function
    className?: string
    wrapperClassName?: string
    prefix?: string
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
  }

  interface IPortalProps {
    // visible
    visible?: boolean

    // children
    children: React.ReactChild
    render?: Function

    // parent node
    selector?: string | HTMLElement

    // layer
    layer?: string
    useLayerForClickAway?: boolean
    onClickAway?: Function
    onLayerReady?: Function

    // layer style
    className?: string
    style?: React.CSSProperties
    css?: React.CSSProperties
    prefix?: string
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

  interface IProgressProps {
    className?: string
    prefix?: string
    type?: 'ling'|'circle'
    percent?: number
    showInfo?: boolean
    status?: string
    format?: Function
    strokeWidth?: number
    width?: number
    style?: React.CSSProperties
  }

  class Progress extends React.Component<IProgressProps, any> {}

  interface IRadioProps {
    value: any
    disabled?: boolean,
    readOnly?: boolean,
    className?: string
    prefix?: string
  }

  class Radio extends React.Component<IRadioProps, any> { }

  namespace Radio {
    interface IGroupProps {
      value: any
      disabled?: boolean,
      readOnly?: boolean,
      onChange: React.ChangeEventHandler<HTMLInputElement>
      isValueEqual?: (value1: any, value2: any) => boolean
      className?: string
      prefix?: string
    }

    class Group extends React.Component<IGroupProps, any> { }
  }

  interface IRateProps {
    disabled?: boolean,
    value?: number,
    count?: number,
    allowHalf?: boolean,
    allowClear?: boolean,
    style?: React.CSSProperties,
    prefix?: string,
    onChange?: (value: number) => void,
    className?: string,
    character?: React.ReactNode
  }

  class Rate extends React.Component<IRateProps, any> {}

  interface ISKUItem {
    id: number
    text: string
  }

  interface ISKUProps {
    className?: string
    value?: Array<ISKUItem>
    disabled?: string|boolean
    maxSize?: number
    maxSKUTextLength?: number
    maxLeafTextLength?: number
    skuTree?: Array<ISKUItem>
    optionValue?: string
    optionText?: string
    onFetchGroup?: Function
    onFetchSKU?: Function
    onCreateGroup?: Function
    onCreateSKU?: Function
    onChange?: Function
    prefix?: string
  }

  class SKU extends React.Component<ISKUProps, any> {}

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

  interface ISortableProps {
    className?: string
    prefix?: string
    items?: any[]
    onChange?: Function
    tag?: string
    sort?: boolean
    filterClass?: string
    group?: Object | string
    delay?: number
    animation?: number
    handle?: string
    ghostClass?: string
    chosenClass?: string
    dragClass?: string
    forceFallback?: boolean
    fallbackClass?: string
    fallbackOnBody?: boolean
    fallbackTolerance?: number
    scroll?: boolean
    scrollFn?: Function
    scrollSensitivity?: number
    scrollSpeed?: number
    setData?: Function
    onStart?: Function
    onEnd?: Function
    onAdd?: Function
    onUpdate?: Function
    onSort?: Function
    onRemove?: Function
    onFilter?: Function
    onMove?: Function
    onClone?: Function
  }

  class Sortable extends React.Component<ISortableProps, any> {}

  interface ISplitButtonProps {
    type?: 'default' | 'primary' | 'danger' | 'success'
    size?: 'medium' | 'large' | 'small'
    disabled?: boolean
    loading?: boolean
    dropdownData?: Array<any>
    dropdownTrigger?: 'click' | 'hover'
    dropdownText?: string
    dropdownValue?: string
    className?: string
    prefix?: string
    onClick?: React.UIEventHandler<HTMLButtonElement>
    onSelect?: Function
  }

  class SplitButton extends React.Component<ISplitButtonProps, any> { }

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

  namespace Sweetalert {
    interface IAlertOption {
      content: React.ReactNode
      type?: 'info' | 'success' | 'error' | 'warning'
      title?: React.ReactNode
      onConfirm?: () => void | Promise<any>
      confirmText?: string
      confirmType?: 'default' | 'primary' | 'danger' | 'success'
      closeBtn?: boolean
      maskClosable?: boolean
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

  interface ISwiperProps {
    className?: string
    prefix?: string
    transitionDuration?: number
    autoplay?: boolean
    autoplayInterval?: number
    dots?: boolean
    dotsColor?: string
    dotsSize?: 'normal'|'small'|'large'
    arrows?: boolean
    arrowsType?: 'dark'|'light'
    onChange?: Function
  }

  class Swiper extends React.Component<ISwiperProps, any> {}

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
    expandation?: { isExpanded?: (record: any, index: number) => boolean, expandRender?: (data: any) => React.ReactNode }
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

  interface ITabPanelProps {
    className?: string
    prefix?: string
    actived?: boolean
    tab: React.ReactNode
    id?: string | number,
    onPanelReady?: (id: string | number) => void
    uniqueId?: number
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

  namespace Tabs {
    class TabPanel extends React.Component<ITabPanelProps, any> { }
  }

  interface ITagProps {
    color?: string
    outline?: boolean
    rounded?: boolean
    borderColor?: string
    bgColor?: string
    fontColor?: string
    closable?: boolean
    onClose?: Function
    children?: React.ReactChild
    style?: React.CSSProperties
    className?: string
    prefix?: string
  }

  class Tag extends React.Component<ITagProps, any> {}

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

  interface IUploadProps {
    prefix?: string
    className?: string
    triggerClassName?: string
    maxSize?: number
    maxAmount?: number
    accept?: string
    tips?: string
    localOnly?: boolean
    auto?: boolean
    fetchUrl?: string
    tokenUrl?: string
    uploadUrl?: string
    filterFiles?: Function
    onFetch?: Function
    onUpload?: Function
    triggerInline?: boolean
    silent?: boolean
    withoutPopup?: boolean
  }

  class Upload extends React.Component<IUploadProps, any> {}

  interface IPreviewImageConfig {
    images: Array<string>
    index?: number
    showRotateBtn?: boolean
    className?: string
    prefix?: string
  }

  function previewImage(config: IPreviewImageConfig): any

}

