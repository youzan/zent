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
			title: '{i18n.title3}'
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
const defaultCheckedKeys = [2, 3];
const disabledCheckedKeys = [4, 5];

const onCheck = data => console.log(data);

ReactDOM.render(
	<Tree
		checkable
		size="small"
		data={treeData}
		onCheck={onCheck}
		defaultCheckedKeys={defaultCheckedKeys}
		disabledCheckedKeys={disabledCheckedKeys}
	/>
	, mountNode
)
```
