## Alert 公告

公告，提供一个醒目的提示信息。

### 使用指南

-  内容文字尽可能精简, 减少阅读障碍。
-  公告类按钮不要多于两个, 保持逻辑简单。

### 代码演示

:::demo 基础用法
```js
import { Alert } from 'zent';

ReactDOM.render(
	<Alert>公告内容。</Alert>
	, mountNode
);
```
:::

:::demo 公告内容可以是非字符串
```js
import { Alert, Icon } from 'zent';

ReactDOM.render(
	<Alert>
		<Icon type="error-circle" />
		<span>警告：交易过程中的短信通知，将通过营销中心的“消息推送”功能来发送。</span>
		<a href="//youzan.com" target="_blank">立即订购</a>
	</Alert>
	, mountNode
)
```
:::


:::demo 三种样式：`info`, `warning` 和 `danger`
```js
import { Alert } from 'zent';

ReactDOM.render(
	<div className="zent-alert-example">
		<Alert type="info">这个是默认的 info 样式。</Alert>
		<Alert type="warning">这个是 warning 样式。</Alert>
		<Alert type="danger">这个是 danger 样式。</Alert>
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
		<Alert>这个时正常尺寸的公告。</Alert>
		<Alert size="large">这个是大号的公告。</Alert>
	</div>
	, mountNode
)
```
:::

:::demo 支持圆角样式
```js
import { Alert } from 'zent';

ReactDOM.render(
	<Alert type="warning" rounded>这个公告是有圆角的。</Alert>
	, mountNode
)
```
:::

:::demo 关闭按钮
```js
import { Alert, Sweetalert } from 'zent';

ReactDOM.render(
	<Alert type="info" closable >这个公告可以关闭。</Alert>
	, mountNode
)
```
:::

:::demo 关闭时的回掉
```js
import { Alert, Sweetalert } from 'zent';

ReactDOM.render(
	<Alert 
		type="info" 
		closable
		onClose={() => Sweetalert.alert({ content: '公告关闭了' })}
	>
		这个公告关闭时有回掉函数。
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
