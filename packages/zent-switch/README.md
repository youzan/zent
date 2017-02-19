<p>
	<a href="https://github.com/youzan/">
		<img alt="有赞logo" width="36px" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan" />
	</a>
</p>

# zent-switch

[![npm version](https://img.shields.io/npm/v/zent-switch.svg?style=flat)](https://www.npmjs.com/package/zent-switch) [![downloads](https://img.shields.io/npm/dt/zent-switch.svg)](https://www.npmjs.com/package/zent-switch)

开关组件

## 使用场景

需要表示开关状态/两种状态之间的切换时

## 使用指南

支持 `size`, `disabled`, `checked` 等状态自定义, 及 `onChange` 回调方法自定义.

-   `size` 控制开关的大小

-   支持 `disabled`, `checked` 等状态属性.

-   当状态改变后, 会调用可选的自定义 `onChange` 回调.

## API

| 参数            | 说明                           | 类型                  | 默认值         | 备选值       |
| ------------- | ---------------------------- | ------------------- | ----------- | --------- |
| checked       | 指定当前状态                       | bool                | `false`     |           |
| onChange      | 变化时回调函数, 参数是改变后的 `checked` 值 | func(checked: bool) | `noop`      |           |
| disabled      | 状态控制                         | bool                | `false`     |           |
| checkedText   | 选中时的文案                       | string              | `'开启'`      |           |
| uncheckedText | 未选中时的文案                      | string              | `'关闭'`      |           |
| loading       | 加载中状态                        | bool                | `false`     |           |
| size          | 开关大小                         | string              | `'default'` | `'small'` |
| className     | 自定义额外类名                      | string              | `''`        |           |
| prefix        | 自定义前缀                        | string              | `'zent'`    |           |
