# zent-sweetalert

[![npm version](https://img.shields.io/npm/v/zent-sweetalert.svg?style=flat)](https://www.npmjs.com/package/zent-sweetalert) [![downloads](https://img.shields.io/npm/dt/zent-sweetalert.svg)](https://www.npmjs.com/package/zent-sweetalert)

提示与确认组件

## 使用指南

**组件不提供个性化选项**, 如有需要请使用 zent-dialog.

#### 返回值

`alert` 和 `confirm` 的返回值都是用来手动关闭对话框的函数.

#### 事件回调

`onConfirm` & `onCancel` 都表现为 `function(close?: func): Promise?` 形式.

接受一个可选的参数 `close`, 用来关闭对话框. 可以返回一个 `Promise`.

如果返回值是 `Promise`, 对应的按钮会在 `Promise` pending 时保持在 loading 状态.

根据函数参数及返回值的不同, 分为几种情况:

1.  没有 `callback` 属性

    点击后直接关闭.

2.  有 `callback` 属性, 但是 `callback` 函数无参数

    点击后调用 `callback`.

    -   返回值是 `Promise`, resolve 后关闭.
    -   返回值不是 `false`, 直接关闭.
    -   返回值是`false`, 对话框不关闭.

3.  有 `callback` 属性, 并且函数有 `close` 参数

    调用 `callback` 并将 `close` 作为参数传递.

    -   返回值是 `Promise`, resolve 后关闭.
    -   返回值为其他类型, 不会自动关闭, 需要外部调用 `close`.

#### 新版UI规范建议

-   弹窗包含取消按钮时，右上角的叉号不显示.
-   重要操作的按钮应该在左侧.

#### 示例

```js
Sweetalert.alert(config: object): function

// 这个别名只为兼容老版本，不要使用！
Sweetalert.info(config) // alias to alert, deprecated!
```

```js
Sweetalert.confirm(config: object): function
```

## API

### Alert

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
| --- | ---- | --- | --- | --- |
| content     | 可选, 弹窗中的内容                              | node   |          |                                               |
| type        | 可选, 弹窗的类型, 设置会在title左边显示一个小图标, 不传不会显示图标 | string |          | `'info'`, `'success'`, `'error'`, `'warning'` |
| title       | 可选, 弹窗的标题                               | node   | `''`     |                                               |
| onConfirm   | 可选, 确认操作回调函数                            | func   | `noop`   |                                               |
| confirmText | 可选, 确认按钮文案                              | string | `'取消'`   |                                               |
| className   | 可选, 额外的className                        | string | `''`     |                                               |
| prefix      | 可选, 默认className的前缀                      | string | `'zent'`|     |

### Confirm

| 参数          | 说明                                      | 类型     | 默认值      | 备选值                                           |
| ----------- | --------------------------------------- | ------ | -------- | --------------------------------------------- |
| content     | 可选, 弹窗中的内容                              | node   |          |                                               |
| type        | 可选, 弹窗的类型, 设置会在title左边显示一个小图标, 不传不会显示图标 | string |          | `'info'`, `'success'`, `'error'`, `'warning'` |
| title       | 可选, 弹窗的标题                               | node   | `''`     |                                               |
| onCancel    | 可选, 取消操作回调函数                            | func   | `noop`   |                                               |
| onConfirm   | 可选, 确认操作回调函数                            | func   | `noop`   |                                               |
| cancelText  | 可选, 取消按钮文案                              | string | `'取消'`   |                                               |
| confirmText | 可选, 确认按钮文案                              | string | `'确认'`   |                                               |
| className   | 可选, 额外的className                        | string | `''`     |                                               |
| prefix      | 可选, 默认className的前缀                      | string | `'zent'` |                                               |
