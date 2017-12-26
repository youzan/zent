---
order: 1
zh-CN:
	title: 基本用法，第二行是 `Portal` 插入的，可以在浏览器里审查元素观察Html结构
	originalContent: 这里是原来就有的内容
	portalContent: 这里是 Portal 动态插入的内容
en-US:
	title: Basic usage
	originalContent: the original content
	portalContent: the content that Portal inserts dynamically

---

```jsx
import { Portal } from 'zent';

ReactDOM.render(
	<div className="zent-doc-portal-container">
		<div className="zent-doc-portal-mount-node">{i18n.originalContent}</div>
		<Portal selector=".zent-doc-portal-mount-node">
			<div className="zent-doc-portal-content">{i18n.portalContent}</div>
		</Portal>
	</div>
	, mountNode
);
```
