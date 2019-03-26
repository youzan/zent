---
order: 2
zh-CN:
	title: 风格
	button1: 一级按钮
	button2: 二级按钮
	button3: 三级按钮
en-US:
	title: Style
	button1: Third Level
	button2: Second Level
	button3: Third Level
---

```jsx
import { Button } from 'zent';

ReactDOM.render(
	<div>
		<Button type="primary">{i18n.button1}</Button>
		<Button type="primary" outline>{i18n.button2}</Button>
		<Button type="danger">{i18n.button1}</Button>
		<Button type="danger" outline>{i18n.button2}</Button>
		<Button type="success">{i18n.button1}</Button>
		<Button type="success" outline>{i18n.button2}</Button>
		<Button>{i18n.button3}</Button>
	</div>
	, mountNode
);
```
