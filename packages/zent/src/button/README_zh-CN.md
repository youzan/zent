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
- 通过 `size` 控制按钮的大小.
- 提供 `'block'`、`'disabled'`、`'loading'` 等修饰状态.
- 传入 `href/target`, Button 将渲染为 a 标签, 仍然支持以其他属性控制样式及状态.

### API

#### Button

| 参数        | 说明                                               | 类型         | 默认值      | 备选值                               |
| ----------- | -------------------------------------------------- | ------------ | ----------- | ------------------------------------ |
| type        | 风格                                               | string       | `'default'` | `'primary'`、`'danger'`、`'success'` |
| size        | 尺寸                                               | string       | `'medium'`  | `'large'`、`'small'`                 |
| htmlType    | button 标签原生 type 属性                          | string       | `'button'`  | `submit`、`reset`、`button`          |
| block       | 是否以块级元素的形式展开                           | bool         | `false`     |                                      |
| disabled    | 状态控制                                           | bool         | `false`     |                                      |
| loading     | 状态控制                                           | bool         | `false`     |                                      |
| outline     | 边框有颜色，内部没有颜色                           | bool         | `false`     |                                      |
| bordered    | 边框透明控制                                       | bool         | `true`      |                                      |
| 其他参数    |                                                    |              |             |                                      |
| component   | 自定义组件标签类型                                 | string\|func |             |                                      |
| href        | 可选，如果设置的话会用 a 标签而不是 button         | string       |             |                                      |
| target      | 可选，和 href 一起使用，就是 a 标签的 target 属性  | string       | `''`        | `'_blank'`                           |
| insertSpace | 可选，当内容为两个中文字符时是否在中间插入一个空格 | bool         | `false`     | `true`                               |
| className   | 自定义类名                                         | string       |             |                                      |
| style       | 自定 style                                         | object       |             |                                      |
| prefix      | 自定义前缀                                         | string       | `'zent'`    |                                      |

#### Button.Group

| 参数      | 说明       | 类型   | 默认值   | 备选值 |
| --------- | ---------- | ------ | -------- | ------ |
| className | 自定义类名 | string |          |        |
| style     | 自定 style | object |          |        |
| prefix    | 自定义前缀 | string | `'zent'` |
