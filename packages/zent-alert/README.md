## zent-alert

公告，提供一个醒目的提示信息。

### 使用指南

-  内容文字尽可能精简, 减少阅读障碍。
-  公告类按钮不要多于两个, 保持逻辑简单。

### 示例

:::demo 基础用法
```js
import { Alert } from 'zent';

ReactDOM.render(
	<Alert>交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。</Alert>
	,mountNode
);
```
:::

:::demo 公告内容可以是非字符串
```js
import { Alert, Icon } from 'zent';

ReactDOM.render(
	<Alert>
		<Icon type="error-circle" />
		<span>警告：6月15日起，交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。</span>
		<a href="//youzan.com" target="_blank">立即订购</a>
	</Alert>
	, mountNode
)
```
:::


:::demo 三种样式：`info`, `warning`和`danger`
```js
import { Alert } from 'zent';

ReactDOM.render(
	<div className="zent-alert-example">
		<Alert type="info">交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。</Alert>
		<Alert type="warning">交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。</Alert>
		<Alert type="danger">交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。</Alert>
	</div>
	, mountNode
);
```
:::

:::demo 公告有两种大小
```js
import { Alert } from 'zent';

ReactDOM.render(
	<div className="zent-alert-example">
		<Alert>交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。</Alert>
		<Alert size="large">交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。</Alert>
	</div>
	, mountNode
)
```
:::

:::demo 支持圆角样式
```js
import { Alert } from 'zent';

ReactDOM.render(
	<Alert type="warning" rounded>交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。</Alert>
	, mountNode
)
```
:::

:::demo 关闭按钮
```js
import { Alert, Sweetalert } from 'zent';

ReactDOM.render(
	<Alert 
		type="info" 
		closable 
		onClose={() => Sweetalert.alert({ content: '公告关闭了' })}
	>
		交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。
	</Alert>
	, mountNode
)
```
:::

### API

| 参数    |   说明          | 类型     | 默认值        | 备选值            |
| --------- | ------------- | ------ | ---------- | --------------------------------- |
| type      | 警告提示的样式  | string | `'info'`   | `'info'`, `'warning'`, `'danger'` |
| size      | alert的大小 | string | `'normal'` | `'normal'`, `'large'`             |
| rounded   | 是否圆角     | bool   | `false`    |   `true`, `false`                   |
| closable  | 默认不可关闭   | bool   | `false`    |    `true`, `false`                |
| onClose   | 关闭时的回调   | func   | `noop`     |                                   |
| className | 自定义额外类名  | string | `''`       |                                   |
| prefix    | 自定义前缀    | string | `'zent'`   |                                   |


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

.zenticon-error-circle {
    color: #FF4343;
	margin-right: 5px;
}

</style>
