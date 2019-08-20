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

| 参数                 | 说明                      | 类型                          | 默认值     | 备选值                             | 是否必须 |
| -------------------- | ------------------------- | ----------------------------- | ---------- | ---------------------------------- | -------- |
| activeId             | 激活的 tab-id             | string \| number              |            |                                    | 是       |
| type                 | tabs 组件类型             | string                        | `'normal'` | `'card'`, `'button'`, `'vertical'` | 否       |
| align                | tabs 的布局类型           | string                        | `'left'`   | `'right'`, `'center'`              | 否       |
| onChange             | 选中的 tab 改变时         | (id: string \| number) => any |            |                                    | 否       |
| onDelete             | 关闭 tab 时               | (id: string \| number) => any |            |                                    | 否       |
| candel               | 是否可删除                | bool                          | `false`    |                                    | 否       |
| tabs                 | 不使用 Panel 时的标签列表 | Array<ITab>                   | `null`     |                                    | 否       |
| className            | 自定义额外类名            | string                        | `''`       |                                    | 否       |
| navExtraContent      | 导航添加额外内容          | node                          | null       |                                    | 否       |
| navExtraContentAlign | 额外内容的左右位置        | string                        | `'right'`  | `'left'`                           | 否       |
| stretch              | tab 是否撑满全部空间      | boolean                       | false      |                                    | 否       |

tabs 参数类型：

```ts
interface ITab {
	key: string | number; // 同TabPanel id
	title: string | number; // 同TabPanel tab
	disabled?: boolean; // 同TabPanel disabled
}
```

#### TabPanel

| 参数     | 说明                                | 类型             | 是否必须 |
| -------- | ----------------------------------- | ---------------- | -------- |
| tab      | 该 TabPanel 所对应的 tab 标签的名字 | string           | 是       |
| id       | 该 TabPanel 的 id                   | string \| number | 是       |
| disabled | 该 TabPanel 是否被禁用              | bool             | 否       |
