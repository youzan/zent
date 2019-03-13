---
order: 5
zh-CN:
	title: 类型为 card 的步骤条（通过 sequence 覆写步骤项序号）
	stepOneText: 一、登录有赞帐号
	stepTwoText: 二、选择门店
	stepThreeText: 三、绑定门店
	stepFourText: 四、完成
en-US:
	title: Steps of card type which override the step number by `sequence`
	stepOneText: Step1 - Sign in to Youzan
	stepTwoText: Step2 - Choose a store
	stepThreeText: Step3 - Bind the store
	stepFourText: Step4 - Finish 
---

```jsx
import { Steps } from 'zent';

ReactDOM.render(
	<Steps current={2} sequence={false} type="card" >
		<Steps.Step title="{i18n.stepOneText}" />
		<Steps.Step title="{i18n.stepTwoText}" />
		<Steps.Step title="{i18n.stepThreeText}" />
		<Steps.Step title="{i18n.stepFourText}" />
	</Steps>
	, mountNode
);
```
