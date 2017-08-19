## Alert 

Alert provides a striking prompt message.

### Usage guide

-  The content is as simple as possible to reduce reading barrier.
-  No more than two buttons for Alert, keeping the logic simple.

### Code demo

:::demo Basic usage
```jsx
import { Alert } from 'zent';

ReactDOM.render(
	<Alert>Alert content.</Alert>
	, mountNode
);
```
:::

:::demo The conent can be non-strings such as a DOM element.
```jsx
import { Alert, Icon } from 'zent';

ReactDOM.render(
	<Alert>
		<Icon type="error-circle" />
		<span>Warning：SMS notification of trading will be sent via the "Message Push" function of the Marketing Center.</span>
		<a href="" onClick={e => e.preventDefault()}>Order now</a>
	</Alert>
	, mountNode
)
```
:::


:::demo Three styles：`info`, `warning` and `danger`
```jsx
import { Alert } from 'zent';

ReactDOM.render(
	<div className="zent-alert-example">
		<Alert type="info">This is the default info style.</Alert>
		<Alert type="warning">This is the warning style.</Alert>
		<Alert type="danger">This is the danger style.</Alert>
	</div>
	, mountNode
);
```
:::

:::demo Two sizes
```jsx
import { Alert } from 'zent';

ReactDOM.render(
	<div className="zent-alert-example">
		<Alert>This is the normal size.</Alert>
		<Alert size="large">
			<p>This is the big size</p>
			<p>SMS notification of trading will be sent via the "Message Push" function of the Marketing Center.</p><br />
			<p>Official phone：0571-88888888</p>
		</Alert>
	</div>
	, mountNode
)
```
:::

:::demo Support rounded style
```jsx
import { Alert } from 'zent';

ReactDOM.render(
	<Alert type="warning" rounded>The Alert is rounded.</Alert>
	, mountNode
)
```
:::

:::demo Close button
```jsx
import { Alert, Button } from 'zent';

ReactDOM.render(
	<Alert size="large" closable>
		<div className="content">
			<p className="text">SMS notification of trading will be sent via the "Message Push" function of the Marketing Center.</p>
			<p>Official phone：0571-88888888</p>
		</div>
		<br />
		<Button>Learn more</Button>
	</Alert>
	, mountNode
)
```
:::

:::demo Closed callback
```jsx
import { Alert, Sweetalert } from 'zent';

ReactDOM.render(
	<Alert 
		type="info" 
		closable
		onClose={() => Sweetalert.alert({ content: 'The Alert is closed' })}
	>
		This alert has a closed callback function.
	</Alert>
	, mountNode
)
```
:::

### API

| Property  | Description                                 | Type   | Default    | Options                           |
| --------- | ------------------------------------------- | ------ | ---------- | --------------------------------- |
| type      | Type of Alert styles                        | string | `'info'`   | `'info'`, `'warning'`, `'danger'` |
| size      | Size of Alert                               | string | `'normal'` | `'normal'`, `'large'`             |
| rounded   | Whether Alert is rounded                    | bool   | `false`    | `true`, `false`                   |
| closable  | Whether Alert can be closed                 | bool   | `false`    | `true`, `false`                   |
| onClose   | Callback when close Alert                   | func   | `noop`     |                                   |
| className | The custom class name                       | string | `''`       |                                   |
| prefix    | The custom prefix                           | string | `'zent'`   |                                   |
 

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

.zent-alert {
	.text {
		margin-bottom: 5px;
	}
}
</style>
