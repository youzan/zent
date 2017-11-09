---
order: 2
zh-CN:
	title: 可以直接调用 Breadcrumb.Item 组件
	index: 首页
	applicationCenter: 应用中心
	marketingCenter: 营销中心
en-US:
	title: Breadcrmb.Item can be used directory
	index: Index
	applicationCenter: Application Center
	marketingCenter: Marteting Center
---

```jsx
import { Alert, Icon } from 'zent';

ReactDOM.render(
	<Breadcrumb>
		<Breadcrumb.Item name="{i18n.index}" href="//www.youzan.com" />
		<Breadcrumb.Item name="{i18n.applicationCenter}" href="//www.youzan.com" className="zent-demo-bread" />
		<Breadcrumb.Item name="{i18n.marketingCenter}" />
	</Breadcrumb>
	, mountNode
)
```
