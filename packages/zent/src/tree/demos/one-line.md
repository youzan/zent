---
order: 9
zh-CN:
	title: 只显示一行，超出时hover显示完整内容
	index: 首页
	tree: 树
	title1: 杭州有赞科技有限公司
	title2: 技术
	title3: 后端
	title4: 运维
	title5: 前端
	title6: 产品
en-US:
	title: Show only one line
	index: Index
	tree: Tree
	title1: Hangzhou Youzan Technology Co. Ltd
	title2: Engineer
	title3: Back End Engineer
	title4: Front End Engineer
	title5: Operations Engineer
	title6: Product
---

```jsx
import { Tree } from 'zent';

const treeData = [
	{
		id: 1,
		title: '{i18n.title1}{i18n.title1}{i18n.title1}',
		children: [
			{
				id: 2,
				title: '{i18n.title2}',
				children: [
					{
						id: 3,
						title: '{i18n.title3}',
					},
					{
						id: 4,
						title: '{i18n.title4}',
					},
					{
						id: 5,
						title: '{i18n.title5}',
					},
				],
			},
			{
				id: 6,
				title: '{i18n.title6}',
			},
		],
	},
];

ReactDOM.render(
	<div>
		<Tree onlyShowOneLine data={treeData} commonStyle={{ width: '220px' }} />
	</div>,
	mountNode
);
```
