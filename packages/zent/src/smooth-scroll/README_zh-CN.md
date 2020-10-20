---
title: SmoothScroll
subtitle: 平滑滚动
path: component/smooth-scroll
group: 反馈
---

## SmoothScroll 平滑滚动

将某个 DOM 节点平滑滚动到指定位置，避免生硬的长距离页面跳动。

### API

```ts
function smoothScroll(
	element: HTMLElement | Window,
	x: number,
	y: number,
	duration: number = 250
): void;
```

将 `element` 滚动到 `(x, y)` 处，动画时长为 `duration`。
