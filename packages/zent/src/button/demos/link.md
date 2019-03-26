---
order: 7
zh-CN:
	title: 将按钮变成链接, 只需要提供`href`属性，并可以通过`target`属性控制打开方式
	index: 有赞首页
	newWindow: 新窗口打开
en-US:
	title: Only the `href` property is needed to be set to turn a button to a link, and the `target` property specifies where to open.
	index: Index
	newWindow: Open in a new window
---

```jsx
import { Button, Alert } from 'zent';

ReactDOM.render(
	<div>
		<Button href="https://youzan.com">{i18n.index}</Button>
		<Button href="https://youzan.com" target="_blank">{i18n.newWindow}</Button>
	</div>
	, mountNode
);
```
