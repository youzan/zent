<p>
	<a href="https://github.com/youzan/">
		 <img alt="有赞logo" width="36px" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan" />
	</a>
</p>

# zent-button

[![npm version](https://img.shields.io/npm/v/zent-button.svg?style=flat)](https://www.npmjs.com/package/zent-button) [![downloads](https://img.shields.io/npm/dt/zent-button.svg)](https://www.npmjs.com/package/zent-button)

按钮组件, 提供基础样式及基础状态.

## 使用指南

* 通过 `type` 来控制按钮的样式
* 通过 `size` 控制按钮的大小.
* 提供 `'block'`、`'disabled'`、`'loading'` 等修饰状态.
* 传入 `href/target`, Button 将渲染为a标签, 仍然支持以其他属性控制样式及状态.

## API

| 参数       | 说明           | 类型     | 默认值       | 备选值                                           |
| ------    | ------       | ------ | --------  | --------                                      |
| type      | 风格           | string | `'default'` | `'primary'`、`'danger'`、`'success'` |
| size      | 尺寸           | string | `'medium'`  | `'large'`、`'small'`                      |
| block     | 是否以块级元素的形式展开 | bool   | `false`     |                                   |
| disabled  | 状态控制         | bool   | `false`     |                                    |
| loading   | 状态控制         | bool   | `false`     |                                    |
| outline   | 边框有颜色，内部没有颜色 | bool   | `false`     |                                   |
| bordered  | 边框透明控制       | bool   | `true`      |                                 |
| 其他参数 | | | | |
| component | 自定义组件标签类型    | string |       |                                           |
| href | 可选，如果设置的话会用a标签而不是button | string | | |
| target | 可选，和href一起使用，就是a标签的target属性 | string | `''` | `'_blank'` |
| className | 自定义类名        | string |         |                                           |
| prefix    | 自定义前缀        | string | `'zent'`    |                                      |
