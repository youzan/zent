---
title: SmoothScroll
path: component/smooth-scroll
group: Feedback
---

## Smooth scroll

Smooth scroll DOM element to target position instead of an instant jump.

### API

```ts
function smoothScroll(
	element: HTMLElement | Window,
	x: number,
	y: number,
	duration: number = 250
): void;
```

Smooth scroll `element` to `(x, y)` with animation duration equals to `duration`.
