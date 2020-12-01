---
order: 4
zh-CN:
	title: 根据窗口或容器自动调整大小
	toggle: 切换大小
en-US:
	title: Resize whenever Window or container size changes
	toggle: Resize
---

```js
import { ClampLines, Button } from 'zent';

function Demo() {
	const [width, setWidth] = React.useState('100%');
	const toggleWidth = React.useCallback(() => {
		if (width === '50%') {
			setWidth('100%');
		} else {
			setWidth('50%');
		}
	}, [width, setWidth]);

	return (
		<div style={{ width, color: '#666', fontSize: 14 }}>
			<ClampLines
				lines={2}
				resizable
				popWidth={400}
				text="Zent ( \ˈzent\ ) 是有赞 PC 端 WebUI 规范的 React 实现，提供了一整套基础的 UI 组件以及一些常用的业务组件。目前我们有 50+ 组件，这些组件都已经在有赞的各类 PC 业务中使用，我们会在此基础上，持续开发一些新组件。我们的目标是让 React 项目开发更快、更简单。"
			/>
			<div style={{ marginTop: 16 }}>
				<Button onClick={toggleWidth}>{i18n.toggle}</Button>
			</div>
		</div>
	);
}

ReactDOM.render(<Demo />, mountNode);
```
