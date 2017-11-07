---
order: 7
zh-CN:
	title: 自定义色彩
en-US:
	title: Custom color of progress
---

```jsx
import { Progress } from 'zent';

class App extends Component {

	render() {
		return (
			<div>
				<Progress bgColor="#e5e5e5" normalColor="#38f" successColor="#0a0" />
				<Progress percent={70} bgColor="#e5e5e5" normalColor="#38f" successColor="#0a0" />
				<Progress percent={100} bgColor="#e5e5e5" normalColor="#38f" successColor="#0a0" />
				<Progress percent={80} status="exception" bgColor="#e5e5e5" normalColor="#38f" successColor="#0a0" />
				<Progress percent={80} status="exception" bgColor="#e5e5e5" normalColor="#38f" successColor="#0a0" exceptionColor="#f85"/>
				<Progress type="circle" bgColor="#e5e5e5" normalColor="#38f" successColor="#0a0" />
				<Progress type="circle" percent={70} bgColor="#e5e5e5" normalColor="#38f" successColor="#0a0" />
				<Progress type="circle" percent={100} bgColor="#e5e5e5" normalColor="#38f" successColor="#0a0" />
				<Progress type="circle" percent={80} status="exception" bgColor="#e5e5e5" normalColor="#38f" successColor="#0a0" />
				<Progress type="circle" percent={80} status="exception" bgColor="#e5e5e5" normalColor="#38f" successColor="#0a0" exceptionColor="#f85"/>
			</div>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
