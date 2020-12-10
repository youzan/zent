---
order: 1
zh-CN:
	title: 基础用法
	name: 请输入名字
	password: 请输入密码
	icon: 带Icon的input
en-US:
	title: Basic usage
	name: Please enter your name
	password: Please enter your password
	icon: With icon
---

```jsx
import { Input } from 'zent';

ReactDOM.render(
	<div>
		<Input placeholder="{i18n.name}" />
		<Input type="password" placeholder="{i18n.password}" />
		<Input icon="search" placeholder="{i18n.icon}" />
		<Input inline placeholder="inline-flex" style={{ marginRight: 16 }} />
		<Input inline placeholder="inline-flex" />
	</div>,
	mountNode
);
```
