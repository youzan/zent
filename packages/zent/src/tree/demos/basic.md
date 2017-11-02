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
	title: '杭州有赞科技有限公司',
	children: [{
		id: 2,
		title: '技术',
		children: [{
			id: 3,
			title: '后端'
		}, {
			id: 4,
			title: '运维'
		}, {
			id: 5,
			title: '前端'
		}]
	}, {
		id: 6,
		title: '产品'
	}]
}];

ReactDOM.render(
	<Tree data={treeData} />
	, mountNode
);
```
