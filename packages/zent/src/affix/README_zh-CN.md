---
title: Affix
subtitle: 固钉
path: component/affix
group: 导航
---

## Affix 固钉

将元素固定在特定区域，一般用于导航栏固钉。

### API

| 参数                 | 说明                         | 类型               | 默认值 | 备选值   |
| -------------------- | ---------------------------- | ------------------ | ------ | -------- | --- |
| offsetTop            | 距离窗口顶部指定偏移量后触发 | `number`           |        |          |
| offsetBottom         | 距离窗口底部指定偏移量后触发 | `number`           |        |          |
| getAffixContainer    | 自定义相对定位的节点         | `() => HTMLElement | null`  | `window` |     |
| children             | 子节点                       | `React.ReactNode`  |        |          |
| onPin                | 触发固定后执行的回调函数     | `() => void`       |        |          |
| onUnpin              | 固定消失后执行的回调函数     | `() => void`       |        |          |
| zIndex               | 固定时的 `z-index`           | `number`           | 10     |          |
| className            | 自定义额外类名               | `string`           |        |          |
| placeholderClassName | 占位容器的类名               | `string`           |        |          |

**注意**

- `offsetTop` 和 `offsetBottom` 至少传一个，也可以同时设置，同时设置的时候注意窗口高度很小的时候可能会出现两个参数行为冲突的情况，请谨慎使用。
- 在页面有两层滚动时，需要同时使用 `ref` 和 `getAffixContainer` 实现固钉相对定位自定义节点定位，需要监听外层滚动事件。
