## Badge

Badge normally appears in proximity to notification or head picture with eye-catching appeal, typically displaying unread messages count.

### Usage guide

-  Used to prompt for new messages，placed in the upper right corner or right side of the text or icon.
-  Can display new messages count.

### Code demo

:::demo Basic usage
```jsx
import { Badge,Icon } from 'zent';

ReactDOM.render(
	<Badge count={5}>
		<Icon type="bell-o" className="demo-cont"/>
	</Badge>
	, mountNode
);
```
:::

:::demo Max messages count
```jsx
import { Badge,Icon } from 'zent';

ReactDOM.render(
	<div>
		<Badge count={99}>
			<Icon type="bell-o" className="demo-cont"/>
		</Badge>
		<Badge count={120}>
			<Icon type="bell-o" className="demo-cont"/>
		</Badge>
		<Badge count={120} maxCount={10}>
			<Icon type="bell-o" className="demo-cont"/>
		</Badge>
		<Badge count={1200} maxCount={999}>
			<Icon type="bell-o" className="demo-cont"/>
		</Badge>
	</div>
	, mountNode
);
```
:::

:::demo Whether to display count 0
```jsx
import { Badge,Icon,Switch } from 'zent';

class Demo extends React.Component {
	state = {showZero: true}

	handleChange = (showZero) => {
		this.setState({ showZero });
	}

	render() {
		const { showZero } = this.state;
		return (
			<div>
				<Badge count={0} showZero={showZero}>
					<Icon type="bell-o" className="demo-cont"/>
				</Badge>
				<Switch size="small" checked={showZero} onChange={this.handleChange} />
			</div>
		)
	}

	
}
ReactDOM.render(
	<Demo />, mountNode
);
```
:::

:::demo Red badge without number
```jsx
import { Badge,Icon,Switch } from 'zent';

class Demo extends React.Component {
	state = {showDot: true}

	handleChange = (showDot) => {
		this.setState({ showDot });
	}

	render() {
		const { showDot } = this.state;
		return (
			<div>
				<Badge dot={showDot}>
					<Icon type="bell-o" className="demo-cont"/>
				</Badge>
				<Switch size="small" checked={showDot} onChange={this.handleChange} />
			</div>
		)
	}

	
}
ReactDOM.render(
	<Demo />, mountNode
);
```
:::

:::demo Standalone
```jsx
import { Badge } from 'zent';

ReactDOM.render(
	<div>
		<div className="zent-badge-demo-wrapper">
			<span>Shop messages</span>
			<Badge count={100}/ >
		</div>
		<div className="zent-badge-demo-wrapper">
			<span>Shop messages</span>
			<Badge count={100} dot/ >
		</div>
	</div>
	, mountNode
);
```
:::



### API

| Property  | Description                                 | Type     | Default      | Options          |
| ----------| ------------------------------------------- | ------   | ------------ | ---------------- |
| count     | Messages count to show                      | int      | `0`          |                  |
| maxCount  | Max count to show                           | int      | `99`         |                  |
| dot       | Whether to show red dot without number      | bool     | `false`      | `true`,`false`   |
| showZero  | Whether to show badge when count is zero    | bool     | `false`      | `true`,`false`   |
| className | The name of the customized additional class | string   | `''`         |                  |
| prefix    | The customized prefix                       | string   | `'zent'`     |                  |


<style>
.zent-badge .demo-cont {
	width: 40px;
	height: 40px;
	line-height: 40px;
	border-radius: 20px;
	background: #38f;
	color: #fff;
	font-size: 20px;
}
.zent-badge {
	margin-right: 30px;
}
.zent-badge-demo-wrapper {
	display: flex;
	align-items: center;
}
</style>
