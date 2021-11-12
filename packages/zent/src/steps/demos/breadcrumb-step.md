---
order: 4
zh-CN:
	title: 类型为 breadcrumb 的步骤条
	stepOneText: 登录有赞帐号
	stepTwoText: 选择门店
	stepThreeText: 绑定门店
	stepFourText: 完成
en-US:
	title: Steps of breadcrumb type
	stepOneText: Sign in to Youzan
	stepTwoText: Choose a store
	stepThreeText: Bind the store
	stepFourText: Finish
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
			<div className="zent-steps-demo-breadcrumb">
				<Steps current={current} type="breadcrumb" onStepChange={this.onStepChange} ghost>
					<Steps.Step title="{i18n.stepOneText}" icon="check-circle-o" />
					<Steps.Step title="{i18n.stepTwoText}"  />
					<Steps.Step title="{i18n.stepThreeText}" disabled />
					<Steps.Step title="{i18n.stepFourText}" disabled />
				</Steps>
			</div>
		);
	}
}

ReactDOM.render(
	<StepsExample />,
	mountNode
);
```

<style>
	.zent-steps-demo-breadcrumb {
		background-color: #f7f7f7;
		padding: 20px;
	}
</style>
