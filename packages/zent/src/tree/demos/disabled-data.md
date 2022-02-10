---
order: 2
zh-CN:
	title: 列表格式数据源
	index: 首页
	tree: 树
	title1: 杭州有赞科技有限公司
	title2: 技术
	title3: 后端
	title4: 运维
	title5: 前端
	title6: 产品

en-US:
	title: Array data
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
}, {
	id: 2,
	title: '{i18n.title2}',
	parentId: 1
}, {
	id: 3,
	title: '{i18n.title3}',
	parentId: 2
}, {
	id: 4,
	title: '{i18n.title4}',
	parentId: 2
}, {
	id: 5,
	title: '{i18n.title5}',
	parentId: 2
}, {
	id: 6,
	title: '{i18n.title6}',
	parentId: 1
}];

ReactDOM.render(
	<Tree dataType="plain" data={treeData} />
	, mountNode
)
```
