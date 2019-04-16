---
order: 1
zh-CN:
	title: 通过 offsetTop 设置到顶部距离
	index: 首页
	affix: 固钉
en-US:
	title: Using offsetTop to set offset from viewport's top
	index: Index
	affix: Affix
---

```js
import { Affix, LayoutRow as Row, LayoutCol as Col, Button } from 'zent';

ReactDOM.render(
	<Row style={{ margin: '10px 0' }}>
		<Col span={8}>
			<Button type="primary" size="large">
				{i18n.index}
			</Button>
		</Col>
		<Col span={8} offset={8}>
			<Affix offsetTop={135}>
				<Button type="primary" size="large">
					{i18n.affix}
				</Button>
			</Affix>
		</Col>
	</Row>,
	mountNode
);
```
