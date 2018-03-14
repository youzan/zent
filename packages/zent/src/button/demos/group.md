---
order: 9
zh-CN:
	title: Button Group 
	b: 加粗
	i: 斜体
	u: 下划线
	l: 左对齐
	m: 居中 
	r: 右对齐
	share: 分享
	download: 下载
en-US:
	title: Button Groupe
	b: B
	i: I 
	u: U 
	l: L 
	m: M 
	r: R 
	share: Share
	download: Download
---

```jsx
import { Button } from 'zent';

ReactDOM.render(
	<div>
		<Button.Group>
			<Button>{i18n.b}</Button>
			<Button>{i18n.i}</Button>
			<Button>{i18n.u}</Button>
		</Button.Group>
		<Button.Group>
			<Button>{i18n.l}</Button>
			<Button>{i18n.m}</Button>
			<Button>{i18n.r}</Button>
		</Button.Group>
		<Button.Group>
			<Button disabled>{i18n.l}</Button>
			<Button disabled>{i18n.m}</Button>
			<Button disabled>{i18n.r}</Button>
		</Button.Group>
		<br />
		<br />
		<Button.Group>
			<Button type="primary" icon="share">{i18n.share}</Button>
			<Button type="primary" icon="download">{i18n.download}</Button>
		</Button.Group>
	</div>
	, mountNode
);
```
