---
order: 2
zh-CN:
	title: 自定义通知内容
en-US:
	title: Custom Notify Content
---

```jsx
import { Notify, Button } from 'zent';

function customContent() {
	Notify.success(
		<div>
			<span style={{ color: '#f67' }}>颜色</span>
			<i>斜体</i>
			<b>粗体</b>
		</div>
	);
}

ReactDOM.render(
	<Button onClick={customContent}>自定义内容通知</Button>
	, mountNode
);

```
