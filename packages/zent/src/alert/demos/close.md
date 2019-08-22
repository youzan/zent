---
order: 5
zh-CN:
	title: 关闭按钮及回调
	cbContent: 关闭状态受控
	content: 关闭触发器可自定义
	msg: 公告关闭了
	closeText: 我知道了
	redisplay: 重新显示
en-US:
	title: Close Button And Callback
	cbContent: Close state can be controlled
	content: Custom close trigger
	msg: Alert closed
	closeText: I Know
	redisplay: Redisplay
---

```jsx
import { Alert, Sweetalert } from 'zent';

const Simple = () => {
	const [closed, setClosed] = React.useState(false);

	const onCloseHandler = () => {
		setClosed(true);
		Sweetalert.alert({ content: '{i18n.msg}' });
	}

	return (
		<div className="zent-alert-example">
			<Alert closable closeContent={<a href="javascript:;">{i18n.closeText}</a>}>
				{i18n.content}
			</Alert>
			<Alert closable closed={closed} onClose={onCloseHandler}>
				{i18n.cbContent}
			</Alert>
			<Button onClick={() => setClosed(false)}>{i18n.redisplay}</Button>
		</div>
	)
}

ReactDOM.render(
	<Simple />,
	mountNode
);
```
