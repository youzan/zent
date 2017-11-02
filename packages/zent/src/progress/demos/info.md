---
order: 5
zh-CN:
	title: 是否显示进度信息
en-US:
	title: Show process infomation or not
---
```jsx
import { Progress, Slider } from 'zent';

class App extends Component {
	render() {
		return (
			<div>
				<Progress percent={70} showInfo={false}/>
				<Progress percent={100} showInfo={false}/>
				<Progress type="circle" percent={70} showInfo={false}/>
				<Progress type="circle" percent={100} showInfo={false}/>
			</div>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
