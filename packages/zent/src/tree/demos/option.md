---
order: 6
zh-CN:
	title: 可选树
	index: 首页
	tree: 树
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
import { Tree } from 'zent';

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
		checkedKeys: [3, 5, 22],
		disabledCheckedKeys: [4, 7, 9, 22]
	}

	onCheck = (checked, helpInfo) => {
		console.log(checked, helpInfo);
		this.setState({
			checkedKeys: checked
		});
	}

	render() {
		const { checkedKeys, disabledCheckedKeys } = this.state;

		return (
			<div>
				<Tree
					checkable
					size="small"
					data={treeData}
					onCheck={this.onCheck}
					checkedKeys={checkedKeys}
					disabledCheckedKeys={disabledCheckedKeys}
				/>
			</div>
		);
	}
}

ReactDOM.render(
	<TreeExample />
	, mountNode
)
```

