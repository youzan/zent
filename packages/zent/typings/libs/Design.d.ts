/// <reference types="react" />

declare module 'zent/lib/design' {
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

  export default class Design extends React.Component<IDesignProps, any> {}
}
