---
title: AnimateHeight
path: component/animate-height
group: Feedback
---

## AnimateHeight

Animate an element to any specific height.

Animating to `auto` height is not possible with pure CSS, this is when this component comes into play.

### API

| Property  | Description                          | Type                 | Required | Default  | Alternative                                         |
| --------- | ------------------------------------ | -------------------- | -------- | -------- | --------------------------------------------------- |
| height    | Target height                        | `string` \| `number` | Yes      |          |                                                     |
| duration  | Animation duration                   | `number`             | No       | 200      |                                                     |
| easing    | Timing function for animation        | `string`             | No       | `ease`   | Same as CSS's `transition-timing-function` property |
| appear    | Apply animation in initial mount     | `boolean`            | No       | `false`  | `true`                                              |
| className | Custom class name                    | `string`             | No       |          |                                                     |
| style     | Custom style                         | `CSSProperties`      | No       |          |                                                     |
| overflow  | A shotcut of CSS `overflow` property | `string`             | No       | `hidden` | `auto` \| `scroll`                                  |
