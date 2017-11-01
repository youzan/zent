---
order: 5
zh-CN:
	title: 清除屏幕所有通知
en-US:
	title: Clear all nofications in screen
---

```jsx
import { Notify, Button } from 'zent';

function closeCallback() {
	alert('Callback has call');
}

ReactDOM.render(
	<div>
		<Button onClick={() => Notify.success('成功通知', 2000, closeCallback)}>成功通知</Button>
		<Button onClick={() => Notify.clear()}>清除通知</Button>
	</div>
	, mountNode
);

```
