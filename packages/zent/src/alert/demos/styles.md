---
order: 2
zh-CN:
  title: "四种样式：info, success, warning 和 error"
	info: 这个是默认的 info 样式
	success: 这个是 success 样式
	warning: 这个是 warning 样式
	error: 这个是 error 样式
en-US:
  title: "Four styles: info, success, warning and error"
	info: Default info style
	success: Success style
	warning: Warning style
	error: Error style
---

```jsx
import { Alert } from 'zent';

ReactDOM.render(
	<div className="zent-alert-example">
		<Alert type="info">{i18n.info}</Alert>
		<Alert type="success">{i18n.success}</Alert>
		<Alert type="warning">{i18n.warning}</Alert>
		<Alert type="error">{i18n.error}</Alert>
	</div>,
	mountNode
);
```

<style>
.zent-alert-example .zent-alert {
	margin-bottom: 16px;
}
</style>
