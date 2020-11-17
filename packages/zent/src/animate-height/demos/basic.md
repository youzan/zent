---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic Usage
---

```jsx
import { AnimateHeight, Button } from 'zent';

const INITIAL_HEIGHT = 200;

function Demo() {
	const [height, setHeight] = React.useState('auto');
	const inc = React.useCallback(() => {
		setHeight(
			Math.min(550, (height === 'auto' ? INITIAL_HEIGHT : height) + 50)
		);
	}, [height]);
	const dec = React.useCallback(() => {
		setHeight(
			Math.max(100, (height === 'auto' ? INITIAL_HEIGHT : height) - 50)
		);
	}, [height]);
	const reset = React.useCallback(() => {
		setHeight('auto');
	}, [height]);

	return (
		<div>
			<Button onClick={inc}>+100px</Button>
			<Button onClick={dec}>-100px</Button>
			<Button onClick={reset}>auto</Button>
			<AnimateHeight
				className="zent-animate-height-demo"
				height={height}
				style={{ background: '#114db4', marginTop: 16 }}
			>
				<div style={{ height: INITIAL_HEIGHT }}></div>
			</AnimateHeight>
		</div>
	);
}

ReactDOM.render(
	<div style={{ height: 600 }}>
		<Demo />
	</div>,
	mountNode
);
```
