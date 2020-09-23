---
order: 5
zh-CN:
	title: useTransfer
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
	title: useTransfer
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

```js
import { useState, useCallback, useMemo } from 'react';
import { useTransfer, Grid, Tree, Icon } from 'zent';

const treeData = [
	{
		id: 1,
		title: '{i18n.title1}',
		children: [
			{
				id: 2,
				title: '{i18n.title2}',
				children: [
					{
						id: 3,
						title: '{i18n.title3}',
						children: [
							{
								id: 7,
								title: '{i18n.title7}',
							},
							{
								id: 8,
								title: '{i18n.title8}',
							},
							{
								id: 9,
								title: '{i18n.title9}',
							},
							{
								id: 10,
								title: '{i18n.title10}',
							},
						],
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

const columns = [
	{
		name: 'title',
		title: 'tree node',
	},
];

const transferDataSource = useMemo(() => {
	const result = [];
	function flatten(list = []) {
		list.forEach(item => {
			result.push(item);
			flatten(item.children);
		});
	}
	flatten(treeData);
	return result;
}, [treeData]);

const { targetKeys, selectedKeys, transferKeys, changeSelectedKeys } = useTransfer({ targetKeys: [8, 9] });

ReactDOM.render(
	<div className="transfer-hook">
		<Tree
			checkable
			size="small"
			data={treeData}
			onCheck={checked => {
				changeSelectedKeys(
					'left',
					checked.filter(item => !targetKeys.includes(item))
				);
			}}
			checkedKeys={Array.from(new Set([...selectedKeys, ...targetKeys]))}
			disabledCheckedKeys={targetKeys}
			expandAll
		/>
		<Icon className="left-icon" type="left" onClick={() => transferKeys('left')} />
		<Icon className="right-icon" type="right" onClick={() => transferKeys('right')} />
		<Grid
			className="transfer-gird"
			datasets={targetKeys.map(key => transferDataSource.find(item => key === item.id))}
			selection={{
				selectedRowKeys: targetKeys.filter(item => selectedKeys.includes(item)),
				onSelect: keys => changeSelectedKeys('right', keys),
			}}
			columns={columns}
		/>
	</div>,
	mountNode
);
```
<style>
.transfer-hook {
	display: flex;
	align-items: center;

	.left-icon {
		font-size: 30px;
		padding: 20px 0 20px 10px;
	}

	.right-icon {
		font-size: 30px;
		padding: 20px 30px 20px 0;
	}

	.transfer-gird {
		min-height: 240px;
		width: 200px;
	}
}
</style>