---
order: 1
zh-CN:
	title: 基础用法
	name: 请输入名字
	password: 请输入密码
en-US:
	title: Basic usage
	name: Please enter your name
	password: Please enter your password
---

```jsx
import { Input } from 'zent';

ReactDOM.render(
  <div>
      <Input placeholder="{i18n.name}" />
      <Input type="password" placeholder="{i18n.password}" />
  </div>
  , mountNode
);
```
