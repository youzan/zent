---
title: Tabs
path: component/tabs
group: Navigation
---

## Tabs

Tabs is used to switch different view in one page. 

### API

#### Tabs

| Property     |  Description  | Type     | Default  | Alternative | Required |
| ---------| --------- | -------- | ----- | --------- | ---- |
| activeId    | The id of the active tab | string \| number  | |           | yes    |
| type        | The type of tabs  | string | `'normal'` | `'card'`, `'slider'` | no |
| size        | The size of tabs | string   | `'normal'` | `'huge'` | no  |
| align       | The layout of tabs | string | `'left'`   | `'right'`, `'center'` | no |
| onChange    | The callback function that is triggered when the tab is active | (id: string \| number) => any |    |    | no    |
| onDelete    | The callback function that is triggered when the tab is closed. | (id: string \| number) => any |      |         | no |
| onAdd       | The callback function that is triggered when adding tab. | func | |   | no    |
| candel      | Whether the tab can be deleted.  | bool  | `false` |  `true` | no    |
| canadd      | Whether the tabs can add more tab pannels. | bool | `false`    |  `true`  | no |
| tabs | The config of tabs when not using Panel. | Array | `null` | | no |
| className   | The custom classname   | string   | `''`   |  | no   |
| prefix      | The custom prefix | string   | `'zent'` |   | no   |

Paramerter type of `tabs`：
```ts
Array<{
	key: string | number, // the same as TabPanel's `id`
	title: string | number, // the same as TabPanel's `tab`
	disabled?: boolean // the same as TabPanel's `disabled`
}>

```

#### TabPanel

| Property     |  Description  | Type     | Required |
| --- | --------------------- | ------ | ---- |
| tab | The label of the tab which corresponding to this panel. | string | yes    |
| id  | The id of the tab panel. | string \| number | yes    |
| disabled | Disable this tab panel. | bool | no |
