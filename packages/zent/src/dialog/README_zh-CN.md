---
title: Dialog
subtitle: 对话窗
path: component/dialog
group: 容器
scatter: true
---

## Dialog 对话窗

带背景遮罩的模态窗；常用于承载中小体量的详情、表单，或者必须由用户确认的结果反馈。

### 建议

- 当需要提供一些关键信息，或要求用户做出决策时，可以使用对话窗；

### 注意

- 禁止在模态对话窗中使用单个按钮；
- 禁止在模态对话窗中使用两个以上的主行动按钮。

### 使用指南

- 命令式, 直接调用 `openDialog` 函数。

- 组件式, 通过控制 `visible` 来显示／隐藏对话窗。

- 推荐使用命令式, 不需要在外部维护一个 `visible` 属性, 更加方便。

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-3 -->

### API

| 参数         | 说明                              | 类型              | 默认值  |
| ------------ | --------------------------------- | ----------------- | ------- |
| title        | 自定义弹框标题                    | `ReactNode`       | `''`    |
| children     | 弹框内容: `<Dialog>xxxx</Dialog>` | `ReactNode`       | `null`  |
| footer       | 底部内容                          | `ReactNode`       | `null`  |
| visible      | 是否打开对话窗                    | `boolean`         | `false` |
| closeBtn     | 是否显示右上角关闭按钮            | `boolean`         | `true`  |
| onClose      | 关闭操作回调函数                  | `(event) => void` | `noop`  |
| onOpened     | 对话窗打开动画结束后的回调函数    | `() => void`      |         |
| onClosed     | 对话窗关闭动画结束后的回调函数    | `() => void`      |         |
| mask         | 是否显示遮罩                      | `boolean`         | `true`  |
| maskClosable | 点击遮罩是否可以关闭              | `boolean`         | `true`  |
| className    | 自定义额外类名                    | `string`          | `''`    |
| style        | 自定义样式                        | `CSSProperties`   | `{}`    |

#### openDialog

`openDialog(options: Partial<IOpenDialogOption>): () => void`

**`options` 参数支持组件除 `visible` 以外的所有属性，外加以下参数：**

| 参数            | 说明                                                             | 类型          | 默认值            |
| --------------- | ---------------------------------------------------------------- | ------------- | ----------------- |
| dialogId        | 可选，对话窗的 ID，可以通过 `closeDialog(dialogId)` 来关闭对话窗 | string        | 随机生成的唯一 ID |
| parentComponent | 可选，父组件的引用, 用于关联 context                             | ReactInstance |                   |

如果需要组件实例的引用, 可以传一个函数形式的 `ref` 给 `openDialog`, **不支持字符串形式的 `ref`.**

> `openDialog` 的返回值是一个手动关闭 Dialog 的函数, `close(false)` 将不会触发 Dialog 的 `onClose` 方法。

#### closeDialog

`closeDialog(dialogId: string, options: object): void`

`dialogId` 对应调用 `openDialog` 时传的参数。

`options.triggerOnClose` 如果是 `true`，关闭时会触发 `onClose` 回调，`false` 时不会触发。

#### 指定 Dialog 宽度

在 `style` 中可以指定弹出窗口的宽度, e.g. `style={{ width: '600px' }}`.

默认情况下弹出窗口会自适应内容的宽度, 同时有最小宽度和最大宽度.

#### 以下功能新版设计语言已废弃，仅作为老版使用的参考

<!-- demo-slot-4 -->
<!-- demo-slot-5 -->
