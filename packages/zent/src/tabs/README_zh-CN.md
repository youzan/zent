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

| 参数          | 说明        | 类型       | 默认值        | 备选值                   | 是否必须 |
| ----------- | --------- | -------- | ---------- | --------------------- | ---- |
| activeId    | 激活的tab-id | string \| number  |            |                       | 是    |
| type        | tabs组件类型  | string   | `'normal'` | `'card'`, `'slider'`  | 否    |
| size        | tabs的尺寸类型 | string   | `'normal'` | `'huge'`              | 否    |
| align       | tabs的布局类型 | string   | `'left'`   | `'right'`, `'center'` | 否    |
| onChange    | 选中的tab改变时 | (id: string \| number) => any |            |                       | 否    |
| onDelete    | 关闭tab时    | (id: string \| number) => any |            |                       | 否    |
| onAdd       | 点击增加tab时  | func     |            |                       | 否    |
| candel      | 是否可删除     | bool     | `false`    |                       | 否    |
| canadd      | 是否可增加tab  | bool     | `false`    |                       | 否    |
| tabs | 不使用Panel时的标签列表 | Array | `null` | | 否 |
| className   | 自定义额外类名   | string   | `''`       |                       | 否    |
| prefix      | 自定义前缀     | string   | `'zent'`   |                       | 否    |

tabs参数类型：
```ts
Array<{
	key: string | number, // 同TabPanel id
	title: string | number, // 同TabPanel tab
	disabled?: boolean // 同TabPanel disabled
}>

```

#### TabPanel

| 参数  | 说明                    | 类型     | 是否必须 |
| --- | --------------------- | ------ | ---- |
| tab | 该TabPanel所对应的tab标签的名字 | string | 是    |
| id  | 该TabPanel的id          | string \| number | 是    |
| disabled | 该TabPanel是否被禁用 | bool | 否
