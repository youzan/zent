## Progress 进度条

进度条，用来表示操作的当前进度和状态。

### 使用指南

-  用于时间较长的操作，为用户显示当前操作的进度和状态。
-  可显示操作进度的百分比。

### 代码演示
:::demo 基本用法
```jsx
import { Progress } from 'zent';

class App extends Component {

	render() {
		return (
			<div>
				<Progress />
				<Progress percent={70}/>
				<Progress percent={100}/>
			</div>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
:::

:::demo 动态效果
```jsx
import { Progress, Button } from 'zent';

class App extends Component {
	state = {
    value: 10
  }

  increase = () => {
  	let value = this.state.value + 10;
  	if(value >= 100) {
  		value = 100;
  	}
    this.setState({ value });
  }

  decrease = () => {
  	let value = this.state.value - 10;
  	if(value < 0) {
  		value = 0;
  	}
    this.setState({ value });
  }

	render() {
		const { value } = this.state;
		return (
			<div>
				<Progress percent={value}/>
				<Button onClick={this.decrease}>-</Button>
				<Button onClick={this.increase}>+</Button>
			</div>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
:::

:::demo 支持不同状态
```jsx
import { Progress, Slider } from 'zent';

class App extends Component {
	render() {
		return (
			<div>
				<Progress percent={70} status="success"/>
				<Progress percent={80} status="exception"/>
			</div>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
:::

:::demo 是否显示进度信息
```jsx
import { Progress, Slider } from 'zent';

class App extends Component {
	render() {
		return (
			<div>
				<Progress percent={70} showInfo={false}/>
				<Progress percent={100} showInfo={false}/>
			</div>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
:::

### Progress API

| 参数           | 说明                | 类型             | 默认值                 |
| ------------ | ----------------- | -------------- | ------------------- |
| type | 进度条样式，可选`'line'` | string | `'line'` |
| percent | 百分比 | number     | `0` |
| status | 状态，可选`'success'`,`'exception'` | string|  |
| showInfo | 是否显示状态信息 | boolean | `true`  |
| className    | 自定义额外类名           | string         |                     |
| prefix       | 自定义前缀             | string         | `'zent'`            |


<style>
.zent-progress {
	margin-bottom: 10px;
}
</style>
