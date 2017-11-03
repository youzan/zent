---
order: 3
zh-CN:
	title: 用户自定义 Breadcrumb.Item 的内容，或者自定义面包屑的所有内容
	index: 首页
	applicationCenter: 应用中心
	marketingCenter: 营销中心
en-US:
	title: The content of Breadcrumb.Item is customizable.The whole Breadcrumb can be customized as well.
	index: Index
	applicationCenter: Application Center
	marketingCenter: Marteting Center
---

```jsx
import { Alert, Icon } from 'zent';

ReactDOM.render(
	<Breadcrumb>
		<Breadcrumb.Item>
			<a href="//www.youzan.com">{i18n.index}</a>
		</Breadcrumb.Item>
		<Breadcrumb.Item>
			<span>{i18n.applicationCenter}</span>
		</Breadcrumb.Item>
		<span>{i18n.marketingCenter}</span>
	</Breadcrumb>
	, mountNode
)
```
