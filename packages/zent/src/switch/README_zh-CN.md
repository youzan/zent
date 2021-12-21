---
title: Switch
subtitle: 开关
path: component/switch
group: 数据
---

## Switch 开关

用于在两个选项之间反复切换。

### 使用指南

需要表示开关状态/两种互斥状态之间的反复切换时。

### API

| 参数      | 说明                                        | 类型                | 默认值      | 备选值    |
| --------- | ------------------------------------------- | ------------------- | ----------- | --------- |
| checked   | 指定当前状态                                | bool                |             |           |
| onChange  | 变化时回调函数, 参数是改变后的 `checked` 值 | func(checked: bool) | `noop`      |           |
| disabled  | 状态控制                                    | bool                | `false`     | `true`    |
| size      | 开关大小                                    | string              | `'default'` | `'small'` |
| className | 自定义额外类名                              | string              | `''`        |           |
| loading   | 加载中状态                                  | bool                | `false`     | `true`    |
