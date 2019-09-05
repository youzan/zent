---
order: 3
zh-CN:
  title: 自定义尺寸
en-US:
  title: Custom size
---

```jsx
import { Progress } from 'zent';

class App extends Component {
	render() {
		return (
			<div className="zent-progress-demo">
				<Progress percent={70} width={300} strokeWidth={5} />
				<Progress type="circle" percent={80} width={76} strokeWidth={5} />
			</div>
		);
	}
}

ReactDOM.render(<App />, mountNode);
```
