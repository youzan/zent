---
order: 6
zh-CN:
	title: 支持自定义回调
	deleted: 被删除了，它的值是
en-US:
	title: Custom Callback
	deleted: was selected, and its value is
---

```js
import { Select, Dialog } from 'zent';

const data = [
     {id: 1, name: 'Option 1'},
     {id: 2, name: 'Option 2'},
     {id: 3, name: 'Option 3'}
];

function showOption(ev, data) {
  Dialog.openDialog({
    children: `${data.name} {i18n.deleted} ${data.id}`
  });
}

ReactDOM.render(
	<Select
    data={data}
    optionValue="id"
    optionText="name"
    onChange={showOption}
	/>,
	mountNode
);
```
