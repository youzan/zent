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
import { InlineLoading } from 'zent';

ReactDOM.render(
	<div className="zent-loading-demo-inline-container">
		<InlineLoading loading />
		<InlineLoading
			loading
			icon="circle"
			iconText="{i18n.loading}"
			textPosition="right"
		/>
		<InlineLoading loading iconText="{i18n.loading}" />
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
