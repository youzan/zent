---
order: 3
zh-CN:
	title: 使用 `centerArrow` 来控制气泡小三角的位置
	contentTrue: centerArrow 为 true
	contentFalse: centerArrow 为 false
en-US:
	title: Use `centerArrow` to control arrow position
	contentTrue: centerArrow is true
	contentFalse: centerArrow is false
---

```jsx
import { Tooltip, Button, Input } from 'zent';

ReactDOM.render(
	<div className="zent-doc-tooltip-container">
		<Tooltip centerArrow trigger="hover" position="top-left" title="{i18n.contentTrue}">
			<span className="zent-doc-tooltip-tag">Y</span>
		</Tooltip>
		<Tooltip trigger="hover" position="top-left" title="{i18n.contentFalse}">
			<span className="zent-doc-tooltip-tag">N</span>
		</Tooltip>
	</div>
	, mountNode
);
```
