---
title: Tabs
path: component/tabs
group: Navigation
---

## Tabs

Tabs is used to switch different view in one page.

### API

#### Tabs

| Property           | Description                                                               | Type                          | Default    | Alternative          | Required |
| ------------------ | ------------------------------------------------------------------------- | ----------------------------- | ---------- | -------------------- | -------- |
| activeId           | The id of the active tab                                                  | string \| number              | `''`       |                      | yes      |
| onChange           | The callback function that is triggered when the tab is active            | (id: string \| number) => any |            |                      | yes      |
| tabs               | The config of tabs when not using Panel.                                  | Array<ITab\>                  |            |                      | no       |
| className          | The custom classname                                                      | string                        |            |                      | no       |
| type               | The type of tabs                                                          | string                        | `'normal'` | `'card'`, `'button'` | no       |
| navExtraContent    | Nav add extra content                                                     | React.ReactNode               |            |                      | no       |
| stretch            | Is tab stretch to fill content space                                      | boolean                       | `false`    |                      | no       |
| onDelete           | The callback function that is triggered when the tab is closed.           | (id: string \| number) => any |            |                      | no       |
| candel             | Whether the tab can be deleted.                                           | bool                          | `false`    |                      | no       |
| unmountPanelOnHide | unmount TabPanel on inactive instead of using `display: none` style cover | bool                          | `false`    |                      | no       |

Paramerter type of `tabs`：

```ts
interface ITab {
	key: string | number; // 同TabPanel id
	title: ReactNode; // 同TabPanel tab
	disabled?: boolean; // 同TabPanel disabled
}
```

#### VerticalTabs

| Property           | Description                                                               | Type                          | Default | Alternative | Required |
| ------------------ | ------------------------------------------------------------------------- | ----------------------------- | ------- | ----------- | -------- |
| activeId           | The id of the active tab                                                  | string \| number              | `''`    |             | yes      |
| onChange           | The callback function that is triggered when the tab is active            | (id: string \| number) => any |         |             | yes      |
| tabs               | The config of tabs when not using Panel.                                  | Array<IVerticalTab\>          |         |             | no       |
| className          | The custom classname                                                      | string                        |         |             | no       |
| scrollHeight       | The max height of the scrollable space                                    | string \| number              |         |             | no       |
| unmountPanelOnHide | unmount TabPanel on inactive instead of using `display: none` style cover | bool                          | `false` |             | no       |

Paramerter type of `tabs`：

```ts
type IVerticalTab = ITab | { divide: true };
```

#### TabPanel

| Property      | Description                                                               | Type             | Required |
| ------------- | ------------------------------------------------------------------------- | ---------------- | -------- |
| tab           | The label of the tab which corresponding to this panel.                   | ReactNode        | yes      |
| id            | The id of the tab panel.                                                  | string \| number | yes      |
| disabled      | Disable this tab panel.                                                   | bool             | no       |
| className     | The extra className of the panel                                          | bool             | no       |
| unmountOnHide | unmount TabPanel on inactive instead of using `display: none` style cover | bool             | 否       |

#### Divide

Using to show divide line with VerticalTabs, no need to pass any props.
