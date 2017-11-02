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
	title: 'hello',
	children: [{
		id: 2,
		title: 'language',
		children: [{
			id: 3,
			title: 'java'
		}, {
			id: 4,
			title: 'python'
		}, {
			id: 5,
			title: 'scala'
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
