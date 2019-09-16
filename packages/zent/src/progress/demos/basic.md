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
			<div className="zent-progress-demo">
				<Progress percent={70} />
				<Progress type="circle" percent={70} />
			</div>
		);
	}
}

ReactDOM.render(<App />, mountNode);
```

<style>
.zent-progress-demo {
	.zent-progress {
		margin-bottom: 10px;
	}

	.zent-progress-type__circle {
		margin-right: 10px;
	}
}
</style>
