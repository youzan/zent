---
order: 11
zh-CN:
	title: Directive
	button: 按钮
en-US:
	title: Directive
	button: Button
---

```jsx
import { Button } from 'zent';

function RouterLink({ path, ...props }) {
	return <a {...props} href={`#${path}`} />;
}

ReactDOM.render(
	<Button.Directive type="primary">
		<RouterLink path="path">{i18n.button}</RouterLink>
	</Button.Directive>,
	mountNode
);
```
