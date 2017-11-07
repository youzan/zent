---
order: 7
zh-CN:
	title: 自定义色彩
en-US:
	title: Custom color of progress
---

```jsx
import { Progress } from 'zent';

const bgColor = '#e5e5e5';
const normalColor = '#38f';
const successColor = '#0a0';
const exceptionColor = '#f85';

class App extends Component {

	render() {
		return (
			<div>
				<Progress bgColor={bgColor} normalColor={normalColor} successColor={successColor} />
				<Progress percent={70} bgColor={bgColor} normalColor={normalColor} successColor={successColor} />
				<Progress percent={100} bgColor={bgColor} normalColor={normalColor} successColor={successColor} />
				<Progress percent={80} status="exception" bgColor={bgColor} normalColor={normalColor} successColor={successColor} />
				<Progress percent={80} status="exception" bgColor={bgColor} normalColor={normalColor} successColor={successColor} exceptionColor={exceptionColor} />
				<Progress type="circle" bgColor={bgColor} normalColor={normalColor} successColor={successColor} />
				<Progress type="circle" percent={70} bgColor={bgColor} normalColor={normalColor} successColor={successColor} />
				<Progress type="circle" percent={100} bgColor={bgColor} normalColor={normalColor} successColor={successColor} />
				<Progress type="circle" percent={80} status="exception" bgColor={bgColor} normalColor={normalColor} successColor={successColor} />
				<Progress type="circle" percent={80} status="exception" bgColor={bgColor} normalColor={normalColor} successColor={successColor} exceptionColor={exceptionColor} />
			</div>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
