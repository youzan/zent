# @youzan/input

通用Input输入组件

[![version][version-image]][download-url]
[![download][download-image]][download-url]

[version-image]: http://npm.qima-inc.com/badge/v/@youzan/input.svg?style=flat-square
[download-image]: http://npm.qima-inc.com/badge/d/@youzan/input.svg?style=flat-square
[download-url]: http://npm.qima-inc.com/package/@youzan/input

组件设计稿在[这里](http://file.qima-inc.com/f/1c1466d69a/)下载

## API

| 参数 | 说明 | 类型 | 默认值 | 备选值 | 是否必填 |
|------|------|------|--------|--------|--------|
| className | 自定义额外类名 | string | '' | '' | 否 |
| prefix | 自定义类前缀 | string | 'zent' | null | 否 |
| type | 自定义类前缀 | string | 'text' | 'number'、'password' | 否 |
| defaultValue | 默认值 | string | null | null | 否 |
| value | 输入值 | string | null | null | 否 |
| onChange | change事件 | func(e:Event) | null | null | 否 |
| readOnly | 是否只读 | bool | false | null | 否 |
| disabled | 是否禁用 | bool | false | null | 否 |
| placeholder | 原生placeholder文案 | string | '' | '' | 否 |
| addonBefore | 前置标签 | node | null | null | 否 |
| addonAfter | 后置标签 | node | null | null | 否 |
| onPressEnter | 回车事件 | func(e:Event) | null | null | 否 |

*除了以上属性外，所有react支持的input属性，Input组件都支持*

**`Input`组件的错误处理遵从`Form`表单的错误处理**