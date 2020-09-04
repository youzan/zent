---
title: Drawer
subtitle: 抽屉
path: component/drawer
group: 反馈
---

## Drawer

屏幕边缘滑出的浮层面板。

### API

| 参数           | 说明                 | 类型          | 默认值     | 是否必填 |
|--------------|--------------------|-------------|---------|------|
| onClose      | 关闭drawer的回调        | `e => void` | `noop`  | 否    |
| visible      | Drawer是否可见         | `boolean`   | `false` | 否    |
| maskClosable | 点击遮罩触发onClose      | `boolean`   | `false` | 否    |
| closeOnESC   | 按下 ESC 键时触发onClose | `boolean`   | `true`  | 否    |
| mask         | 是否显示遮罩             | `boolean`   | `true`  | 否    |
| title        | 标题                 | `ReactNode` | `null`  | 否    |
| footer       | 自定义底部内容            | `ReactNode` | `null`  | 否    |
| className    | 对话框外层容器的类名         | `string`    | `''`      | 否    |
