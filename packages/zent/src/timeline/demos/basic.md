---
order: 1
zh-CN:
	title: 基础用法
	horizontal: 横向
	vertical: 纵向
	sample: 样例
	length: 自定义长度
	noDot: 不显示圆点，自定义颜色
	noLabel: 不显示标签
	customDotColor: 自定义圆点颜色
en-US:
	title: Basic usage
	horizontal: Horizontal
	vertical: Vertical
	sample: Sample
	length: Custom length
	noDot: No dot, custom color
	noLabel: No label
	customDotColor: Custom dot color
---

```jsx
import { Timeline } from 'zent';

ReactDOM.render(
	<div>
		<h3>{i18n.horizontal}</h3>
		<Timeline.Legend>{i18n.sample}</Timeline.Legend>
		<Timeline type="horizontal">
			<Timeline.Item label="Time 1" />
			<Timeline.Item label="Time 2" tip="hello" />
			<Timeline.Item label="Time 3" />
			<Timeline.Item size={0} label="{i18n.length}" />
		</Timeline>
		<h3>{i18n.vertical}</h3>
		<Timeline.Legend>{i18n.sample}</Timeline.Legend>
		<Timeline type="vertical">
			<Timeline.Item label="Time 1" />
			<Timeline.Item label="Time 2" tip="hello" />
			<Timeline.Item label="Time 3" />
			<Timeline.Item label="{i18n.noDot}" showDot={false} lineColor="red" />
			<Timeline.Item label="{i18n.noLabel}" showLabel={false} />
			<Timeline.Item label="{i18n.customDotColor}" dotColor="#5197FF" />
			<Timeline.Item size={0} label="{i18n.length}" />
		</Timeline>
	</div>,
	mountNode
);
```
