---
order: 6
zh-CN:
	title: 自定义信息
	content: 进度
en-US:
	title: Custom format function of text
	content: Percent
---

```jsx
import { Progress, Slider } from 'zent';

class App extends Component {
	render() {
		return (
			<div className="zent-progress-demo">
				<Progress
					percent={70}
					format={percent => `{i18n.content} ${percent}%`}
				/>
				<Progress
					percent={80}
					type="circle"
					format={percent => `{i18n.content} ${percent}%`}
				/>
			</div>
		);
	}
}

ReactDOM.render(<App />, mountNode);
```
