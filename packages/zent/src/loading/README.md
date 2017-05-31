## Loading 等待

等待，用于页面或者区块的等待状态。

### 使用指南
-  当页面处于渲染中或者加载异步数据时，可以使用此组件减少用户等待时的焦虑感。


### 代码演示

:::demo 基础用法
```jsx
import { Loading } from 'zent';

ReactDOM.render(<Loading show />, mountNode);
```
:::


:::demo 使用 Loading 包裹组件，使其进入 Loading 状态。
```jsx
import { Loading, Switch } from 'zent';

class Example extends React.Component {
	state = { loading: false }

	onChange = (value) => {
		this.setState({ loading: value });
	}

	render() {
		const { loading } = this.state;

		return (
			<div>
				<Loading show={loading}>
					<div className="zent-loading-example-hello-world">Hello World</div>
				</Loading>
				<Switch
					className="zent-loading-example-switch"
					checked={loading}
					onChange={this.onChange}
					size="small"
				/>
			</div>
		);
	}
}

ReactDOM.render(<Example />, mountNode);
```
:::


:::demo 全局开启或关闭。
```jsx
import { Loading, Button } from 'zent';

const Example = () => {
	return (
		<div>
			<Button onClick={() => { Loading.on() }}>
				全局开启
			</Button>
			<Button
				onClick={() => { Loading.off() }}
				style={{ zIndex: 9999, position: 'relative' }}
			>
				全局关闭
			</Button>
		</div>
	);
}

ReactDOM.render(<Example />, mountNode);
```
:::

### API

| 参数             | 说明                                                     | 类型     | 默认值 |
| -------------- | ------------------------------------------------------ | ------ | -------- |
| show           | 显示控制                                                   | bool   | `false`  |
| float         | 是否脱离文档流，一般全局加载的时候设置为 `true`        | bool   | `false`   |
| height       | float 为 false 时设置高度，如果包裹了组件，将会表现为组件高度，否则将会使用默认高度 | number | `160`    |
| zIndex         | 设置 z-index                                             | number | `9998`   |
| className      | 自定义额外类名                                                | string | `''`     |
| containerClass | 自定义额外类名，外部包裹的容器使用                                      | string | `''`     |
| prefix         | 自定义前缀                                                  | string | `'zent'` |


<style>
.zent-loading-example-switch {
	margin-top: 10px;
}

.zent-loading-example-hello-world {
	background-color: #e5e5e5;
	text-align: center;
	height: 160px;
	line-height: 160px;
}
</style>
