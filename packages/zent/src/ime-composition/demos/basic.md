---
order: 1
zh-CN:
  title: 基本用法
en-US:
  title: Basic Usage
---

```js
import { IMEComposition, Input, Button } from 'zent';

function Simple() {
	const [enable, setEnable] = React.useState(true);
	const [text, setText] = React.useState('ime');

	const onInputChange = (e) => {
		setText(e.target.value);
	}

	return (
		<div className="ime-composition-demo">
			<IMEComposition enable={enable}>
				<Input value={text} onChange={onInputChange} />
				<Input value={text} onChange={onInputChange} type="textarea" />
			</IMEComposition>
			<Button type="primary" onClick={() => setEnable(!enable)}>
				{enable ? 'Disable' : 'Enable'} IMEComposition
			</Button>
		</div>
	);
}

ReactDOM.render(<Simple />, mountNode);
```

<style>
.ime-composition-demo {
	display: inline-flex;
	flex-direction: column;
}

.ime-composition-demo > * {
	margin-bottom: 10px;
}
</style>
