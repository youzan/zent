# zent-dialog

[![npm version](https://img.shields.io/npm/v/zent-dialog.svg?style=flat)](https://www.npmjs.com/package/zent-dialog) [![downloads](https://img.shields.io/npm/dt/zent-dialog.svg)](https://www.npmjs.com/package/zent-dialog)

弹窗组件

## 使用场景

需要提供一个带有遮罩的弹出窗口

## 使用指南

#### 两种控制方式

1.  命令式, 直接调用 `openDialog` 函数, **不支持 `context`.**

2.  组件式, 通过控制 `visible` 来显示／隐藏对话框, **支持 `context`.**

    **推荐使用命令式, 不需要在外部维护一个 `visible` 属性, 更加方便.**

#### openDialog

`openDialog(options: object): function`

**`options` 参数支持组件除 `visible` 以外的所有属性.**

如果需要组件实例的引用, 可以传一个函数形式的 `ref` 给 `openDialog`, **不支持字符串形式的 `ref`.**

返回值是一个手动关闭 Dialog 的函数 `closeDialog()`, `closeDialog(false)` 将不会触发Dialog的 `onClose` 方法

重复调用 `closeDialog` 等效于执行 `noop` 函数.

#### 指定Dialog宽度

在 `style` 中可以指定弹出窗口的宽度, e.g. `style={{ width: '600px' }}`.

默认情况下弹出窗口会自适应内容的宽度, 同时有最小宽度和最大宽度.

## Component API

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
