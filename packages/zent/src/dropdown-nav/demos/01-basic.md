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
			navList={navList}
			onItemClick={(e, key) => console.log('key', key)}
			trigger="click"
		>下拉导航菜单</DropdownNav>
	</div>,
	mountNode
);
```

<style>
.dropdown-nav-container {
  padding: 24px;
  background-color: #efefef;
}
</style>
