---
order: 6
zh-CN:
	title: 关闭按钮
	msg1: 交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。
	msg2: 官方咨询电话：0571-88888888
	msg3: 了解详情
en-US:
	title: Close button
	msg1: Messages during the transacation will be pushed through the Marketing Center.
	msg2: "Tel: 0571-88888888"
	msg3: Learn more
---

```jsx
import { Alert, Button } from 'zent';

ReactDOM.render(
	<Alert size="large" closable>
		<div className="content">
			<p className="text">{i18n.msg1}</p>
			<p>{i18n.msg2}</p>
		</div>
		<br />
		<Button>{i18n.msg3}</Button>
	</Alert>
	, mountNode
)
```
