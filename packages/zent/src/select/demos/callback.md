---
order: 6
zh-CN:
	title: 支持自定义回调
	pla: 请选择
en-US:
	title: Custom Callback
	pla: Select an option
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
    children: `${data.name} was selected, and its value is ${data.id}.`
  });
}

ReactDOM.render(
	<Select
		placeholder="{i18n.pla}"
    data={data}
    optionValue="id"
    optionText="name"
    onChange={showOption}
	/>,
	mountNode
);
```
