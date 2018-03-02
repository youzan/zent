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
import { Pop, Button, Input } from 'zent';

ReactDOM.render(
	<div className="zent-doc-pop-container">
		<Pop centerArrow trigger="hover" position="top-left" content="{i18n.contentTrue}">
			<span className="zent-doc-pop-tag">Y</span>
		</Pop>
		<Pop trigger="hover" position="top-left" content="{i18n.contentFalse}">
			<span className="zent-doc-pop-tag">N</span>
		</Pop>
	</div>
	, mountNode
);
```
