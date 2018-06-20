---
order: 6
zh-CN:
	title: 可选树
	index: 首页
	tree: 树
	switch: 使用新版
	radio1: 默认模式
	radio2: 受控模式
	title1: 杭州有赞科技有限公司
	title2: 技术
	title3: 后端
	title4: 运维
	title5: 前端
	title6: 产品
	title7: JAVA
	title8: PHP
	title9: GO
	title10: .NET

en-US:
	title: Optional Tree
	index: Index
	tree: Tree
	switch: useNew
	radio1: default
	radio2: controllable
	title1: Hangzhou Youzan Technology Co. Ltd
	title2: Engineer
	title3: Back End Engineer
	title4: Front End Engineer
	title5: Operations Engineer
	title6: Product
	title7: JAVA
	title8: PHP
	title9: GO
	title10: .NET

---


```jsx
import { Tree, Radio, Switch } from 'zent';

const RadioGroup = Radio.Group;
const treeData = [{
	id: 1,
	title: '{i18n.title1}',
	children: [{
		id: 2,
		title: '{i18n.title2}',
		children: [{
			id: 3,
			title: '{i18n.title3}',
			children: [{
				id: 7,
				title: '{i18n.title7}'
			}, {
				id: 8,
				title: '{i18n.title8}'
			}, {
				id: 9,
				title: '{i18n.title9}'
			}, {
				id: 10,
				title: '{i18n.title10}'
			}]
		}, {
			id: 4,
			title: '{i18n.title4}'
		}, {
			id: 5,
			title: '{i18n.title5}'
		}]
	}, {
		id: 6,
		title: '{i18n.title6}'
	}]
}];

class TreeExample extends React.Component {
	state = {
		useNew: true,
		radioValue: 'default',
		controlled: false,
		defaultCheckedKeys: [3, 5],
		disabledCheckedKeys: [4, 7, 9]
	}

	onUseNewChange = (checked) => {
		this.setState({
			useNew: checked,
		});
	}

	onControllableChange = (e) => {
		if (e.target.value === 'controllable') {
			this.setState({
				controlled: true,
				radioValue: 'controllable'
			});
			return;
		}

		if (e.target.value === 'default') {
			this.setState({
				controlled: false,
				radioValue: 'default'
			});
		}
	}

	onCheck = (checked) => {
		console.log(checked);

		if (this.state.controlled) {
			this.setState({
				defaultCheckedKeys: checked
			});
		}
	}

	renderNew() {
		const { controlled, defaultCheckedKeys, disabledCheckedKeys, radioValue } = this.state;

		return (
			<div>
				<RadioGroup onChange={this.onControllableChange} value={radioValue}>
					<Radio value="default">{i18n.radio1}</Radio>
					<Radio value="controllable">{i18n.radio2}</Radio>
				</RadioGroup>
				<hr/>
				<Tree
					useNew
					checkable
					controlled={controlled}
					size="small"
					data={treeData}
					onCheck={this.onCheck}
					defaultCheckedKeys={defaultCheckedKeys}
					disabledCheckedKeys={disabledCheckedKeys}
				/>
			</div>
		)
	}

	renderOld() {
		const { defaultCheckedKeys, disabledCheckedKeys } = this.state;

		return (
			<Tree
				checkable
				size="small"
				data={treeData}
				onCheck={this.onCheck}
				defaultCheckedKeys={defaultCheckedKeys}
				disabledCheckedKeys={disabledCheckedKeys}
			/>
		)
	}

	render() {
		const { useNew } = this.state;

		return (
			<div>
				<div style={{ marginBottom: 15}}>
					{i18n.switch}  <Switch size="small" checked={useNew} onChange={this.onUseNewChange} />
				</div>
				
				{useNew ? this.renderNew() : this.renderOld()}
			</div>
		)
	}
}

ReactDOM.render(
	<TreeExample />
	, mountNode
)
```

