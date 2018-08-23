// TypeScript Version: 2.4

/// <reference types="react" />

import * as React from "react";

export = zent;
export as namespace zent;

declare namespace zent {

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
    value: string
    content?: React.ReactNode
    isGroup?: boolean
    isDivider?: boolean
  }

  type IMenuItem = _IMenuItem | string;

  interface IAutoCompleteProps {
    value?: any
    initialValue?: any
    placeholder?: string
    data?: Array<IMenuItem>
    onChange?: (value: string) => void
    onSelect?: (value: string) => void
    onSearch?: (searchText: string) => void
    filterOption?: (searchText: string, menuItem: IMenuItem) => boolean
    valueFromOptions?: boolean
    className?: string
    popupClassName?: string
    width?: number | string
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
    offset?: [number, number]
    style?: React.CSSProperties
  }

  class Badge extends React.Component<IBadgeProps, any> {}

  interface IBlockHeaderProps {
    className?: string
    title: string
    tooltip?: React.ReactNode
    content?: React.ReactNode,
    childAlign?: 'left' | 'right',
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

  type ButtonType = 'default' | 'primary' | 'danger' | 'success'
  type ButtonSize = 'medium' | 'large' | 'small'

  interface IButtonProps {
    type?: ButtonType
    size?: ButtonSize
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
    onClick?: React.MouseEventHandler<HTMLButtonElement>
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

  interface ICascaderItem {
    id: any;
    title: any;
  }

  interface ICascaderOption extends ICascaderItem {
    children?: ICascaderOption[]
  }

  interface ICascaderLoadMoreResolvedItem extends ICascaderItem {
    isLeaf: boolean
  }

  interface ICascaderProps {
    type?: 'tabs' | 'menu'
    value?: Array<any>
    options?: Array<ICascaderOption>
    title?: Array<any>
    onChange?: (value: Array<ICascaderItem>) => void
    loadMore?: (item: any, stage: number) => Promise<ICascaderLoadMoreResolvedItem[]>
    changeOnSelect?: boolean
    placeholder?: string
    prefix?: string
    className?: string
    popClassName?: string
    displayText?: (value: Array<ICascaderItem>) => React.ReactNode
    expandTrigger?: 'click' | 'hover'
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
    onChange: (value: string|string[]) => void
    accordion?: boolean
    bordered?: boolean
    className?: string
    prefix?: string
  }

  class Collapse extends React.Component<ICollapseProps, any> {}

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

  interface IColorPickerProps {
    color: string
    showAlpha?: boolean
    type?: 'default'|'simple'
    presetColors?: Array<string>
    onChange?: (value: string) => void
    className?: string
    wrapperClassName?: string
    prefix?: string
  }

  class ColorPicker extends React.Component<IColorPickerProps, any> {}

  namespace ColorPicker {
    interface IColorBoardProps {
      color: string
      showAlpha?: boolean
      onChange?: (value: string) => void
      className?: string
      prefix?: string
    }

    class ColorBoard extends React.Component<IColorBoardProps, any> {}
  }

  interface ICopyButtonProps {
    text: string
    onCopySuccess?: (() => void) | string
    onCopyError?: (() => void) | string
  }

  class CopyButton extends React.Component<ICopyButtonProps, any> {}

  type DateRangeQuickPickerValue = [string, string] | [number, number]

  interface IDateRangeQuickPickerPreset {
    text: string
    value: number
  }

  interface IDateRangeQuickPickerProps {
    prefix?: string
    className?: string
    onChange: (value: DateRangeQuickPickerValue, choosePresetValue?: number) => void
    value?: DateRangeQuickPickerValue
    valueType?: 'string' | 'number'
    format?: string
    chooseDays?: number
    preset?: Array<IDateRangeQuickPickerPreset>
    min?: string|number|Date
    max?: string|number|Date
  }

  class DateRangeQuickPicker extends React.Component<IDateRangeQuickPickerProps, any> {}

  type FormattableDateValue = string | number | Date
  type RangeType = 'START' | 'END'
  
  interface IDisabledTime {
    disabledHour: (val: number) => boolean
    disabledMinute: (val: number) => boolean
    disabledSecond: (val: number) => boolean
  }

  interface IDateCommonProps {
    prefix?: string
    name?: string
    className?: string
    placeholder?: string
    confirmText?: string
    width?: string | number
    format?: string
    openPanel?: boolean
    defaultTime?: string
    // onChange 返回值类型, date | number | string， 默认 string
    valueType?: 'date' | 'number' | 'string'
    popPosition?: 'left' | 'right'
    // min 和 max 可以传入和 format 一致的字符串或者 Date 实例
    min?: FormattableDateValue
    max?: FormattableDateValue
    disabledDate?: (val: Date) => boolean
    onChange?: (val: FormattableDateValue) => void
    onClick?: (val: FormattableDateValue, type?: RangeType) => void
    onOpen?: (type?: RangeType) => void
    onClose?: (type?: RangeType) => void
    canClear?: boolean
  }

  interface IDatePickerProps extends IDateCommonProps {
    showTime?: boolean,
    disabledTime?: () => IDisabledTime
    onBeforeConfirm?: () => boolean
    onBeforeClear?: () => boolean
  }

  class DatePicker extends React.Component<IDatePickerProps, any> {}

  interface IMonthPickerProps extends IDateCommonProps {
    value?: string|Date
    disabled?: boolean
  }

  class MonthPicker extends React.Component<IMonthPickerProps, any> {}

  interface IDateRangePickerProps extends IDateCommonProps {
    showTime: boolean
    value?: [FormattableDateValue, FormattableDateValue]
    disabledTime?: (type: RangeType) => IDisabledTime
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
    isFooterVisble?: boolean
    showSecond?: boolean
    hourStep?: number
    minuteStep?: number
    secondStep?: number
    onBeforeConfirm?: () => boolean
    onBeforeClear?: () => boolean
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

  interface IGroupComponent {
    type: string
    editor: Function
    preview: Function
    name: string
  }

  interface IDesignProps {
    components: Array<IDesignComponent | IGroupComponent>

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

  class Design extends React.Component<IDesignProps, any> {
    static stripUUID: (value: any) => any
    static group: (name: string) => IGroupComponent
  }

  namespace Design {
    class DesignWithoutDnd extends React.PureComponent<IDesignProps, any> {}
  }

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
    error: Error
    stackTrace: string
  }

  interface IOnErrorCallback {
    (error: Error, stackTrace: string): void
  }

  interface IErrorBoundaryProps {
    children?: React.ReactChild
    onError?: IOnErrorCallback
    FallbackComponent?: React.Component<IErrorBoundaryFallbackComponentProps, any>
  }

  class ErrorBoundary extends React.Component<IErrorBoundaryProps, any> {}

  namespace ErrorBoundary {
    function withErrorBoundary(spec: {
      Component: React.Component<any, any>
      FallbackComponent?: React.Component<IErrorBoundaryFallbackComponentProps, any>
      onError?: IOnErrorCallback
    }): React.Component<any, any>

    function catchError(spec: {
      onError?: IOnErrorCallback
      FallbackComponent?: React.ReactElement<IErrorBoundaryFallbackComponentProps>
    }): (baseComponent: React.Component) => React.Component
  }

  interface IFormProps {
    className?: string
    prefix?: string
    vertical?: boolean
    horizontal?: boolean
    inline?: boolean
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    style?: React.CSSProperties
    disableEnterSubmit?: boolean
  }

  class Form extends React.Component<IFormProps, any> {}

  namespace Form {
    interface IConnectedFormProps {
      onChange?: (value: any) => void
      onSubmitSuccess?: (result: any) => void
      onSubmitFail?: (error?: any) => void
      scrollToError?: boolean
    }

    interface IZentForm {
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

    interface IWrappedComponentProps {
      zentForm: IZentForm,
      handleSubmit: (submit: (values: any, zentForm: IZentForm) => any) => any
    }

    /**
     * 
     * @param config
     * @todo 检查createForm返回值是否符合预期
     */
    function createForm<C>(config?: { formValidations?: any }): (component: C) => React.Component<IConnectedFormProps, any>

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

    interface IFieldProps<T> {
      ref?: React.Ref<T>
      name: string
      component: string|React.Component<any, any>
      value: any
      normalize?: (value: any, previousValue: any, nextValues: any, previousValues: any) => void
      format?: (value: any, previousValue: any, nextValues: any, previousValues: any) => void
      onChange?: (value: any, previousValue: any, nextValues: any, previousValues: any) => void
      onBlur?: (value: any, previousValue: any, nextValues: any, previousValues: any) => void
      onFocus?: React.FocusEventHandler<any>
      validations?: IValidation
      validationErrors?: any
      validateOnChange?: boolean
      validateOnBlur?: boolean
      asyncValidation?: (values: Object, value: any) => Promise<any>
      displayError?: boolean
      relatedFields?: Array<any>
    }
  
    interface IFormSectionProps {
      name: string
      component?: React.ReactNode,
    }

    interface IFieldArrayProps {
      name: string
      value?: Array<any>
      component: React.ReactNode,
    }

    class Field<T extends Element> extends React.Component<IFieldProps<T>, any> {}

    class FormSection extends React.PureComponent<IFormSectionProps, any> {}

    class FieldArray extends React.Component<IFieldArrayProps, any> {}

    interface IContolGroupProps {
      label?: string
      className?: string
      helpDesc?: string
      required?: boolean
    }

    function getControlGroup(component: React.Component<any, any>): React.Component<any, any>

    class InputField extends React.Component<any, any> { }
    class CheckboxField extends React.Component<any, any> { }
    class CheckboxGroupField extends React.Component<any, any> { }
    class RadioGroupField extends React.Component<any, any> { }
    class SelectField extends React.Component<any, any> { }
    class NumberInputField extends React.Component<any, any> { }
    class ColorPickerField extends React.Component<any, any> { }
    class DateRangePickerField extends React.Component<any, any> { }
    class DateRangeQuickPickerField extends React.Component<any, any> { }
    class SwitchField extends React.Component<any, any> { }
    class SubmissionError extends React.Component<any, any> { }
    class FormCheckboxField extends React.Component<any, any> { }
    class FormCheckboxGroupField extends React.Component<any, any> { }
    class FormColorPickerField extends React.Component<any, any> { }
    class FormDatePickerField extends React.Component<any, any> { }
    class FormWeekPickerField extends React.Component<any, any> { }
    class FormMonthPickerField extends React.Component<any, any> { }
    class FormQuarterPickerField extends React.Component<any, any> { }
    class FormYearPickerField extends React.Component<any, any> { }
    class FormTimePickerField extends React.Component<any, any> { }
    class FormTimeRangePickerField extends React.Component<any, any> { }
    class FormDateRangePickerField extends React.Component<any, any> { }
    class FormDateRangeQuickPickerField extends React.Component<any, any> { }
    class FormInputField extends React.Component<any, any> { }
    class FormNumberInputField extends React.Component<any, any> { }
    class FormRadioGroupField extends React.Component<any, any> { }
    class FormSelectField extends React.Component<any, any> { }
    class FormSwitchField extends React.Component<any, any> { }
  }

  interface IGridColumn {
    title: React.ReactNode
    name?: string
    width?: number | string
    bodyRender?: ((data: any, pos: number, name: string) => React.ReactNode) | React.ReactNode
    className?: string
    needSort?: boolean
    colSpan?: number
    fixed?: 'left' | 'right' | true
    onCellClick?: (data: any, event: React.MouseEvent<HTMLTableDataCellElement>) => any
    textAign?: 'left' | 'right' | 'center'
    nowrap?: boolean
    defaultText?: React.ReactNode
  }

  interface IGridOnChangeConfig {
    current: number
    sortBy: string
    sortType: 'asc' | 'desc' | ''
    pageSize: number
  }

  interface IGridProps {
    columns: Array<IGridColumn>
    datasets: Array<Object>
    rowKey?: string
    onChange?: (conf: IGridOnChangeConfig) => any
    scroll?: {
      x?: number,
      y?: number
    }
    sortBy?: string
    sortType?: 'desc' | 'asc'
    emptyLabel?: string
    selection?: {
      selectedRowKeys?: Array<string>,
      onSelect?: (selectedkeys: string, selectedRows: Array<any>, currentRow: number) => void,
      getCheckboxProps?: (data: Object) => { disabled?: boolean }
    }
    expandation?: {
      isExpanded?: (record: any, index: number) => boolean,
      expandRender?: (data: Object) => React.ReactNode
    }
    loading?: boolean
    className?: string
    rowClassName?: string | ((data: object, rowIndex: number) => string)
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
    onRowClick?: (data: any, index: number, event: React.MouseEvent<HTMLTableRowElement>) => void
    ellipsis?: boolean
    onExpand?: (data: {expanded: boolean, data: any, event: React.MouseEvent<HTMLTableRowElement>, index: number}) => void
  }

  class Grid extends React.Component<IGridProps, any> { }


  // grep type all.md | awk -F '"' '{print $2}' | sort | uniq | xargs | sed "s/[a-z-]*/'\0'/g" | sed "s/ / | /g"

  type TIconType = 'approval' | 'approval-o' | 'arrow-down' | 'arrow-up' | 'assess' | 'assess-o' | 'bell' | 'bell-o' | 'business' | 'business-o' | 'calendar' | 'calendar-o' | 'capital' | 'capital-o' | 'caret-down' | 'caret-up' | 'casher' | 'chart' | 'chart-o' | 'check' | 'check-circle' | 'check-circle-o' | 'checkin' | 'checkin-o' | 'clock' | 'clock-o' | 'close' | 'close-circle' | 'close-circle-o' | 'countdown' | 'customer' | 'customer-o' | 'customer-service' | 'download' | 'edit-o' | 'error-circle' | 'error-circle-o' | 'expand-customer' | 'expand-customer-o' | 'export' | 'feedback' | 'forbidden-circle' | 'gift' | 'goods' | 'goods-o' | 'hc-manage' | 'hc-manage-o' | 'help-circle' | 'help-circle-o' | 'hr' | 'hr-o' | 'info-circle' | 'info-circle-o' | 'lock' | 'marketing' | 'message' | 'message-o' | 'order' | 'order-o' | 'pending-circle' | 'plus' | 'plus-circle-o' | 'remove-o' | 'report' | 'report-o' | 'right' | 'right-circle' | 'search' | 'settings' | 'settings-o' | 'share' | 'shop' | 'shop-decorate' | 'shop-o' | 'shop-template' | 'star' | 'star-o' | 'subtract-circle-o' | 'suggestions' | 'summary' | 'summary-o' | 'text-guide' | 'ticket' | 'ticket-o' | 'unlock' | 'upload' | 'video-guide' | 'warning' | 'warning-o' | 'youzan' | 'youzan-o'

  interface IIconProps {
    type: TIconType
    className?: string
  }

  class Icon extends React.Component<IIconProps, any> { }

  interface IInfiniteScrollerProps {
    className?: string
    prefix?: string
    hasMore?: boolean
    loadMore?: Promise<any> | ((stopLoading: () => void) => void)
    offset?: number
    initialLoad?: boolean
    useWindow?: boolean
    useCapture?: boolean
    loader?: React.ReactNode
  }

  class InfiniteScroller extends React.Component<IInfiniteScrollerProps, any> {}

  interface IInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    className?: string
    prefix?: string
    width?: number | string
    type?: 'text' | 'number' | 'password' | 'textarea'
    defaultValue?: string
    value?: string
    readOnly?: boolean
    disabled?: boolean
    placeholder?: string
    showClear?: boolean
    addonBefore?: React.ReactNode
    addonAfter?: React.ReactNode
    autoFocus?: boolean
    autoSelect?: boolean
    initSelectionStart?: number
    initSelectionEnd?: number
    // onChange?: React.ChangeEventHandler<HTMLInputElement>
    // onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>

    // textarea
    maxLength?: number
    showCount?: boolean
    autoSize?: boolean
  }

  class Input extends React.Component<IInputProps, any> {
    focus(): void
    select(selectionStart?: number, selectionEnd?: number): void
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
    float?: boolean
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
    onChange: (val: string) => any;
    onSearchChange?: (search: string) => any;
    multiLine?: boolean;
    position?: 'top' | 'bottom';
    suggestions: string | number | ICompoundMentionSuggestion;
    suggestionNotFoundContent?: React.ReactNode;
    triggerText?: string;
    className?: string;
    prefix?: string;
  }

  class Mention extends React.Component<IMentionProps, any> {}

  interface IMenuProps {
    onClick?: (e: React.MouseEvent<HTMLDivElement|HTMLLIElement>, key: string) => void
    onSubMenuClick?: (id?: string | number) => void
    onExpandChange?: (expanded?: string[]) => void
    style?: React.CSSProperties
    mode?: 'pop' | 'inline'
    defaultExpandKeys?: Array<string>
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
    static success(text: React.ReactNode, duration?: number, callback?: () => void): number
    static error(text: React.ReactNode, duration?: number, callback?: () => void): number
    static config(options: { duration: number }): void
    static clear(id: number): void
  }

  interface INumberInputProps {
    value?: number
    onChange?: (e: INumberInputChangeEvent) => any
    showStepper?: boolean
    showCounter?: boolean
    decimal?: number
    min?: number
    max?: number
    placeholder?: string
    disabled?: boolean
    className?: string
    width?: number | string
    prefix?: string
  }

  interface INumberInputTarget extends INumberInputProps {
    type: 'number'
    value: number
  }

  interface INumberInputChangeEvent {
    target: INumberInputTarget
    preventDefault: () => void
    stopPropagation: () => void
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

  type PopPositions = 'left-top' | 'left-center' | 'left-bottom' | 'right-top' | 'right-center' | 'right-bottom' | 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'auto-bottom-center' | 'auto-bottom-left' | 'auto-bottom-right' | 'auto-top-center' | 'auto-top-left' | 'auto-top-right'

  interface IPopProps {
    content: React.ReactNode
    trigger?: 'none' | 'click' | 'hover' | 'focus'
    position?: PopPositions
    centerArrow?: boolean
    header?: React.ReactNode
    block?: boolean
    onShow?: () => void
    onClose?: () => void
    onBeforeShow?: ((callback: () => void, escape: () => void) => void) | (() => Promise<any>)
    onBeforeClose?: ((callback: () => void, escape: () => void) => void) | (() => Promise<any>)
    onConfirm?: ((close: () => void) => void) | (() => Promise<any>)
    onCancel?: ((close: () => void) => void) | (() => Promise<any>)
    confirmText?: string
    cancelText?: string
    type?: 'primary' | 'default' | 'danger' | 'success'
    visible?: boolean
    onVisibleChange?: (visible: boolean) => void
    onPositionUpdated?: () => void
    onPositionReady?: () => void
    className?: string
    wrapperClassName?: string
    containerSelector?: string
    prefix?: string
    isOutside?: (target: HTMLElement, node: { contentNode: HTMLElement, triggerNode: HTMLElement }) => boolean

    // trigger: click
    closeOnClickOutside?: boolean

    // trigger: hover
    quirk?: boolean
    mouseEnterDelay?: number
    mouseLeaveDelay?: number

  }

  class HocPopComponent extends React.Component<any, any> {
    open: () => void
    close: () => void
  }

  class Pop extends React.Component<IPopProps, any> {
    static withPop(component: React.Component<any, any>): HocPopComponent
    adjustPosition(): void
    getWrappedPopover(): React.Component<any, any>
  }


  type Position = { getCSSStyle: () => React.CSSProperties, name: string }

  type PositionFunction = (
    anchorBoundingBox: ClientRect,
    containerBoundingBox: ClientRect,
    contentDimension: {width: number, height: number },
    options: { cushion: number, anchor: HTMLElement, container: HTMLElement, anchorBoundingBoxViewport: any, containerBoundingBoxViewport: any }
  ) => Position

  interface IPopoverProps {
    position: PositionFunction
    cushion?: number
    display?: string
    onShow?: () => void
    onClose?: () => void
    onBeforeShow?: ((callback: () => void, escape: () => void) => void) | (() => Promise<any>)
    onBeforeClose?: ((callback: () => void, escape: () => void) => void) | (() => Promise<any>)
    containerSelector?: string
    visible?: boolean
    onVisibleChange?: (visible: boolean) => void
    onPositionUpdated?: () => void
    onPositionReady?: () => void
    className?: string
    wrapperClassName?: string
    width?: number | string
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
        onTriggerRefChange?: (instance: React.ReactInstance, getNodeForTriggerRefChange: (el: HTMLElement) => HTMLElement) => void
        getNodeForTriggerRefChange?: (el: HTMLElement) => HTMLElement
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
        quirk?: boolean
      }

      class Hover extends React.Component<IHoverProps, any> {}

      type IFocusProps = IBaseProps

      class Focus extends React.Component<IFocusProps, any> {}
    }

    namespace Position {
      function create(fn: PositionFunction): Position
      const BottomLeft: Position
      const BottomCenter: Position
      const BottomRight: Position
      const LeftTop: Position
      const LeftCenter: Position
      const LeftBottom: Position
      const RightTop: Position
      const RightCenter: Position
      const RightBottom: Position
      const TopLeft: Position
      const TopCenter: Position
      const TopRight: Position
      const AutoBottomLeft: Position
      const AutoBottomRight: Position
      const AutoBottomCenter: Position
      const AutoTopLeft: Position
      const AutoTopRight: Position
      const AutoTopCenter: Position
    }

    interface IHocPopoverProps {
      getTriggerNode: () => HTMLElement
      getContentNode: () => HTMLElement
      open: () => void
      close: () => void
    }

    function withPopover(component: React.Component<any, any>): React.Component<IHocPopoverProps, any>
  }

  interface IPortalProps {
    // visible
    visible?: boolean
    onMount?: () => void
    onUnmount?: () => void

    // children
    children: React.ReactChild
    render?: () => React.ReactNode

    // parent node
    selector?: string | HTMLElement

    // layer
    layer?: string
    useLayerForClickAway?: boolean
    onClickAway?: React.MouseEventHandler<HTMLElement> | React.TouchEventHandler<HTMLElement>
    onLayerReady?: (el: HTMLElement) => void

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

    interface IPurePortalProps {
      children?: React.ReactChild
      render?: () => React.ReactNode
      selector: string | HTMLElement
      onMount?: () => void
      onUnmount?: () => void
    }

    class PurePortal extends React.Component<IPurePortalProps, any> {}
  }

  interface IPreviewImageConfig {
    images: Array<string>
    index?: number
    showRotateBtn?: boolean
    scaleRatio?: number
    parentComponent?: React.ReactInstance
    className?: string
    prefix?: string
  }

  function previewImage(config: IPreviewImageConfig): void

  interface IProgressProps {
    className?: string
    prefix?: string
    type?: 'ling'|'circle'
    percent?: number
    showInfo?: boolean
    status?: 'success' | 'exception'
    format?: (precent: number) => React.ReactNode
    strokeWidth?: number
    width?: number
    bgColor?: string
    normalColor?: string
    successColor?: string
    exceptionColor?: string
    style?: React.CSSProperties
  }

  class Progress extends React.Component<IProgressProps, any> {}

  interface IRadioProps {
    value: any
    disabled?: boolean
    readOnly?: boolean
    width?: number | string
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
    onChange?: (value: number) => void
    value?: number
    allowClear?: boolean
    allowHalf?: boolean
    character?: React.ReactNode
    className?: string
    count?: number
    disabled?: boolean
    style?: React.CSSProperties
    prefix?: string
  }

  class Rate extends React.Component<IRateProps, any> {}

  interface ISearchInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    className?: string
    prefix?: string
    width?: number | string
    defaultValue?: string
    value?: string
    readOnly?: boolean
    disabled?: boolean
    placeholder?: string
    showClear?: boolean
    addonBefore?: React.ReactNode
    addonAfter?: React.ReactNode
    autoFocus?: boolean
    autoSelect?: boolean
    initSelectionStart?: number
    initSelectionEnd?: number
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>
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
    filter?: (item: any, keyword?: string) => boolean
    maxToShow?: number
    onAsyncFilter?: (keyword: string, callback: (data: any) => void) => void
    onEmptySelected?: (event: React.SyntheticEvent<HTMLSpanElement>, value: any) => void
    onOpen?: () => void
    className?: string
    popupClassName?: string
    autoWidth?: boolean
    resetOption?: boolean
    resetText?: string
    width?: number | string
    prefix?: string
  }

  class Select extends React.Component<ISelectProps, any> { }

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
    onFetchGroup?: () => Promise<any>
    onFetchSKU?: () => Promise<any>
    onCreateGroup?: () => Promise<any>
    onCreateSKU?: () => Promise<any>
    onChange?: Function
    prefix?: string
  }

  class SKU extends React.Component<ISKUProps, any> {
    static flatten(sku: Array<any>, items: Array<any>, options: {
      optionValue: string
      optionText: string
    }): Array<any>
  }

  type SliderValueType = number | [number, number]

  interface ISliderProps {
    value: SliderValueType
    onChange?: (value: SliderValueType) => void
    range?: boolean
    min?: number
    max?: number
    step?: number
    withInput?: boolean
    dots?: boolean
    marks?: Object
    disabled?: boolean
    className?: string
    width?: number | string
    prefix?: string
  }

  class Slider extends React.Component<ISliderProps, any> { }

  type SortableGroup = {
    name: string
    pull: boolean | 'clone' | Function
    put: boolean | Array<string> | Function
    revertClone: boolean
  } | string

  interface IMobileScrollOriginalEvent {
    clientX: number
    clientY: number
    rootEl: HTMLDivElement
    target: HTMLElement
  }

  interface ISortableProps {
    // base api
    className?: string
    prefix?: string
    tag?: string
    items?: Array<any>
    onChange?: (newItems: Array<any>) => void
    filterClass?: string
  
    // advance api
    sort?: boolean
    group?: string | SortableGroup
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
    scrollFn?: (offsetX: number, offsetY: number, originalEvent: DragEvent | IMobileScrollOriginalEvent) => any
    scrollSensitivity?: number
    scrollSpeed?: number
    setData?: (dataTransfer: DataTransfer, dragEl: HTMLElement) => any
    onStart?: (event: Event) => any
    onEnd?: (event: Event) => any
    onAdd?: (event: Event) => any
    onUpdate?: (event: Event) => any
    onSort?: (event: Event) => any
    onRemove?: (event: Event) => any
    onFilter?: (event: Event) => any
    onMove?: (event: Event) => boolean
    onClone?: (event: Event) => boolean
  }

  class Sortable extends React.Component<ISortableProps, any> {}
  interface ISplitButtonProps {
    type?: ButtonType
    size?: ButtonSize
    disabled?: boolean
    loading?: boolean
    dropdownData?: Array<any>
    dropdownTrigger?: 'click' | 'hover'
    dropdownText?: string
    dropdownValue?: string
    droopdownPosition?: PopPositions
    className?: string
    prefix?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    onSelect?: (key: string) => void
  }

  class SplitButton extends React.Component<ISplitButtonProps, any> { }

  interface IStepsProps {
    type?: 'number' | 'card' | 'breadcrumb'
    direction?: 'horizontal' | 'vertical'
    current?: number
    status?: 'process' | 'finish' | 'error' | 'wait'
    sequence?: boolean
    onStepChange?: (stepIndex: number) => void
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
      onConfirm?: ((close: () => void) => void) | (() => Promise<any> | boolean)
      confirmText?: string
      confirmType?: ButtonType
      closeBtn?: boolean
      maskClosable?: boolean
      parentComponent?: React.ReactInstance
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
    onChange?: (current: number, prev: number) => void
    
  }

  class Swiper extends React.Component<ISwiperProps, any> {
    swiperTo(index: number): void
    prev(): void
    next(): void
  }

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
    isMoney?: boolean
    needSort?: boolean
    bodyRender?: (data: any) => React.ReactNode
    textAign?: 'left' | 'right' | 'center'
  }

  type TableChangeConfig = {
    sortBy: string
    sortType: 'asc' | 'desc'
    current: number
    pageSize: number
  }

  interface ITableProps {
    columns: Array<ITableColumn>
    datasets: Array<Object>
    rowKey?: string
    sortBy?: string
    sortType?: 'desc' | 'asc'
    onChange?: (conf: TableChangeConfig) => void
    emptyLabel?: string
    selection?: {
      selectedRowKeys?: Array<string>
      isSingleSelection?: boolean
      needCrossPage?: boolean
      onSelect?: (selectedkeys: string, selectedRows: Array<any>, currentRow: number) => void
    }
    loading?: boolean
    getRowConf?: (data: Object, index: number) => { canSelect: boolean, rowClass: string }
    expandation?: {
      isExpanded?: (record: any, index: number) => boolean
      expandRender?: (data: any) => React.ReactNode
    }
    batchComponents?: Array<any>
    batchComponentsAutoFixed?: boolean
    autoStick?: boolean
    autoScroll?: boolean
    className?: string
    prefix?: string
    pageInfo?: {
      current?: number
      totalItem?: number
      pageSize?: number
      maxPageToShow?: number
    }
  }

  class Table extends React.Component<ITableProps, any> { }

  interface ITab {
    key: string | number
    title: string | number
    disabled?: boolean
  }

  interface ITabPanelProps {
    className?: string
    prefix?: string
    actived?: boolean
    tab: React.ReactNode
    id: string | number,
    onPanelReady?: (id: string | number) => void
    uniqueId?: number
  }

  interface ITabsProps {
    activeId: string
    type?: 'normal' | 'card' | 'slider'
    size?: 'normal' | 'huge'
    align?: 'left' | 'right' | 'center'
    onChange?: (id: string | number) => void
    onDelete?: (id: string | number) => void
    onAdd?: () => void
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
    closable?: boolean
    onClose?: React.MouseEventHandler<HTMLElement>
    visible?: boolean
    onVisibleChange?: (visible: boolean) => void
    borderColor?: string
    bgColor?: string
    fontColor?: string
    style?: React.CSSProperties
    className?: string
    prefix?: string
  }

  class Tag extends React.Component<ITagProps, any> {}

  interface ITimelineLegendProps {
    color?: string;
    children?: React.ReactNode;
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
  }

  class TimelineLegend extends React.Component<ITimelineLegendProps, any> {}

  interface ITimelineItemProps {
    size?: number;
    showLabel?: boolean;
    showDot?: boolean;
    color?: string;
    lineColor?: string;
    dotColor?: string;
    label?: React.ReactNode;
    tip?: React.ReactNode;
    prefix?: string;
    className?: string;
    style?: React.CSSProperties;
    type?: 'vertical' | 'horizontal';
  }

  class TimelineItem extends React.Component<ITimelineItemProps> {}

  interface ITimelineArrayItem extends ITimelineItemProps {
    id?: string;
    percent?: number;
  }

  interface ITimelineProps {
    size?: number | string;
    timeline?: ITimelineArrayItem[];
    type?: 'vertical' | 'horizontal';
    className?: string;
    prefix?: string
    style?: React.CSSProperties;
  }

  class Timeline extends React.Component<ITimelineProps, any> {
    static Legend: typeof TimelineLegend;
    static Item: typeof TimelineItem;
  }

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
    icon?: string | React.ReactNode
    action: (data: ITreeData) => void
    shouldRender?: (data: ITreeData) => boolean
  }

  interface ITreeProps {
    useNew?: boolean
    dataType?: 'tree' | 'plain'
    data: Array<ITreeData>
    renderKey?: {
      id?: string
      title?: string
      children?: string
      parentId?: string
    }
    render?: (data: ITreeData) => React.ReactNode
    operations?: Array<ITreeOperation>
    foldable?: boolean
    onCheck?: (data: Array<number | string>) => void
    checkable?: boolean
    controlled?: boolean
    defaultCheckedKeys?: Array<number | string>
    disabledCheckedKeys?: Array<number | string>
    size?: 'medium' | 'small' | 'large'
    commonStyle?: React.CSSProperties
    expandAll?: boolean
    onExpand?: (data: ITreeData, config: { isExpanded: boolean }) => void
    autoExpandOnSelect?: boolean
    onSelect?: (data: ITreeData, target: HTMLSpanElement) => void
    isRoot?: (data: ITreeData) => boolean
    loadMore?: (data: ITreeData) => Promise<any>
  }

  class Tree extends React.Component<ITreeProps, any> { }


  interface IErrorMessage {
    overMaxSize?: string | ((data: { maxSize: string, type: string }) => string)
    overMaxAmount?: string | ((data: { maxAmount: number, type: string }) => string)
    wrongMimeType?: string | ((data: { type: string }) => string)
  }

  interface ILocalFile {
    file: File
    src: string
    __uid: number
  }

  interface IUploadConfig {
    categoryId: number
    localFiles: ILocalFile[]
    onProgress: (progress: number, index: number) => void
  }

  interface IUploadProps {
    prefix?: string
    className?: string
    type?: 'image' | 'video'
    triggerClassName?: string
    maxSize?: number
    maxAmount?: number
    accept?: string
    tips?: string
    localOnly?: boolean
    auto?: boolean
    filterFiles?: (files: File[]) => File[] | Promise<File[]>
    onFetch?: (networkUrl: string, categoryId: number) => Promise<any>
    onUpload?: (localFiles: ILocalFile[], uploadConfig: IUploadConfig) => void | Promise<any>
    categoryList?: Array<{
      value: any,
      text: string|number
    }>
    categoryId?: number
    errorMessages?: IErrorMessage
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

