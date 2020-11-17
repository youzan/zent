---
title: AnimateHeight
subtitle: 高度渐变
path: component/animate-height
group: 反馈
---

## AnimateHeight 高度渐变

将容器以动画形式渐变为指定的高度。

将高度渐变为自适应的目标高度是无法使用 CSS 动画实现的，这种场景必须用 JavaScript 代码的方式来实现。

### API

| 参数      | 说明                          | 类型                 | 必填 | 默认值   | 备选值                                        |
| --------- | ----------------------------- | -------------------- | ---- | -------- | --------------------------------------------- |
| height    | 目标高度                      | `string` \| `number` | 是   |          |                                               |
| duration  | 动画时长                      | `number`             | 否   | 200      |                                               |
| easing    | 动画的中间值计算函数          | `string`             | 否   | `ease`   | 参考 CSS 的 `transition-timing-function` 属性 |
| appear    | 是否在首次渲染时应用动画效果  | `boolean`            | 否   | `false`  | `true`                                        |
| className | 自定义额外类名                | `string`             | 否   |          |                                               |
| style     | 自定义样式                    | `CSSProperties`      | 否   |          |                                               |
| overflow  | CSS `overflow` 属性的快捷方式 | `string`             | 否   | `hidden` | `auto` \| `scroll`                            |
