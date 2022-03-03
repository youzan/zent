---
title: Input
subtitle: 输入框
path: component/input
group: 信息录入
---

## Input 输入框

矩形的框，支持文本输入

### 使用指南

- 在表单输入时使用，可带前缀或后缀。
- 可与其它组件组合使用，如组合成一个搜索输入框

### API

| 参数               | 说明                                                                    | 类型             | 默认值     | 备选值                                 | 是否必填 |
| ------------------ | ----------------------------------------------------------------------- | ---------------- | ---------- | -------------------------------------- | -------- |
| className          | 自定义额外类名                                                          | string           |            |                                        | 否       |
| width              | 宽度                                                                    | string or number |            |                                        | 否       |
| type               | 类型                                                                    | string           | `'text'`   | `'number'`、`'password'`、`'textarea'` | 否       |
| inline             | 是否行内展示                                                            | bool             | `false`    | `true`                                 | 否       |
| widthSize          | 宽度size(优先级较低，可以通过增加style，className覆盖)                  			| string           | `'s'` | `'xs'` \| `'m'`    \| `'l'`\| `'xl'`             | 否       |
| size               | 大小（高度），宽度可以通过 width 控制                                   | string           | `'normal'` | `'large'` \| `'small'`                 | 否       |
| defaultValue       | 默认值                                                                  | string           |            |                                        | 否       |
| value              | 输入值                                                                  | string           |            |                                        | 否       |
| readOnly           | 是否只读                                                                | bool             | `false`    |                                        | 否       |
| disabled           | 是否禁用                                                                | bool             | `false`    |                                        | 否       |
| placeholder        | 原生 placeholder 文案                                                   | string           | `''`       |                                        | 否       |
| showClear          | 显示清除按钮                                                            | bool             | `false`    |                                        | 否       |
| addonBefore        | 前置标签                                                                | node             |            |                                        | 否       |
| addonAfter         | 后置标签                                                                | node             |            |                                        | 否       |
| autoFocus          | 自动 focus                                                              | bool             | `false`    |                                        | 否       |
| autoSelect         | 自动 select                                                             | bol              | `false`    |                                        | 否       |
| initSelectionStart | 初始被选中的第一个字符的位置                                            | number           |            |                                        | 否       |
| initSelectionEnd   | 初始被选中的最后一个字符的下一个位置。                                  | number           |            |                                        | 否       |
| onChange           | change 事件回调函数，`e.fromClearButton` 为 `true` 说明事件来自清空按钮 | func(e:Event)    |            |                                        | 否       |
| onPressEnter       | 回车事件                                                                | func(e:Event)    |            |                                        | 否       |
| icon               | 图标                                                                    | string           |            |                                        | 否       |
| iconPostion        | 图标位置                                                                  | string           |   `end`       |  `front`                                        | 否       |
| onIconClick        | 图标点击事件                                                            | func(e:Event)    |            |                                        | 否       |

_除了以上属性外，所有 react 支持的 input 属性，Input 组件都支持_

#### textarea

| 参数              | 说明         | 类型   | 默认值 | 备选值 | 是否必填 |
| ----------------- | ------------ | ------ | ------ | ------ | -------- |
| maxLength         | 最大长度     | number |        |        | 否       |
| showCount         | 显示计数     | bool   | false  |        | 否       |
| autoSize          | 自动高度     | bool   | false  |        | 否       |
| maxCharacterCount | 校验最大长度 | number |        |        | 否       |

#### focus

`focus(): void`

手动聚焦到输入框

### select

`select(): void`

选中输入框内所有内容

`select(selectionStart?: number, selectionEnd?: number): void`

选中区间范围在[selectionStart, selectionEnd]里的内容

<style>
.zent-input-wrapper {
    width: 240px;
    margin-bottom: 20px;
}
</style>
