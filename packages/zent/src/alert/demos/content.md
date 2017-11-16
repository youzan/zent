---
order: 2
zh-CN:
	title: 公告内容可以是非字符串
	warnning: 警告：交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。
	buy: 立即订购
en-US:
	title: Support React Component as content of Alert
	warnning: Warning! SMS notifications in the process of trading, will be pushed by news push function of marketing center.
	buy: Buy Now
---

```jsx
import { Alert, Icon } from 'zent';

ReactDOM.render(
	<Alert>
		<Icon type="error-circle" />
		<span>{i18n.warnning}</span>
		<a href="" onClick={e => e.preventDefault()}>{i18n.buy}</a>
	</Alert>
	, mountNode
)
```

<style>
.zenticon-error-circle {
	color: #FF4343;
	margin-right: 5px;
}
</style>
