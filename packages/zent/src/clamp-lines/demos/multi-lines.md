---
order: 2
zh-CN:
	title: 基础用法
	accurate: 精确模式

en-US:
	title: Basic Usage
	accurate: Accurate Mode
---

```js
import { ClampLines, Checkbox, Input, Select } from 'zent';

function Demo() {
	const [accurate, setAccurate] = React.useState(false);
	const onAccurateChange = React.useCallback(
		evt => {
			setAccurate(evt.target.checked);
		},
		[]
	);

	const linesOptions = React.useMemo(
		() =>
			new Array(10).fill(0).map((_, i) => ({
				key: i + 1,
				text: i + 1,
			})),
		[]
	);
	const [lines, setLines] = React.useState(linesOptions[2]);
	const onLinesChange = React.useCallback(
		option => {
			setLines(option);
		},
		[]
	);

	const [text, setText] = React.useState(
		'Zent ( ˈzent ) 是🇺🇸🇯🇵🇬🇧🇩🇪🇫🇷🇮🇹🇮🇸🍎有赞 PC 端 WebUI 规范的 React 实现，提供了一整套基础的 UI 组件以及一些常用的业务组件。目前我们有 50+ 组件，这些组件都已经在有赞的各类 PC 业务中使用，我们会在此基础上，持续开发一些新组件。我们的目标是让 React 项目开发更快、更简单。'
	);
	const onTextChange = React.useCallback(
		evt => {
			setText(evt.target.value);
		},
		[]
	);

	return (
		<div style={{ display: 'flex' }}>
			<div
				style={{
					color: '#666',
					fontSize: 14,
					flexBasis: 400,
				}}
			>
				<ClampLines
					accurate={accurate}
					lines={lines.key}
					popWidth={400}
					text={text}
				/>
			</div>
			<div style={{ marginLeft: 48 }}>
				<Checkbox checked={accurate} onChange={onAccurateChange}>
					{i18n.accurate}
				</Checkbox>
				<div style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
					<Select
						options={linesOptions}
						onChange={onLinesChange}
						value={lines}
						inline
						width={100}
					/>
					<span>行</span>
				</div>
			</div>
			<div style={{ marginLeft: 16, flexGrow: '1' }}>
				<Input type="textarea" value={text} onChange={onTextChange} />
			</div>
		</div>
	);
}

ReactDOM.render(<Demo />, mountNode);
```
