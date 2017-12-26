---
order: 3
zh-CN:
  title: "三种样式：info, warning 和 danger"
	info: 这个是默认的 info 样式。
	warning: 这个是 warning 样式。
	danger: 这个是 danger 样式。
en-US:
  title: "Three styles: info, warning and danger"
	info: Default info style
	warning: Warning style
	danger: Danger style
---

```jsx
import { Alert } from 'zent';

ReactDOM.render(
	<div className="zent-alert-example">
		<Alert type="info">{i18n.info}</Alert>
		<Alert type="warning">{i18n.warning}</Alert>
		<Alert type="danger">{i18n.danger}</Alert>
	</div>
	, mountNode
);
```
