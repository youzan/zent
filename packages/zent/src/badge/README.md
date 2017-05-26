## Badge

徽标志，一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

### 使用指南

-  用于提示新的消息，放在文字或者图标右上角或右侧。
-  可以显示具体消息的条数。

### 代码演示

:::demo 基础用法
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

:::demo 设置最大显示信息数
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

:::demo 设置是否显示消息数0
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

:::demo 小红点，不需要指定具体的count
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

:::demo 独立徽标
```jsx
import { Badge } from 'zent';

ReactDOM.render(
	<div>
		<div className="zent-badge-demo-wrapper">
			<span>店铺消息</span>
			<Badge count={100}/ >
		</div>
		<div className="zent-badge-demo-wrapper">
			<span>店铺消息</span>
			<Badge count={100} dot/ >
		</div>
	</div>
	, mountNode
);
```
:::



### API

| 参数     |   说明             | 类型     | 默认值        | 备选值            |
| ---------| ----------------- | ------  | -------------|----------------- |
| count    | 消息条数            | int     | `0`          |                  |
| maxCount | 最大完全显示消息条数  | int     | `99`         |                  |
| dot      | 是否显示为小红点     | bool    | `false`      | `true`,`false`   |
| showZero | 消息数为0时是否显示  | bool     | `false`      | `true`,`false`  |
| className| 自定义额外类名      | string   | `''`         |                  |
| prefix   | 自定义前缀          | string   | `'zent'`    |                  |


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
