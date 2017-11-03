---
order: 2
zh-CN:
	title: 列表格式数据源
	index: 首页
	tree: 树

en-US:
	title: array data
	index: Index
	tree: Tree

---


```jsx
import { Tree } from 'zent';

const treeData = [{
	id: 1,
	title: '杭州有赞科技有限公司',
}, {
	id: 2,
	title: '技术',
	parentId: 1
}, {
	id: 3,
	title: '后端',
	parentId: 2
}, {
	id: 4,
	title: '运维',
	parentId: 2
}, {
	id: 5,
	title: '前端',
	parentId: 2
}, {
	id: 6,
	title: '产品',
	parentId: 1
}];

ReactDOM.render(
	<Tree dataType="plain" data={treeData} />
	, mountNode
)
```
