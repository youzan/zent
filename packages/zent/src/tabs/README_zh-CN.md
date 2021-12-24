---
title: Tabs
subtitle: 选项卡
path: component/tabs
group: 导航
scatter: true
---

## Tabs 基础选项卡

用于大体量信息的拆分展示，提供切换

### 建议

- 适用于在同个容器内，同级别信息的分类展示。
- 在某个容器内需要把大量信息摆放出来时，可对信息进行归类，以平级的方式进行收纳和展现。

### 注意

- 信息之间有层级关系时，不使用选项卡。

### 代码演示

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-5 -->
<!-- demo-slot-3 -->
<!-- demo-slot-4 -->
<!-- demo-slot-8 -->

### API

#### Tabs

| 参数               | 说明                                                                 | 类型                                                                                 | 默认值     | 备选值               | 是否必须 |
| ------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------- | -------------------- | -------- |
| activeId           | 激活的 tab-id                                                        | string \| number                                                                     |            |                      | 是       |
| onChange           | 选中的 tab 改变时                                                    | (id: string \| number) => any                                                        |            |                      | 是       |
| tabs               | 不使用 Panel 时的标签列表                                            | Array<ITab\>                                                                         |            |                      | 否       |
| className          | 自定义额外类名                                                       | string                                                                               |            |                      | 否       |
| type               | tabs 组件类型                                                        | string                                                                               | `'normal'` | `'card'`, `'button'` | 否       |
| navExtraContent    | 导航添加额外内容                                                     | React.ReactNode                                                                      |            |                      | 否       |
| stretch            | tab 是否撑满全部空间                                                 | boolean                                                                              | `false`    |                      | 否       |
| onDelete           | 关闭 tab 时                                                          | (id: string \| number) => any                                                        |            |                      | 否       |
| onAdd              | 添加 tab 时                                                          | () => void                                                                           |            |                      | 否       |
| candel             | 是否可删除                                                           | bool                                                                                 | `false`    |                      | 否       |
| canFixed           | 是否可固定                                                           | bool                                                                                 | `false`    |                      | 否       |
| unmountPanelOnHide | panel 非 active 时，不使用 `display: none` 隐藏而是直接 unmount 组件 | bool                                                                                 | `false`    |                      | 否       |
| overflowMode       | 标签过多时查看全部标签的方式                                         | string                                                                               | `'anchor'` | `'slide'`            | 否       |
| disableLazyMount   | 禁用 `TabPanel` 延迟挂载                                             | bool                                                                                 | `false`    |                      | 否       |
| renderTabBar       | 替换 TabBar，用于二次封装标签头                                      | `(props: ITabsNavProps, TabBar: ComponentType<ITabsNavProps>) => React.ReactElement` |            |                      | 否       |

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

#### 以下功能新版设计语言已废弃，仅作为老版使用的参考

<!-- demo-slot-6 -->
<!-- demo-slot-7 -->
<!-- demo-slot-9 -->
