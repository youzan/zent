---
order: 4
zh-CN:
	title: 可选中标签
	selected: 选中标签
en-US:
	title: Selectable Tags
	selected: selected tag
---

```jsx
import { Tag, LinkTag } from 'zent';

function Demo() {
	const [selected, setSelected] = React.useState(true);

	const handleChange = (selected) => {
		setSelected(selected);
	}

	return (
		<div>
			<SelectTag selected={selected} onChange={handleChange}>{i18n.selected}</SelectTag>
		</div>
	);
}

ReactDOM.render(<Demo />, mountNode);
```
