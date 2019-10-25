---
title: Tabs
subtitle: 选项卡
path: component/tabs
group: 导航
---

## Tabs 选项卡组件

选项卡组件

### API

#### Tabs

| 参数               | 说明                                                                 | 类型                          | 默认值     | 备选值               | 是否必须 |
| ------------------ | -------------------------------------------------------------------- | ----------------------------- | ---------- | -------------------- | -------- |
| activeId           | 激活的 tab-id                                                        | string \| number              |            |                      | 是       |
| onChange           | 选中的 tab 改变时                                                    | (id: string \| number) => any |            |                      | 是       |
| tabs               | 不使用 Panel 时的标签列表                                            | Array<ITab\>                  |            |                      | 否       |
| className          | 自定义额外类名                                                       | string                        |            |                      | 否       |
| type               | tabs 组件类型                                                        | string                        | `'normal'` | `'card'`, `'button'` | 否       |
| navExtraContent    | 导航添加额外内容                                                     | React.ReactNode               |            |                      | 否       |
| stretch            | tab 是否撑满全部空间                                                 | boolean                       | `false`    |                      | 否       |
| onDelete           | 关闭 tab 时                                                          | (id: string \| number) => any |            |                      | 否       |
| candel             | 是否可删除                                                           | bool                          | `false`    |                      | 否       |
| unmountPanelOnHide | panel 非 active 时，不使用 `display: none` 隐藏而是直接 unmount 组件 | bool                          | `false`    |                      | no       |

tabs 参数类型：

```ts
interface ITab {
	key: string | number; // 同TabPanel id
	title: ReactNode; // 同TabPanel tab
	disabled?: boolean; // 同TabPanel disabled
}
```

#### VerticalTabs

| 参数               | 说明                                                                 | 类型                          | 默认值  | 备选值 | 是否必须 |
| ------------------ | -------------------------------------------------------------------- | ----------------------------- | ------- | ------ | -------- |
| activeId           | 激活的 tab-id                                                        | string \| number              |         |        | 是       |
| onChange           | 选中的 tab 改变时                                                    | (id: string \| number) => any |         |        | 是       |
| tabs               | 不使用 Panel 时的标签列表                                            | Array<IVerticalTab\>          |         |        | 否       |
| className          | 自定义额外类名                                                       | string                        |         |        | 否       |
| scrollHeight       | 可滚动区域的最大高度                                                 | string \| number              |         |        | 否       |
| unmountPanelOnHide | panel 非 active 时，不使用 `display: none` 隐藏而是直接 unmount 组件 | bool                          | `false` |        | no       |

tabs 参数类型：

```ts
type IVerticalTab = ITab | { divide: true };
```

#### TabPanel

| 参数          | 说明                                                           | 类型             | 是否必须 |
| ------------- | -------------------------------------------------------------- | ---------------- | -------- |
| tab           | 该 TabPanel 所对应的 tab 标签的名字                            | ReactNode        | 是       |
| id            | 该 TabPanel 的 id                                              | string \| number | 是       |
| disabled      | 该 TabPanel 是否被禁用                                         | bool             | 否       |
| className     | 该 TabPanel 上添加的额外 className                             | bool             | 否       |
| unmountOnHide | 非 active 时，不使用 `display: none` 隐藏而是直接 unmount 组件 | bool             | 否       |

#### Divide

用于表示 VerticalTabs 的分割线，不需要传递 props
