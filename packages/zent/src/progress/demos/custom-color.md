---
order: 7
zh-CN:
  title: 自定义色彩
en-US:
  title: Custom color of progress
---

```jsx
import { Progress } from 'zent';

const colors = {
	bgColor: '#fff',
	normalColor: '#38f',
	successColor: '#0a0',
	exceptionColor: '#f85',
};

class App extends Component {
	render() {
		return (
			<div className="zent-progress-demo">
				<Progress percent={70} {...colors} />
				<Progress percent={100} {...colors} />
				<Progress percent={80} status="exception" {...colors} />
				<Progress type="circle" percent={70} {...colors} />
				<Progress type="circle" percent={100} {...colors} />
				<Progress type="circle" percent={80} status="exception" {...colors} />
			</div>
		);
	}
}

ReactDOM.render(<App />, mountNode);
```
