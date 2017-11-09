---
order: 5
zh-CN:
	title: 自定义通知结束回调
	name: 自定义通知结束回调
	content: 通知结束回调函数
en-US:
	title: Custom callback after Notify is finished
	name: Custom callback after Notify is finished
	content: callback when notify is finished

---

```jsx
import { Notify, Button } from 'zent';

function closeCallback() {
	alert('Notify has over');
}

ReactDOM.render(
	<Button onClick={() => Notify.success('{i18n.content}', 1000, closeCallback)}>{i18n.name}</Button>
	, mountNode
);

```
