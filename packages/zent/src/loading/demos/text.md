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
import { Loading } from 'zent';

ReactDOM.render(
	<div>
		<Loading.Block loading iconSize={64} iconText="{i18n.text}" />
		<Loading.Block loading icon="circle" iconSize={64} iconText="{i18n.text}" />
	</div>,
	mountNode
);
```
