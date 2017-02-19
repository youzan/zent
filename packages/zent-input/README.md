<p>
	<a href="https://github.com/youzan/">
		<img alt="有赞logo" width="36px" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan" />
	</a>
</p>

# zent-input

[![npm version](https://img.shields.io/npm/v/zent-input.svg?style=flat)](https://www.npmjs.com/package/zent-input) [![downloads](https://img.shields.io/npm/dt/zent-input.svg)](https://www.npmjs.com/package/zent-input)

输入组件

## API

| 参数           | 说明              | 类型            | 默认值      | 备选值                     | 是否必填 |
| ------------ | --------------- | ------------- | -------- | ----------------------- | ---- |
| className    | 自定义额外类名         | string        | `''`     |                         | 否    |
| prefix       | 自定义类前缀          | string        | `'zent'` |                         | 否    |
| type         | 自定义类前缀          | string        | `'text'` | `'number'`、`'password'` | 否    |
| defaultValue | 默认值             | string        |          |                         | 否    |
| value        | 输入值             | string        |          |                         | 否    |
| onChange     | change事件        | func(e:Event) |          |                         | 否    |
| readOnly     | 是否只读            | bool          | `false`  |                         | 否    |
| disabled     | 是否禁用            | bool          | `false`  |                         | 否    |
| placeholder  | 原生placeholder文案 | string        | `''`     |                         | 否    |
| addonBefore  | 前置标签            | node          |          |                         | 否    |
| addonAfter   | 后置标签            | node          |          |                         | 否    |
| onPressEnter | 回车事件            | func(e:Event) |          |                         | 否    |

_除了以上属性外，所有react支持的input属性，Input组件都支持_

**`Input` 组件的错误处理遵从 `Form` 表单的规范**
