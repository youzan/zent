---
order: 5
zh-CN:
	title: 渲染额外节点
en-US:
	title: Extra Node
---

```js
import { ClampLines } from 'zent';

ReactDOM.render(
	<div style={{ width: "50%", color: '#666', fontSize: 14 }}>
		<ClampLines
			lines={2}
			popWidth={400}
			extra={(
				<a>更多</a>
			)}
			text="Zent ( \ˈzent\ ) 是有赞 PC 端 WebUI 规范的 React 实现，提供了一整套基础的 UI 组件以及一些常用的业务组件。目前我们有 50+ 组件，这些组件都已经在有赞的各类 PC 业务中使用，我们会在此基础上，持续开发一些新组件。我们的目标是让 React 项目开发更快、更简单。"
		/>
	</div>
	, mountNode
);
```
