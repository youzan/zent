---
title: Dialog
subtitle: 对话框
path: component/dialog
group: 反馈
---

## Dialog 对话框

对话框，通过打开一个浮层的方式，避免打扰用户的操作流程。

### 使用指南

-  命令式, 直接调用 `openDialog` 函数。

-  组件式, 通过控制 `visible` 来显示／隐藏对话框。

-  推荐使用命令式, 不需要在外部维护一个 `visible` 属性, 更加方便。

### API

| 参数           | 说明                            | 类型     | 默认值      |
| ------------ | ----------------------------- | ------ | -------- |
| title        | 自定义弹框标题                       | node   | `''`     |
| children     | 弹框内容: `<Dialog>xxxx</Dialog>` | node   | `null`   |
| footer       | 底部内容                          | node   | `null`   |
| visible      | 是否打开对话框                       | bool   | `false`  |
| closeBtn     | 是否显示右上角关闭按钮                   | bool   | `true`   |
| onClose      | 关闭操作回调函数                      | func   | `noop`   |
| mask         | 是否显示遮罩                        | bool   | `true`   |
| maskClosable | 点击遮罩是否可以关闭                    | bool   | `true`   |
| className    | 自定义额外类名                       | string | `''`     |
| prefix       | 自定义前缀                         | string | `'zent'` |
| style        | 自定义样式                         | object | `{}`     |


#### openDialog

`openDialog(options: object): function`

**`options` 参数支持组件除 `visible` 以外的所有属性，外加以下参数：**

| 参数           | 说明                            | 类型     | 默认值      |
| ------------ | ----------------------------- | ------ | -------- |
| dialogId   | 可选，对话框的 ID，可以通过 `closeDialog(dialogId)` 来关闭对话框  | string | 随机生成的唯一ID  |
| parentComponent |  可选，父组件的引用, 用于关联 context   | ReactInstance  |    |

如果需要组件实例的引用, 可以传一个函数形式的 `ref` 给 `openDialog`, **不支持字符串形式的 `ref`.**

> `openDialog` 的返回值是一个手动关闭 Dialog 的函数, `close(false)` 将不会触发Dialog的 `onClose` 方法。**推荐使用 `closeDialog` 来关闭对话框。**


#### closeDialog

`closeDialog(dialogId: string, options: object): void`

`dialogId` 对应调用 `openDialog` 时传的参数。

`options.triggerOnClose` 如果是 `true`，关闭时会触发 `onClose` 回调，`false` 时不会触发。


#### 指定Dialog宽度

在 `style` 中可以指定弹出窗口的宽度, e.g. `style={{ width: '600px' }}`.

默认情况下弹出窗口会自适应内容的宽度, 同时有最小宽度和最大宽度.
