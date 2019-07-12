---
order: 10
zh-CN:
	title: Directive
	button: Link
en-US:
	title: Directive
	button: Link
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
