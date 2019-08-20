---
title: Tabs
path: component/tabs
group: Navigation
---

## Tabs

Tabs is used to switch different view in one page.

### API

#### Tabs

| Property             | Description                                                     | Type                          | Default    | Alternative                        | Required |
| -------------------- | --------------------------------------------------------------- | ----------------------------- | ---------- | ---------------------------------- | -------- |
| activeId             | The id of the active tab                                        | string \| number              |            |                                    | yes      |
| type                 | The type of tabs                                                | string                        | `'normal'` | `'card'`, `'button'`, `'vertical'` | no       |
| align                | The layout of tabs                                              | string                        | `'left'`   | `'right'`, `'center'`              | no       |
| onChange             | The callback function that is triggered when the tab is active  | (id: string \| number) => any |            |                                    | no       |
| onDelete             | The callback function that is triggered when the tab is closed. | (id: string \| number) => any |            |                                    | no       |
| candel               | Whether the tab can be deleted.                                 | bool                          | `false`    | `true`                             | no       |
| tabs                 | The config of tabs when not using Panel.                        | Array<ITab>                   | `null`     |                                    | no       |
| className            | The custom classname                                            | string                        | `''`       |                                    | no       |
| navExtraContent      | Nav add extra content                                           | node                          | null       |                                    | no       |
| navExtraContentAlign | Extra content Align Position                                    | string                        | `'right'`  | `'left'`                           | no       |
| stretch              | is tab stretch to fill content space                            | boolean                       | false      |                                    | no       |

Paramerter type of `tabs`：

```ts
interface ITab {
	key: string | number; // 同TabPanel id
	title: string | number; // 同TabPanel tab
	disabled?: boolean; // 同TabPanel disabled
}
```

#### TabPanel

| Property | Description                                             | Type             | Required |
| -------- | ------------------------------------------------------- | ---------------- | -------- |
| tab      | The label of the tab which corresponding to this panel. | string           | yes      |
| id       | The id of the tab panel.                                | string \| number | yes      |
| disabled | Disable this tab panel.                                 | bool             | no       |
