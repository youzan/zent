---
order: 2
zh-CN:
  title: 滚动提示
  content: 滚动提示文案
en-US:
  title: Scroll-Alert
  content: Info Scroll-Alert Text
---

```jsx
import { ScrollAlert, AlertItem } from 'zent';

ReactDOM.render(
	<div className="zent-alert-example">
		<ScrollAlert>
			<AlertItem closable>{i18n.content}111</AlertItem>
			<AlertItem closable>{i18n.content}222</AlertItem>
			<AlertItem closable>{i18n.content}333</AlertItem>
		</ScrollAlert>
		<ScrollAlert>
			<AlertItem title="{i18n.title}111" description="{i18n.content}111" />
			<AlertItem title="{i18n.title}222" description="{i18n.content}222" />
			<AlertItem title="{i18n.title}333" description="{i18n.content}333" />
		</ScrollAlert>
	</div>,
	mountNode
);
```

<style>
.zent-alert-example .zent-alert-scroll {
	margin-bottom: 16px;
}
</style>
