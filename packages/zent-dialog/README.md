# zent-dialog

基础弹窗组件

这个组件有两种使用方式：
1. 命令式，直接调用`openDialog`函数。**不支持`context`**。
2. Component形式，通过控制`visible`来显示／隐藏对话框。**支持`context`**。

**推荐使用`openDialog`的方式，不用在外部维护一个`visible`属性，使用更加方便。**

如果Dialog内部的代码依赖React的`context`，请使用组件形式，不要使用`openDialog`。

## openDialog

`openDialog(options: object): function`

**`options`支持除了`visible`以外的所有`Dialog` props**。

如果需要Dialog实例的引用，可以传一个函数形式的`ref`给`openDialog`，**不支持字符串形式的`ref`**。

返回值是一个手动关闭`Dialog`的函数`closeDialog()`，`closeDialog(false)`将不会触发Dialog
的`onClose`，传其它值或者不传都会触发`onClose`。

重复调用`closeDialog`是一个`noop`操作。

## Component API

`Dialog`组件支持以下props。

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| title | 自定义弹框标题 | node | '' |  |
| children | 弹框内容，这么写的`<Dialog>xxxx</Dialog>`，不是`<Dialog children={xxx}></Dialog>` | node | null | |
| footer | 底部内容 | node | null |  |
| visible | 是否打开对话框 | bool | false | true, false |
| closeBtn | 是否显示右上角关闭按钮 | bool | true |  |
| onClose | 关闭操作回调函数 | func | 空函数 |  |
| mask | 是否显示遮罩 | bool | true |  |
| maskClosable | 点击遮罩是否可以关闭 | bool | true |  |
| className | 自定义额外类名 | string | '' |  |
| prefix | 自定义前缀 | string | 'zent' |  |
| style | 自定义样式 | object | {} |  |

### 指定Dialog宽度

在`style`中可以指定宽度，e.g. `style={{ width: '600px' }}`。

默认行为是自适应内容的宽度，同时有最小宽度和最大宽度。
