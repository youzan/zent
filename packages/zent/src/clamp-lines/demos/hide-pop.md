---
order: 2
zh-CN:
	title: 不显示pop提示
en-US:
	title: Hide Pop
---

```js
import { ClampLines } from 'zent';

ReactDOM.render(
	<div style={{ width: 400, color: '#666', fontSize: 14 }}>
		<ClampLines
			lines={3}
			popWidth={400}
			showPop={false}
			text="Zent ( \ˈzent\ ) 是有赞 PC 端 WebUI 规范的 React 实现，提供了一整套基础的 UI 组件以及一些常用的业务组件。目前我们有 50+ 组件，这些组件都已经在有赞的各类 PC 业务中使用，我们会在此基础上，持续开发一些新组件。我们的目标是让 React 项目开发更快、更简单。"
		/>
	</div>
	, mountNode
);
```