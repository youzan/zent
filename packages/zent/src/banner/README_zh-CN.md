---
title: Banner
subtitle: 公告
path: component/banner
group: 展示
---

## Banner 公告

向用户传递推广信息

### 建议

- 使用：用于向用户传递产品推广信息。公告会一直存在，直到被用户处理或关闭；
- 位置：公告通常位于页面内容区容器上方，导航栏下方，随内容区宽度自适应；

### 注意

- 仅在必要时使用公告，且应将公告限制在与之内容相关的任务界面中。频繁使用可能会导致用户对公告的注意力下降；
- 禁止多条公告叠加。如单个页面存在多条公告，仅展示优先级最高的公告内容；

### API

| 参数            | 说明              | 类型   | 是否必须 | 默认值 | 备选值                         |
| --------------- | ----------------- | ------ | -------- | ------ | ------------------------------ |
| backgroundImage | 背景图片          | string | 否       |        |                                |
| closeIconColor  | 自定义 close 颜色 | string | 否       |        | `'grey'`\|`'white'`\| `string` |

Banner 组件基于 Alert 实现，更多属性请参考 [Alert 文档](https://youzan.github.io/zent/zh/component/alert)
