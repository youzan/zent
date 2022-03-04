---
order: 4
zh-CN:
	title: 可折叠的面包屑
	index: 首页
	applicationCenter: 应用中心
	marketingCenter: 营销中心
	marketingPlay: 营销玩法
en-US:
	title: Basic Usage
	index: Index
	applicationCenter: Application Center
	marketingCenter: Marteting Center
	marketingPlay: Marteting Play
---

```jsx
import { Breadcrumb } from 'zent';

const dataList = [
	{ name: '{i18n.index}', href: '//www.youzan.com' },
	{ name: '{i18n.applicationCenter}', href: '//www.youzan.com' },
	{ name: '{i18n.marketingCenter}', href: '//www.youzan.com' },
	{ name: '{i18n.marketingPlay}' },
];

ReactDOM.render(
	<Breadcrumb breads={dataList} maxItemCount={3} />
	, mountNode
);
```
