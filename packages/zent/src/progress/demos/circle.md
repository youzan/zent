---
order: 9
zh-CN:
  title: 圈型进度条
en-US:
  title: Circle Progress
---

```jsx
import { Progress } from 'zent';

class App extends Component {
	render() {
		return (
			<div className="zent-progress-demo">
				<Progress type="circle" percent={80} width={76} strokeWidth={5} />
				<Progress type="circle" percent={70} />
				<Progress type="circle" percent={80} status="success" />
				<Progress type="circle" percent={30} status="exception" />
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
