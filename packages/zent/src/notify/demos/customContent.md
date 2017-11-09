---
order: 4
zh-CN:
	title: 自定义通知内容
	text: 自定义内容通知
	color: 颜色
	italic: 斜体
	bold: 粗体

en-US:
	title: Custom Notify Content
	text: custom notify content
	color: color
	italic: italic
	bold: bold

---

```jsx
import { Notify, Button } from 'zent';

function customContent() {
	Notify.success(
		<div>
			<span style={{ color: '#f67' }}>{i18n.color}</span>
			<i>{i18n.italic}</i>
			<b>{i18n.bold}</b>
		</div>
	);
}

ReactDOM.render(
	<Button onClick={customContent}>{i18n.text}</Button>
	, mountNode
);

```
