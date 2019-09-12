---
order: 2
zh-CN:
  title: 不同的样式
en-US:
  title: Styles
---

```jsx
import { Button, Notice } from 'zent';

const showNotice = type => () => {
	Notice.push(
		<Notice type={type} title={type}>
			{type}
		</Notice>
	);
};

ReactDOM.render(
	<div>
		<Button onClick={showNotice('info')}>Info</Button>
		<Button onClick={showNotice('success')}>Success</Button>
		<Button onClick={showNotice('warning')}>Warning</Button>
		<Button onClick={showNotice('error')}>Error</Button>
	</div>,
	mountNode
);
```
