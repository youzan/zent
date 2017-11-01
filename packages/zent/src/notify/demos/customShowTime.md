---
order: 3
zh-CN:
	title: 自定义通知显示时间
en-US:
	title: Custom Notify Show Time
---

```jsx
import { Notify, Button } from 'zent';

ReactDOM.render(
	<div>
		<Button onClick={() => Notify.success('成功通知1s', 1000)}>通知1s</Button>
	</div>
	, mountNode
);

```
