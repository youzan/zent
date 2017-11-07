---
order: 1
zh-CN:
	title: 基础用法
	index: 首页
	tree: 树
en-US:
	title: Basic Usage
	index: Index
	tree: Tree

---


```jsx
import { Tree } from 'zent';

const treeData = [{
	id: 1,
	title: 'Hangzhou Youzan Technology Co. Ltd',
	children: [{
		id: 2,
		title: 'engineer',
		children: [{
			id: 3,
			title: 'Back End Engineer'
		}, {
			id: 4,
			title: 'Front End Engineer'
		}, {
			id: 5,
			title: 'Operations Engineer'
		}]
	}, {
		id: 6,
		title: 'product'
	}]
}];

ReactDOM.render(
	<Tree data={treeData} />
	, mountNode
);
```
