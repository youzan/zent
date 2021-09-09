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
| topOffset          | Offset to scrolling container top                                                         | `number` \| `'auto'` \| `string`                    | No       | `0px`   |             |
| bottomOffset       | Offset to scrolling container bottom                                                      | `number` \| `'auto'` \| `string`                    | No       | `0px`   |             |
| horizontal         | Use horizontal scroll                                                                     | `boolean`                               | No       | `false` | `true`      |
| scrollableAncestor | Specify a scrolling container DOM node                                                    | `Element`                               | No       |         |             |
| fireOnRapidScroll  | Trigger `onEnter` and `onLeave` on rapid scroll                                           | `boolean`                               | No       | `true`  |             |
| children           | Element to track, you can think of the waypoint as a line across the container if omitted | `ReactNode`                             | No       |         |             |

#### `topOffset` and `bottomOffset`
- Scroll container's [scroll area](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements#what.27s_the_size_of_the_displayed_content.3f) is `clientWidth`✖️`clientHeight`, but `getBoundingClientRect` returns `width` and `height` with `border` included. You need to set `topOffset` and `bottomOffset` if your scroll container has borders.
- `topOffset` and `bottomOffset` can be positive or negative just like `margin`. Positive value pushes the boundaries inward the page, and negative value pushes boundaries outward the page.
- You can use percentage value in `topOffset` and `bottomOffset`, relative to its scrolling container.
- If `horizontal` is on, `topOffset` becomes `leftOffset`, and `bottomOffset` becomes `rightOffset`. Names are kept the same for simplicity's sake.
- `topOffset` and `bottomOffset` can be set to `'auto'`, `Waypoint` will infer scroll container's border width and fall back to `0` if infer fails. Don't use `transform` on scroll container with `'auto'`.

### FAQs

- [Definition of `IWaypointCallbackData`](../../apidoc/interfaces/IWaypointCallbackData.html).
- A rapid scroll is when you scroll the page fast enough, the tracking element leaves the viewport immediately after it enters the viewport.
- `children` can only be **one** element, it must be one of native DOM element, element returned from `React.forwardRef`, or an element with an `innerRef` prop. The `ref` must be properly passed to the tracking DOM node.
