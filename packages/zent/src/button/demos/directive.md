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
import { ButtonDirective } from 'zent';

function RouterLink({ path, ...props }) {
	return <a {...props} href={`#${path}`} />;
}

ReactDOM.render(
	<ButtonDirective type="primary">
		<RouterLink path="path">{i18n.button}</RouterLink>
	</ButtonDirective>,
	mountNode
);
```
