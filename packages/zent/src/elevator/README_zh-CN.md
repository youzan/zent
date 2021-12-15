---
title: Elevator
subtitle: 电梯
path: component/elevator
group: 导航
---

## Elevator

页面内容导航工具，根据页面目录快速定位到页面指定位置，提升信息阅读及操作效率。

### API

#### Elevator

| 参数              |   说明           | 类型     | 是否必须     | 默认值      | 备选值     |
| -----------------| ---------------  | --------------------- | ---------- | ---------- | ---------- |
| getContainer     | 指定滚动及的容器    | `() => HTMLElement`    |  否         | `() => window`      |            |
| defaultActiveLink | 默认高亮的锚点    | `string`                |  否         |       |            |
| offsetTop         | 距离窗口顶部达到指定偏移量后触发   | `number` |  否         |       |            |
| targetOffset      | 锚点滚动偏移量    | `number`     |  否         |       |            |
| onChange          | 监听锚点链接改变   | `(currentLink: string, previousLink: string) => void`     |  否         |       |            |

#### Elevator.Links

| 参数              |   说明           | 类型     | 是否必须     | 默认值      | 备选值     |
| -----------------| ---------------  | --------------------- | ---------- | ---------- | ---------- |
| links            | 电梯目录栏         | `{ link: string, title: ReactNode }[]`    |  是         |       |            |
| className        | 额外类名           | `string`                |  否         |       |            |
| style         | 样式对象   | `React.CSSProperties` |  否         |       |            |
| onClick      | 点击锚点目录回调函数    | `(event: MouseEvent, currentLink: string) => void`     |  否         |       |            |

更多属性参考[Affix](https://youzan.github.io/zent/zh/component/affix)

#### Elevator.Anchor

| 参数              |   说明           | 类型     | 是否必须     | 默认值      | 备选值     |
| -----------------| ---------------  | --------------------- | ---------- | ---------- | ---------- |
| link            | 电梯锚点         | `string`    |  是         |       |            |
