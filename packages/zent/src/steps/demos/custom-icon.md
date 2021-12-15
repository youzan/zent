---
order: 3
zh-CN:
	title: 自定义 icon
	stepOne: 第一步
	stepTwo: 第二步
	stepThree: 第三步
	stepOneText: 分享邀请码给好友
	stepTwoText: 订购时输入你的邀请码
	stepThreeText: 获得有赞E卡奖励
	next: 下一步
en-US:
	title: Custom Step Icon
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
		current: 2,
		status: 'process'
	}

	nextStep = () => {
		let { current, status } = this.state;
		if (current === 3 && status === 'process') {
			status = 'finish';
		} else {
			current++;
			if (current > 3) {
				current = current % 3;
			}
			status = 'process';
		}

		this.setState({
			current,
			status
		});
	}

	render() {
		let { current, status } = this.state;
		return (
			<div>
				<Steps current={current} status={status}>
					<Steps.Step title="{i18n.stepOne}" description="{i18n.stepOneText}" icon="capital-o" />
					<Steps.Step title="{i18n.stepTwo}" description="{i18n.stepTwoText}" icon="clock-o" />
					<Steps.Step title="{i18n.stepThree}" description="{i18n.stepThreeText}" icon="mini-apps-o" />
				</Steps>
				<Button style={{ margin: '10px 0 0 50px' }} onClick={this.nextStep}>{i18n.next}</Button>
			</div>
		);
	}
}

ReactDOM.render(
	<StepsExample />,
	mountNode
);
```
