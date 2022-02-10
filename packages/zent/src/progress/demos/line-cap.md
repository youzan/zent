---
order: 8
zh-CN:
  title: 改变进度条边缘的形状
en-US:
  title: Change the linecaps from round to square
---

```jsx
import { Progress } from 'zent';

class App extends Component {
	render() {
		return (
			<div className="zent-progress-demo">
				<Progress percent={70} />
				<Progress percent={70} strokeLinecap="square" />
				<Progress percent={100} strokeLinecap="square" />
				<Progress percent={70} type="circle" />
				<Progress percent={70} type="circle" strokeLinecap="square" />
				<Progress percent={100} type="circle" strokeLinecap="square" />
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
