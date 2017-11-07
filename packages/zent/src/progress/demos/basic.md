---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic usage
---

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

<style>
.zent-progress {
	margin-bottom: 10px;
}
.zent-progress-circle {
	margin-right: 10px;
}
</style>
