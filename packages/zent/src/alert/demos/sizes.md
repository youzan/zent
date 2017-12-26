---
order: 4
zh-CN:
  title: 公告有两种大小
	msg1: 这个是正常尺寸的公告。
	msg2: 这个是大尺寸
	msg3: 交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。
	msg4: "官方咨询电话：0571-88888888"
en-US:
  title: Two different sizes
	msg1: This is normal size.
	msg2: This is large size.
	msg3: Messages during the transacation will be pushed through the Marketing Center.
	msg4: "Tel: 0571-88888888"
---

```jsx
import { Alert } from 'zent';

ReactDOM.render(
	<div className="zent-alert-example">
		<Alert>{i18n.msg1}</Alert>
		<Alert size="large">
			<p className="text">{i18n.msg2}</p>
			<p>{i18n.msg3}</p><br />
			<p>{i18n.msg4}</p>
		</Alert>
	</div>
	, mountNode
)
```

<style>
.zent-alert-example {
    padding-right: 32px;

    .zent-alert {
        margin-bottom: 20px;

        &:last-child {
            margin-bottom: 0;
        }

        a {
            color: #3388FF;
            margin-left: 10px;
        }
    }
}
</style>
