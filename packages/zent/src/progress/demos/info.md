---
order: 5
zh-CN:
  title: 隐藏进度信息
en-US:
  title: Hide process infomation
---

```jsx
import { Progress, Slider } from 'zent';

class App extends Component {
	render() {
		return (
			<div className="zent-progress-demo">
				<Progress percent={70} showInfo={false} />
				<Progress percent={100} showInfo={false} />
				<Progress type="circle" percent={70} showInfo={false} />
				<Progress type="circle" percent={100} showInfo={false} />
			</div>
		);
	}
}

ReactDOM.render(<App />, mountNode);
```
