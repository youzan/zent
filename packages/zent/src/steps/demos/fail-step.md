---
order: 2
zh-CN:
	title: 失败状态的步骤条
	stepOne: 第一步
	stepTwo: 第二步
	stepThree: 第三步
	stepOneText: 分享邀请码给好友
	stepTwoText: 订购时输入你的邀请码
	stepThreeText: 获得有赞E卡奖励
	next: 下一步
en-US:
	title: Steps of failure
	stepOne: Step One
	stepTwo: Step Two
	stepThree: Step Three
	stepOneText: Share invitation code for friends
	stepTwoText: Enter your invitation code when ordering
	stepThreeText: Get a reward for the Youzan E-card
	next: Next
---
```jsx
import { Steps } from 'zent';

ReactDOM.render(
	<Steps current={2} status="error">
		<Steps.Step title="{i18n.stepOne}" description="{i18n.stepOneText}" />
		<Steps.Step title="{i18n.stepTwo}" description="{i18n.stepTwoText}" />
		<Steps.Step title="{i18n.stepThree}" description="{i18n.stepThreeText}" />
	</Steps>
	, mountNode
);
```
