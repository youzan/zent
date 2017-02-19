<p>
	<a href="https://github.com/youzan/">
		<img alt="有赞logo" width="36px" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan" />
	</a>
</p>

# zent-radio

[![npm version](https://img.shields.io/npm/v/zent-radio.svg?style=flat)](https://www.npmjs.com/package/zent-radio) [![downloads](https://img.shields.io/npm/dt/zent-radio.svg)](https://www.npmjs.com/package/zent-radio)

单选框组件

## 使用指南

RadioGroup 是一个 **[受控组件][controlled-components]**, 必须要设置 `onChange` 回调方法在组件外部处理 `value` 属性的变化.

## 使用场景

需要在多个备选项中选中**单个状态**

## API

### RadioGroup

| 参数           | 说明                | 类型             | 默认值                 |     |     |
| ------------ | ----------------- | -------------- | ------------------- | --- | --- |
| value        | 用于设置当前选中的值        | any            |                     |     |     |
| onChange     | 选项变化时的回调函数        | func(e: event) |                     |     |     |
| isValueEqual | 可选参数，判断value值是否相等 | func(a, b)     | `(a, b) => a === b` |     |     |
| className    | 自定义额外类名           | string         |                     |     |     |
| prefix       | 自定义前缀             | string         | `'zent'`            |     |     |

### Radio

| 参数        | 说明                   | 类型     | 默认值      |
| --------- | -------------------- | ------ | -------- |
| value     | 根据 value 进行比较，判断是否选中 | any    |          |
| className | 自定义额外类名              | string |          |
| prefix    | 自定义前缀                | string | `'zent'` |

[controlled-components]: https://facebook.github.io/react/docs/forms.html#controlled-components
