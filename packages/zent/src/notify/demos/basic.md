---
order: 1
zh-CN:
	title: 基础用法
	success: 成功通知
	error: 错误通知
en-US:
	title: Basic usage
	success: success
	error: error
---

```jsx
import { Notify, Button } from 'zent';

ReactDOM.render(
	<div>
		<Button onClick={() => Notify.success('{i18n.success}')}>{i18n.success}</Button>
		<Button onClick={() => Notify.error('{i18n.error}')}>{i18n.error}</Button>
	</div>
	, mountNode
);

```
