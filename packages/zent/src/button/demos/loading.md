---
order: 3
zh-CN:
	title: 正在加载的状态
	secondary: 次级按钮
	button1: 一级按钮
	button2: 二级按钮
	button3: 三级按钮
en-US:
	title: Loading
	secondary: Secondary
	button1: Third Level
	button2: Second Level
	button3: Third Level
---

```jsx
import { Button } from 'zent';

ReactDOM.render(
	<div>
		<Button loading type="primary">{i18n.button1}</Button>
		<Button loading type="secondary">{i18n.secondary}</Button>
		<Button loading type="danger">{i18n.button1}</Button>
		<Button loading type="success">{i18n.button1}</Button>
		<Button loading type="primary" outline>{i18n.button2}</Button>
		<Button loading type="danger" outline>{i18n.button2}</Button>
		<Button loading type="success" outline>{i18n.button2}</Button>
		<Button loading>{i18n.button3}</Button>
	</div>
	, mountNode
);
```
