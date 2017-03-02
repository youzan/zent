# zent-tabs

[![npm version](https://img.shields.io/npm/v/zent-tabs.svg?style=flat)](https://www.npmjs.com/package/zent-tabs) [![downloads](https://img.shields.io/npm/dt/zent-tabs.svg)](https://www.npmjs.com/package/zent-tabs)

选项卡组件

## 使用指南

### 示例

```js
import Tabs from 'zent-tabs';
const { TabPanel } = Tabs;
<Tabs
  align='left'
  size='normal'
  type='normal'
  candel=false
  canadd=true
  activeId='2'
>
  <TabPanel id='2' tab='选项一'>content</TabPanel>
  <TabPanel id='3' tab='选项二'>content</TabPanel>
</Tabs>
```

## API

### Tabs

| 参数          | 说明        | 类型       | 默认值        | 备选值                   | 是否必须 |
| ----------- | --------- | -------- | ---------- | --------------------- | ---- |
| className   | 自定义额外类名   | string   | `''`       |                       | 否    |
| prefix      | 自定义前缀     | string   | `'zent'`   |                       | 否    |
| type        | tabs组件类型  | string   | `'normal'` | `'card'`, `'slider'`  | 否    |
| activeId    | 激活的tab-id | string   |            |                       | 是    |
| size        | tabs的尺寸类型 | string   | `'normal'` | `'huge'`              | 否    |
| align       | tabs的布局类型 | string   | `'left'`   | `'right'`, `'center'` | 否    |
| onTabChange | 选中的tab改变时 | func(id) |            |                       | 否    |
| onTabDel    | 关闭tab时    | func(id) |            |                       | 否    |
| onTabAdd    | 点击增加tab时  | func     |            |                       | 否    |
| candel      | 是否可删除     | bool     | `false`    |                       | 否    |
| canadd      | 是否可增加tab  | bool     | `false`    |                       | 否    |

### TabPanel

| 参数  | 说明                    | 类型     | 是否必须 |
| --- | --------------------- | ------ | ---- |
| tab | 该TabPanel所对应的tab标签的名字 | string | 是    |
| id  | 该TabPanel的id          | string | 是    |
