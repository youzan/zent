---
order: 6
zh-CN:
	title: 无边框按钮，一般在背景色比较深的地方使用
	button: 一级按钮
en-US:
	title: Button without border, generally used in a darker background
	button: First level
---

```jsx
import { Button } from 'zent';

ReactDOM.render(
	<Button>{i18n.button}</Button>
	, mountNode
);
```
