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
			<div className="zent-doc-pop-tag">Y</div>
		</Pop>
		<Pop trigger="hover" position="top-left" content="{i18n.contentFalse}">
			<div className="zent-doc-pop-tag">N</div>
		</Pop>
	</div>
	, mountNode
);
```

<style>
.zent-doc-pop-tag {
	width: 20px;
	height: 20px;
	text-align: center;
	line-height: 20px;
	border: 1px solid #e5e5e5;
	border-radius: 5px;
	margin-right: 10px;
}
</style>
