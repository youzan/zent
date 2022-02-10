---
order: 16
zh-CN:
	title: 文本按钮
	button: 按钮
en-US:
	title: text
	button: text Button
---

```jsx
import { Button } from 'zent';

ReactDOM.render(
  <div>
		<Button type={'text'}>{i18n.button}</Button>
		<Button loading type={'text'}>{i18n.button}</Button>
		<Button disabled type={'text'}>{i18n.button}</Button>
	</div>
	, mountNode
);
```
