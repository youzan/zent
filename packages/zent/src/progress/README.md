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
				<Progress type="circle"/>
				<Progress type="circle" percent={80}/>
				<Progress type="circle" percent={100}/>
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
				<Progress type="circle" percent={value}/>
				<div>
					<Button onClick={this.decrease}>-</Button>
					<Button onClick={this.increase}>+</Button>
				</div>
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

:::demo 不同尺寸
```jsx
import { Progress } from 'zent';

class App extends Component {

	render() {
		return (
			<div>
				<Progress width={300} strokeWidth={5}/>
				<Progress percent={70} width={300} strokeWidth={5}/>
				<Progress percent={100} width={300} strokeWidth={5}/>
				<Progress type="circle" width={76} strokeWidth={3}/>
				<Progress type="circle" percent={80} width={76} strokeWidth={3}/>
				<Progress type="circle" percent={100} width={76} strokeWidth={3}/>
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
				<Progress type="circle" percent={70} status="success"/>
				<Progress type="circle" percent={80} status="exception"/>
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
				<Progress type="circle" percent={70} showInfo={false}/>
				<Progress type="circle" percent={100} showInfo={false}/>
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

:::demo 自定义文字格式
```jsx
import { Progress, Slider } from 'zent';

class App extends Component {
	render() {
		return (
			<div>
				<Progress percent={70} format={(percent) => `进度${percent}%`}/>
				<Progress percent={80} type="circle" format={(percent) => `进度${percent}%`}/>
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
| type | 进度条样式，可选`'line'` | string | `'line'`, `'circle'` |
| percent | 百分比 | number     | `0` |
| status | 状态，可选`'success'`,`'exception'` | string|  |
| showInfo | 是否显示状态信息 | boolean | `true`  |
| format | 文字模板函数 | func | 内置函数 |
| strokeWidth | 线条宽度，单位px | number | `10` | |
| width | 圆形进度条直径/条形进度条总长度 | number | `132(type=circle), 580(type=line)` |   
| className | 自定义额外类名 | string |                     |
| prefix | 自定义前缀 | string | `'zent'`            |

<style>
.zent-progress {
	margin-bottom: 10px;
}
.zent-progress-circle {
	margin-right: 10px;
}
</style>
