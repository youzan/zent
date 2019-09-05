---
order: 4
zh-CN:
  title: 支持不同状态
en-US:
  title: Support different status
---

```jsx
import { Progress, Slider } from 'zent';

class App extends Component {
	render() {
		return (
			<div className="zent-progress-demo">
				<Progress percent={70} status="normal" />
				<Progress percent={80} status="success" />
				<Progress percent={30} status="exception" />
				<Progress type="circle" percent={70} status="normal" />
				<Progress type="circle" percent={80} status="success" />
				<Progress type="circle" percent={30} status="exception" />
			</div>
		);
	}
}

ReactDOM.render(<App />, mountNode);
```
