---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic usage
---

```jsx
import { Notify, Button } from 'zent';

ReactDOM.render(
	<div>
		<Button onClick={() => Notify.success('成功通知')}>成功通知</Button>
		<Button onClick={() => Notify.error('错误通知')}>错误通知</Button>
	</div>
	, mountNode
);

```
