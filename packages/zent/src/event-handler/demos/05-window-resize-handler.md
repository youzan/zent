---
order: 5
zh-CN:
	title: WindowResizeHandler 组件
	msg: 请尝试调整页面大小
en-US:
	title: WindowResizeHandler component
	msg: Try to resize page
---

```jsx
import { WindowResizeHandler } from 'zent';

function Demo() {
	const [count, setCount] = React.useState(0);
	const onPageResize = React.useCallback(() => {
		setCount(count + 1);
	}, [count]);

	return (
		<div>
			<span>{i18n.msg}</span>
			<span style={{ marginLeft: '1em' }}>{count}</span>
			<WindowResizeHandler onResize={onPageResize} />
		</div>
	);
}

ReactDOM.render(<Demo />, mountNode);
```
