# zent-sweetalert

React版的`window.alert`和`window.confirm`.

如果你需要个性化的`Dialog`请直接使用`Dialog`，这个包的API不会提供个性化选项。

## API

### 提示对话框

```
Sweetalert.alert(config: object): function

// 这个别名只为兼容老版本，不要使用！
Sweetalert.info(config) // alias to alert, deprecated!
```

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| content    | 可选，弹窗中的内容    | node   |       |  |
| type       | 可选，弹窗的类型，设置会在title左边显示一个小图标，不传不会显示图标 | string | undefined | 'info', 'success', 'error', 'warning' |
| title      | 可选，弹窗的标题      | node   | ''    |  |
| onConfirm  | 可选，确认操作回调函数 | func   | noop  |  |
| confirmText | 可选，确认按钮文案    | string | '取消' |  |
| className   | 可选，额外的className | string | '' | |
| prefix      | 可选, 默认className的前缀 | string | 'zent' | |


### 确认对话框

```
Sweetalert.confirm(config: object): function
```

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| content | 可选，弹窗中的内容 | node |  |  |
| type       | 可选，弹窗的类型，设置会在title左边显示一个小图标，不传不会显示图标 | string | undefined | 'info', 'success', 'error', 'warning' |
| title      | 可选，弹窗的标题      | node   | ''    |  |
| onCancel | 可选，取消操作回调函数 | func | 空函数 |  |
| onConfirm | 可选，确认操作回调函数 | func | 空函数 |  |
| cancelText | 可选，取消按钮文案 | string | '取消' |  |
| confirmText | 可选，确认按钮文案 | string | '确认' |  |
| className   | 可选，额外的className | string | '' | |
| prefix      | 可选，默认className的前缀 | string | 'zent' | |


### 返回值

`alert`和`confirm`的返回值都是用来手动关闭对话框的函数。

### 关于onConfirm and onCancel

`function(close?: func): Promise?`

都接受一个可选的参数`close`，用来关闭对话框。可以返回一个`Promise`。

根据函数参数及返回值的不同，分为几种情况：

1. `callback`没传: 点了按钮后直接关闭。
2. 有`callback`，但是`callback`函数无参数: 调用`callback`，如果返回值是个`Promise`，resolve后关闭，否则如果返回值不是`false`直接关闭，如果返回值是`false`对话框不关闭。
3. 有`callback`，并且`callback`接受`close`参数: 调用`callback`并将`close`作为参数传给它，如果返回值是个`Promise`，resolve后关闭，否则不自动关闭，需要外部自己去调用`close`。

如果返回值是`Promise`，对应的按钮会在`Promise`未完成前显示为loading状态。

---

##  新版UI规范建议

+ 弹窗包含取消操作的按钮时，右上角的叉号不应显示
+ 重要操作的按钮应该在左侧，而不是右侧
