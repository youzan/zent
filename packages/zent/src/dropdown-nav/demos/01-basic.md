---
order: 1
zh-CN:
	title: 基础
en-US:
	title: basic
---

```js
import { DropdownNav } from 'zent';

const navList = [
	{
    key: 'https://www.baidu.com',
		label: '百度'
	},
	{
		key: 'https://www.jd.com',
		label: '京东'
	},
];

ReactDOM.render(
	<div className='dropdown-nav-container'>
		<DropdownNav
			navTitle={'下拉导航菜单'}
			navList={navList}
			onItemClick={(e, key) => console.log('key', key)}
			trigger="click"
		/>
	</div>,
	mountNode
);
```
