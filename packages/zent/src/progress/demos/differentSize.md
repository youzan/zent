---
order: 3
zh-CN:
	title: 不同尺寸
en-US:
	title: Support different size
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
