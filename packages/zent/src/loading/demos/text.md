---
order: 4
zh-CN:
	title: 自定义图标大小和文字
	text: 加载中
en-US:
	title: Custom icon size and text
	text: Loading
---

```js
import { InlineLoading } from 'zent';

ReactDOM.render(
	<div className="zent-loading-demo-text-wrapper">
		<InlineLoading loading iconSize={16} textSize={12} iconText="{i18n.text}" />
		<InlineLoading loading iconText="{i18n.text}" />
		<InlineLoading loading iconSize={24} textSize={16} iconText="{i18n.text}" />
	</div>,
	mountNode
);
```

<style>
	.zent-loading-demo-text-wrapper {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
</style>
