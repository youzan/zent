---
title: Menu
path: component/menu
group: Navigation
---

## Menu

Menu, can be used to provide navigation.

### API

#### Menu

| Property | Description | Type | Default | Optional |
|------|------|------|--------|---------|
| onClick | Callback fires when a node of menu is clicked | func |  | |
| onSubMenuClick | Callback fires when a SubMenu is clicked | func |  | |
| onExpandChange | Callback fires when SubMenus toggle expand/collapsed, input param is the array of currently expanded SubMenu IDs | func |  | |
| style | Custom inline styles | object |  | |
| mode | the display mode | string | 'pop' | 'pop', 'inline' |
| defaultExpandKeys | the default expand keys for SubMenu | array | | |
| defaultSelectedKey | the default selected Key for MenuItem | string | |
| inlineIndent | the distance in px when the mode is inline | number | 24 | |
| className | class name for the node | string |  |
| prefix | custom prefix | string | 'zent' | |


#### MenuItem

| Property | Description | Type | Default |
|------|------|------|--------|
| key | the unique identify of the item | string | an ID generated internally |
| disabled | whether to disable the menu item  | bool |  |
| className | custom class name | string |  |
| prefix | custom prefix | string | 'zent' |


#### SubMenu

| Property | Description | Type | Default |
|------|------|------|--------|
| key | the unique identify of the item | string | an ID generated internally |
| title | title of the submenu | node |  |
| disabled | whether to disable the submenu  | bool |  |
| overlayClassName | custom class name of the pop menu | string |  |
| className | custom class name of the submenu item | string |  |
| prefix | custom prefix of the submenu item | string | 'zent' |


### FAQ

- A click event callback function, whose parameters are event and key(which is the key property of the node), is used as a unified agent.
- When the `key` property is not set for the MenuItem, a unique identify of the node (starting from 0) is generated automatically in order and hierarchy, which will be saved on the `index` property as the second argument of the `onClick` function.
  When the `key` property is set manually, the property will be copied to the `index` property and will override  the unique identify generated. It's recommanded to manually set the `key` property to a proper value of MenuItem in the condition that the Menu is not complex.

  ```
	<Menu>
		<MenuItem>   -------- 'item_0'
		<SubMenu>
			<MenuItem> -------- 'item_1_0'
			<MenuItem> -------- 'item_1_1'
		</SubMenu>
		<MenuItem>   -------- 'item_2'
	</Menu>
	```
