---
order: 1
zh-CN:
	title: 基础使用
	stepOneText: 登录有赞帐号
	stepTwoText: 选择门店
	stepThreeText: 绑定门店
	stepFourText: 完成
en-US:
	title: Basic usage
	stepOneText: Sign in to Youzan
	stepTwoText: Choose a store
	stepThreeText: Bind the store
	stepFourText: Finish
---

```jsx
import { Steps } from 'zent';

class StepsExample extends Component {
	state = {
		current: 1,
	};

	onStepChange = id => {
		this.setState({
			current: id,
		});
	};

	render() {
		let { current } = this.state;
		return (
			<div className="zent-steps-demo-breadcrumb">
				<Steps
					current={current}
					type="breadcrumb"
					onStepChange={this.onStepChange}
					ghost
				>
					<Steps.Step title="{i18n.stepOneText}" />
					<Steps.Step title="{i18n.stepTwoText}" />
					<Steps.Step title="{i18n.stepThreeText}" />
					<Steps.Step title="{i18n.stepFourText}" />
				</Steps>
			</div>
		);
	}
}

ReactDOM.render(<StepsExample />, mountNode);
```

<style>
	.zent-steps-demo-breadcrumb {
		background-color: #f7f7f7;
		padding: 20px;
	}
</style>
