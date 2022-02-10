---
order: 6
zh-CN:
	title: 关闭标签，支持添加关闭事件
	text1: 自定义色彩
	text2: 自定义关闭按钮颜色
en-US:
	title: Support the callback function that is trigger
	text1: custom color
	text2: custom close button color
---

```jsx
import { Tag, Notify } from 'zent';

const closeCallback = e => {
	Notify.success('Close tag');
};

const closeCallback2 = e => {
	Notify.success('Close tag2');
};

ReactDOM.render(
	<div>
		<Tag closable onClose={closeCallback} outline>
			{i18n.text1}
		</Tag>
		<Tag theme="grey" closable closeButtonStyle={{ color: '#969799' }}>
			{i18n.text2}
		</Tag>
	</div>,
	mountNode
);
```
