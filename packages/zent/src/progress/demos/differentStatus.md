---
order: 4
zh-CN:
	title: 支持不同状态
en-US:
	title: Support different status
---
```jsx
import { Progress } from 'zent';

class App extends Component {

	render() {
		return (
			<div>
				<Progress width={300} strokeWidth={5}/>
				<Progress percent={70} width={300} strokeWidth={5}/>
				<Progress percent={100} width={300} strokeWidth={5}/>
				<Progress type="circle" width={76} strokeWidth={3}/>
				<Progress type="circle" percent={80} width={76} strokeWidth={3}/>
				<Progress type="circle" percent={100} width={76} strokeWidth={3}/>
			</div>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
