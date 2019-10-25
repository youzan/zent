---
title: IMEComposition
subtitle: 输入法合成
path: component/ime-composition
group: 基础
---

## IMEComposition

`IMEComposition` 的子 `Input` 组件在输入法输入时的 `onChange` 事件，使其不会在每次输入时都被触发，而是在输入完成后才被触发。

注意：仅有受控组件才会被处理。

### API

| 参数   | 说明             | 类型 | 是否必须 | 默认值 | 备选值 |
| ------ | ---------------- | ---- | -------- | ------ | ------ |
| enable | 是否启用输入合成 | bool | 否       | false  |        |
