---
order: 4
zh-CN:
	title: 自定义通知结束回调
en-US:
	title: Custom callback after Notify is finished
---

```jsx
import { Notify, Button } from 'zent';

function closeCallback() {
	alert('Notify has over');
}

ReactDOM.render(
	<Button onClick={() => Notify.success('通知结束回调函数', 1000, closeCallback)}>自定义通知结束回调</Button>
	, mountNode
);

```
