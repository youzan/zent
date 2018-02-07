---
title: Rate
subtitle: 评分
path: component/rate
group: 数据
---

## Rate 评分
评分组件。

### API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| allowClear | 是否允许再次点击后清除 | boolean | true |
| allowHalf | 是否允许半选 | boolean | false |
| character | 自定义字符 | ReactNode |  `<Icon type="star" />` |
| className | 自定义样式类名 | string | - |
| count | star 总数 | number | 5 |
| disabled | 只读，无法进行交互 | boolean | false |
| style | 自定义样式对象 | object | - |
| value | 当前数，受控值 | number | - |
| onChange | 选择时的回调 | Function(value: number) | - |
