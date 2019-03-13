---
order: 6
zh-CN:
	title: 类型为 tabs 的步骤条
	stepOneText: 第一步
	stepTwoText: 第二步
	stepThreeText: 第三步
en-US:
	title: Steps of tabs type
	stepOneText: Step One
	stepTwoText: Step Two
	stepThreeText: Step Three
---

```jsx
import { Steps } from 'zent';

class StepsExample extends Component {
	state = {
		current: 1
	}

	onStepChange = (id) => {
		this.setState({
			current: id
		});
	}

	render() {
		let { current } = this.state;
		return (
			<Steps current={current} type="tabs" onStepChange={this.onStepChange} >
				<Steps.Step title="{i18n.stepOneText}" />
				<Steps.Step title="{i18n.stepTwoText}" />
				<Steps.Step title="{i18n.stepThreeText}" />
			</Steps>
		);
	}
}

ReactDOM.render(
	<StepsExample />,
	mountNode
);
```
