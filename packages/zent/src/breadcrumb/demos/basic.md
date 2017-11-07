---
order: 1
zh-CN:
	title: 基础用法
	index: 首页
	applicationCenter: 应用中心
	marketingCenter: 营销中心
en-US:
	title: Basic Usage
	index: Index
	applicationCenter: Application Center
	marketingCenter: Marteting Center
---

```jsx
import { Breadcrumb } from 'zent';

const dataList = [
	{ name: '{i18n.index}', href: '//www.youzan.com' },
	{ name: '{i18n.applicationCenter}', href: '//www.youzan.com' },
	{ name: '{i18n.marketingCenter}' }
];

ReactDOM.render(
	<Breadcrumb breads={dataList} />
	, mountNode
);
```
