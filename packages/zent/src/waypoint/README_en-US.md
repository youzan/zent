---
title: Waypoint
path: component/waypoint
group: Basics
---

## Waypoint

Invoke a callback when scrolling to some DOM node, can be used in any scrolling container.

**Can be used to implement:**

- Image lazy load
- Infinite scroll
- Affix

### API

| Property           | Description                                                                               | Type                                    | Required | Default | Alternative |
| ------------------ | ----------------------------------------------------------------------------------------- | --------------------------------------- | -------- | ------- | ----------- |
| onEnter            | Callback when element enters viewport                                                     | `(data: IWaypointCallbackData) => void` | No       |         |             |
| onLeave            | Callback when element leaves viewport                                                     | `(data: IWaypointCallbackData) => void` | No       |         |             |
| onPositionChange   | Callback when element position changes                                                    | `(data: IWaypointCallbackData) => void` | No       |         |             |
| topOffset          | Offset to scrolling container top                                                         | `number` \| `string`                    | No       | `0px`   |             |
| bottomOffset       | Offset to scrolling container bottom                                                      | `number` \| `string`                    | No       | `0px`   |             |
| horizontal         | Use horizontal scroll                                                                     | `boolean`                               | No       | `false` | `true`      |
| scrollableAncestor | Specify a scrolling container DOM node                                                    | `Element`                               | No       |         |             |
| fireOnRapidScroll  | Trigger `onEnter` and `onLeave` on rapid scroll                                           | `boolean`                               | No       | `true`  |             |
| children           | Element to track, you can think of the waypoint as a line across the container if omitted | `ReactNode`                             | No       |         |             |

**Notes**

- [Definition of `IWaypointCallbackData`](../../apidoc/interfaces/iwaypointcallbackdata.html).
- A rapid scroll is when you scroll the page fast enough, the tracking element leaves the viewport immediately after it enters the viewport.
- `topOffset` and `bottomOffset` can be positive or negative just like `margin`. Positive value pushes the boundaries inward the page, and negative value pushes boundaries outward the page.
- You can use percentage value in `topOffset` and `bottomOffset`, relative to its scrolling container.
- If `horizontal` is on, `topOffset` becomes `leftOffset`, and `bottomOffset` becomes `rightOffset`. Names are kept the same for simplicity's sake.
- `children` can only be **one** element, it must be one of native DOM element, element returned from `React.forwardRef`, or an element with an `innerRef` prop. The `ref` must be properly passed to the tracking DOM node.
