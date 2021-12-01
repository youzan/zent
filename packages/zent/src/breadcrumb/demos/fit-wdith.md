---
order: 5
zh-CN:
	title: 可宽度适配
	content: 内容
en-US:
	title: Fit Width
	content: Content
---

```jsx
import { Breadcrumb } from 'zent';

const dataList = Array(20).fill().map((_, index) => ({
	name: `{i18n.content} ${index}`,
	href: '//www.youzan.com',
}));

ReactDOM.render(
	<Breadcrumb style={{ width: '400px' }} breads={dataList} />
	, mountNode
);
```
