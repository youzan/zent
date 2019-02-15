---
order: 5
zh-CN:
	title: 内联样式
	loading: 加载中
en-US:
	title: Inline style
	loading: Loading
---

```js
import { Loading } from 'zent';

ReactDOM.render(
	<div className="zent-loading-demo-inline-container">
		<Loading.Inline loading />
		<Loading.Inline loading iconText="{i18n.loading}" />
		<Loading.Inline loading iconText="{i18n.loading}" textPosition="top" />
		<Loading.Inline
			loading
			icon="circle"
			iconText="{i18n.loading}"
			textPosition="left"
		/>
		<Loading.Inline
			loading
			icon="circle"
			iconText="{i18n.loading}"
			textPosition="right"
		/>
	</div>,
	mountNode
);
```

<style>
	.zent-loading-demo-inline-container {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
</style>
