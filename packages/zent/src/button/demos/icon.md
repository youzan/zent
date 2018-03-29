---
order: 8
zh-CN:
	title: 按钮图标
	search: 搜索
	save: 保存
	nextStep: 下一步
en-US:
	title: Button Icon
	search: Search
	save: Save
	nextStep: Next step 
---

```jsx
import { Button, Icon } from 'zent';

ReactDOM.render(
  <div>
    <Button icon="search">{i18n.search}</Button>
    <Button><Icon type="check" />{i18n.save}</Button>
		<Button>{i18n.nextStep}<Icon type="right" /></Button>
  </div>
	, mountNode
);
```
