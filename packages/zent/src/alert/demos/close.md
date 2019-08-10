---
order: 5
zh-CN:
	title: 关闭按钮及回调
	cbContent: 这个公告关闭时有回调函数
	content: 关闭触发器可自定义
	msg: 公告关闭了
	closeText: 我知道了
en-US:
	title: Close Button And Callback
	cbContent: This Alert has a close callback
	content: Custom close trigger
	msg: Alert closed
	closeText: I Know
---

```jsx
import { Alert, Sweetalert } from 'zent';

ReactDOM.render(
	<div className="zent-alert-example">
		<Alert closable onClose={() => Sweetalert.alert({ content: '{i18n.msg}' })}>
			{i18n.cbContent}
		</Alert>
		<Alert closable closeContent={<a href="javascript:;">{i18n.closeText}</a>}>
			{i18n.content}
		</Alert>
	</div>,
	mountNode
);
```
