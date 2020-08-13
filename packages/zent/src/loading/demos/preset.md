---
order: 7
zh-CN:
	title: 预设主题色
	loading: 加载中
en-US:
	title: Color preset
	loading: Loading
---

```js
import { InlineLoading } from 'zent';

ReactDOM.render(
	<div className="zent-loading-demo-inline-container">
		<InlineLoading
			loading
			icon="circle"
			iconText="{i18n.loading}"
			colorPreset="grey"
		/>
		<InlineLoading loading icon="circle" colorPreset="grey" />
	</div>,
	mountNode
);
```
