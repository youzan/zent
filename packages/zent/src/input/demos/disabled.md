---
order: 8
zh-CN:
	title: 不可编辑状态
	days: 天
	discount: 折扣
en-US:
	title: Disabled
	days: days
	discount: discount
---

```jsx
import { Input } from 'zent';

ReactDOM.render(
  <div>
			<Input value="Blah" disabled />
			<Input value="42" disabled addonBefore="$" />
			<Input value="42" readOnly addonAfter="{i18n.days}" />
			<Input value="42" disabled addonBefore="$" addonAfter="{i18n.discount}" />
      <Input type="textarea" placeholder="Blah" readOnly />
  </div>
  , mountNode
);
```
