---
order: 4
zh-CN:
	title: 自定义节点展示
	index: 首页
	tree: 树
	title1: 杭州有赞科技有限公司
	title2: 技术
	title3: 后端
	title4: 运维
	title5: 前端
	title6: 产品
	content: 移动零售服务商
	job: 职位介绍http://job.youzan.com
	resume: 请将简历发送至 joinus@youzan.com

en-US:
	title: Custom Node Display
	index: Index
	tree: Tree
	title1: Hangzhou Youzan Technology Co. Ltd
	title2: Engineer
	title3: Back End Engineer
	title4: Front End Engineer
	title5: Operations Engineer
	title6: Product
	content: great company
	job: job http://job.youzan.com
	resume: send resume to  joinus@youzan.com
---

```jsx
import { Tree } from 'zent';

const treeData = [{
	id: 1,
	title: '{i18n.title1}',
	content: '{i18n.content}',
	children: [{
		id: 2,
		title: '{i18n.title2}',
		content: '{i18n.job}',
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
		title: '{i18n.title6}',
		content: <a href="http://job.youzan.com">'{i18n.resume}'</a>,
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
