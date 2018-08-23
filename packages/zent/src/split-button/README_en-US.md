---
title: SplitButton
path: component/split-button
group: Data Entry
---

## SplitButton

SplitButton a button with a dropdown menu

### API

| 参数             	 	| 说明                          | 类型                | 默认值       		 | 备选值           							  			         |
| ------------------ | ---------------------------- | ------------------- | ---------------- | --------------------------------------------  |
| type | button style | string | `'default'` | `'primary'`、`'danger'`、`'success'` |
| disabled | is the button disabled | bool | `false` | `true`、`false` |
| loading | is show loading icon | bool | `false` | `true`, `false` |
| size | button size | string | `'medium'`  | `'large'`、`'medium'`、`'small'`  |
| dropdownTrigger | trigger for dropdown menu | string | `'click'` | `'click'`、`'hover'` |
| dropdownData | data for dropdown menu | array | [] | |
| dropdownValue | custom options value's corresponding key, e.g. `{ id: 1, name: 'Doc' }` needs `optionValue="id"` | string | `'value'` | |
| dropdownText | custom options display text's corresponding key, e.g. `{ id: 1, name: 'Doc' }` needs `dropdownText="name"` | string | `'text'` | |
| dropdownPosition | the position of dropodown menu | string | `'auto-bottom-left'` | same as position in Pop |
| onClick | the click callback for left button | func | | |
| onSelect | the select callback for the right dropdown menu | func | | |
| className          | custom classname                  | string              | `''`						 |                                               |
| prefix             | custom prefix                     | string              | `'zent'`				  |																			           |

### onSelect

the param in callback is dropdownValue
