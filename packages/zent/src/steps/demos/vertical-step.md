---
order: 3
zh-CN:
	title: 竖直方向的步骤条
	stepOne: 第一步
	stepTwo: 第二步
	stepThree: 第三步
	stepOneText: 分享邀请码给好友
	stepTwoText: 订购时输入你的邀请码
	stepThreeText: 获得有赞E卡奖励
	next: 下一步
en-US:
	title: Steps of vertical direction
	stepOne: Step One
	stepTwo: Step Two
	stepThree: Step Three
	stepOneText: Share invitation code for friends
	stepTwoText: Enter your invitation code when ordering
	stepThreeText: Get a reward for the Youzan E-card
	next: Next
---

```jsx
import { Steps, Button } from 'zent';

class StepsExample extends Component {
	state = {
		current: 1
	}

	nextStep = () => {
		let { current } = this.state;
		current += 1;

		if (current > 3) {
			current = current % 3;
		}

		this.setState({
			current
		});
	}

	render() {
		let { current } = this.state;
		return (
			<div>
				<Steps current={current} status="finish" direction="vertical">
					<Steps.Step title="{i18n.stepOne}" description="{i18n.stepOneText}" />
					<Steps.Step title="{i18n.stepTwo}" description="{i18n.stepTwoText}" />
					<Steps.Step title="{i18n.stepThree}" description="{i18n.stepThreeText}" />
				</Steps>
				<Button onClick={this.nextStep}>{i18n.next}</Button>
			</div>
		);
	}
}

ReactDOM.render(
	<StepsExample />,
	mountNode
);
```
