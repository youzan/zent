---
title: Drawer
subtitle: 抽屉
path: component/drawer
group: 容器
scatter: true
---

## Drawer

屏幕右侧滑出的模态面板；用于承载较大体量的详情或表单内容。

### 建议

- 当操作唤起的临时窗口信息量比较大，需要在纵向的信息上有比较高的扩展性时，可以使用抽屉。

### 注意

- 禁止在抽屉中使用单个按钮；
- 禁止在抽屉中使用两个以上的主行动按钮。

### 代码演示

<!-- demo-slot-1 -->
<!-- demo-slot-3 -->

### API

| 参数         | 说明                                             | 类型                                   | 默认值  | 是否必填 |
| ------------ | ------------------------------------------------ | -------------------------------------- | ------- | -------- |
| onClose      | 关闭 Drawer 的回调                               | `e => void`                            | `noop`  | 否       |
| visible      | Drawer 是否可见                                  | `boolean`                              | `false` | 否       |
| maskClosable | 点击遮罩触发`onClose`                            | `boolean`                              | `false` | 否       |
| closeOnESC   | 按下 ESC 键时触发`onClose`                       | `boolean`                              | `true`  | 否       |
| mask         | 是否显示遮罩                                     | `boolean`                              | `true`  | 否       |
| title        | 标题                                             | `ReactNode`                            | `null`  | 否       |
| footer       | 自定义底部内容                                   | `ReactNode`                            | `null`  | 否       |
| placement    | Drawer 的方向                                    | `top` \| `right` \| `bottom` \| `left` | `right` | 否       |
| width        | 宽度，在 `placement` 为 `left` 或 `right` 时使用 | `string` \| `number`                   | `45%`   | 否       |
| height       | 宽度，在 `placement` 为 `top` 或 `bottom` 时使用 | `string` \| `number`                   | `45%`   | 否       |
| className    | 对话框外层容器的类名                             | `string`                               | `''`    | 否       |
| closeBtn     | 自定义关闭按钮，为`false`会隐藏`closeBtn`        | `ReactNode`                            | `true`  | 否       |
| size         | 预设抽屉宽度，default 728px 和 small 364px       | `'default'`\|`'small'`                 |         | 否       |

Drawer 当不设置`width`、 `size`字段时默认宽度为 45%，当同时设置时字段优先级：`width` > `size`。

#### 以下功能新版设计语言已废弃，仅作为老版使用的参考

<!-- demo-slot-2 -->
<!-- demo-slot-4 -->
