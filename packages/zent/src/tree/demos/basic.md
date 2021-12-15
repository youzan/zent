---
order: 1
zh-CN:
	title: 基础用法
	index: 首页
	autoExpandOnSelect: 点击节点时自动展开
	tree: 树
	title1: 杭州有赞科技有限公司
	title2: 技术
	title3: 后端
	title4: 运维
	title5: 前端
	title6: 产品

en-US:
	title: Basic Usage
	index: Index
	autoExpandOnSelect: Auto Expand On Select
	tree: Tree
	title1: Hangzhou Youzan Technology Co. Ltd
	title2: Engineer
	title3: Back End Engineer
	title4: Front End Engineer
	title5: Operations Engineer
	title6: Product

---


```jsx
import { Tree, Switch } from 'zent';
import { useState } from 'react';

const treeData = [{
	id: 1,
	title: '{i18n.title1}',
	children: [{
		id: 2,
		title: '{i18n.title2}',
		children: [{
			id: 3,
			title: '{i18n.title3}',
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

const Demo = () => {
	const [autoExpandOnSelect, setAutoExpandOnSelect] = useState(false);

	return (
		<div>
			<div className="zent-demo-tree-basic-switch-wrapper">
				{i18n.autoExpandOnSelect}:
				<Switch 
					checked={autoExpandOnSelect} 
					onChange={checked => setAutoExpandOnSelect(checked)} 
				/>
			</div>
			<Tree data={treeData} autoExpandOnSelect={autoExpandOnSelect} />
		</div>
	);
}

ReactDOM.render(
	<Demo />
	, mountNode
);
```
<style>
	.zent-demo-tree-basic-switch-wrapper {
		margin-bottom: 16px;
		display: flex;
	}
	.zent-demo-tree-basic-switch-wrapper .zent-switch {
		margin-left: 12px;
	}
</style>
