---
title: Button
subtitle: 按钮
path: component/button
group: 数据
---

## Button 按钮

按钮, 提供基础样式及基础状态.

### 使用指南

- 通过 `type` 来控制按钮的样式
- 通过 `size` 控制按钮的大小
- 提供 `'block'`、`'disabled'`、`'loading'` 等修饰状态
- 传入 `href/target`, Button 将渲染为 a 标签, 仍然支持以其他属性控制样式及状态
- 使用 directive 模式来自定义渲染组件

### API

#### Button

| 参数      | 说明                                              | 类型   | 默认值      | 备选值                               |
| --------- | ------------------------------------------------- | ------ | ----------- | ------------------------------------ |
| type      | 风格                                              | string | `'default'` | `'primary'`、`'danger'`、`'success'` |
| size      | 尺寸                                              | string | `'medium'`  | `'large'`、`'small'`                 |
| htmlType  | button 标签原生 type 属性                         | string | `'button'`  | `submit`、`reset`、`button`          |
| block     | 是否以块级元素的形式展开                          | bool   | `false`     |                                      |
| disabled  | 状态控制                                          | bool   | `false`     |                                      |
| loading   | 状态控制                                          | bool   | `false`     |                                      |
| outline   | 边框有颜色，内部没有颜色                          | bool   | `false`     |                                      |
| bordered  | 边框透明控制                                      | bool   | `true`      |                                      |
| 其他参数  |                                                   |        |             |                                      |
| href      | 可选，如果设置的话会用 a 标签而不是 button        | string |             |                                      |
| target    | 可选，和 href 一起使用，就是 a 标签的 target 属性 | string | `''`        | `'_blank'`                           |
| download  | HTML5 的下载功能                                  | string |             |                                      |
| className | 自定义类名                                        | string |             |                                      |
| style     | 自定 style                                        | object |             |                                      |

#### ButtonDirective

这个组件会将 `Button` 的样式渲染到自己的 `children` 上，主要用在需要 `Button` 的样式，但是需要有特殊逻辑的按钮，例如将一个 `react-router` 的 `Link` 渲染成 `Button` 的样式，但是保留 `Link` 自身的功能。API 只支持 `Button` 的样式参数，用法参考 demo。

#### ButtonGroup

| 参数      | 说明       | 类型   | 默认值   | 备选值 |
| --------- | ---------- | ------ | -------- | ------ |
| className | 自定义类名 | string |          |        |
| style     | 自定 style | object |          |        |
