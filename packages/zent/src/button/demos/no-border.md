---
order: 6
zh-CN:
	title: 无边框按钮，一般在背景色比较深的地方使用，使用时要注意和背景色的对比区分。
	button: 无边框
en-US:
	title: Button without border, generally used in a darker background. Make sure the colors are different between background and button.
	button: No border
---

```jsx
import { Button } from 'zent';

ReactDOM.render(
	<Button bordered={false} type="primary">{i18n.button}</Button>
	, mountNode
);
```
