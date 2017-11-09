---
order: 4
zh-CN:
	title: 自定义节点展示
	index: 首页
	tree: 树
en-US:
	title: Custom Node Display
	index: Index
	tree: Tree
---

```jsx
import { Tree } from 'zent';

const treeData = [{
	id: 1,
	title: '杭州有赞科技有限公司',
	content: '移动零售服务商',
	children: [{
		id: 2,
		title: '技术',
		content: '职位介绍http://job.youzan.com',
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
		title: '产品',
		content: <a href="http://job.youzan.com">请将简历发送至 joinus@youzan.com</a>,
	}]
}];

const customRender = (data) => (
	<span style={{ fontSize: 16, margin: 0, lineHeight: 1 }}>
		{data.title}
		{data.content ? <small style={{ display: 'block', fontSize: 10 }}>{data.content}</small> : ''}
	</span>
);

ReactDOM.render(
	<Tree data={treeData} render={customRender} />
	, mountNode
)
```
