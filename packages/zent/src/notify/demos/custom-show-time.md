---
order: 3
zh-CN:
	title: 自定义通知显示时间
	name: 持续1s
	content: 成功通知1s
	
en-US:
	title: Custom Notify Show Time
	name: duration 1s
	content: success duration 1s

---

```jsx
import { Notify, Button } from 'zent';

ReactDOM.render(
	<div>
		<Button onClick={() => Notify.success('{i18n.name}', 1000)}>{i18n.name}</Button>
	</div>
	, mountNode
);

```
