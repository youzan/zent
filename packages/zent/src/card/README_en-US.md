---
title: Card
path: component/card
group: Data Display
scatter: true
---

## Card

The most basic information container, a rounded rectangle, is visually defined as a single unit of information.

### Guides

- Control whether to display title by `title`
- Provide interactive operation through `action`
- Customize content style through `bodyStyle`

### Demos

<!-- demo-slot-2 -->
<!-- demo-slot-3 -->
<!-- demo-slot-4 -->
<!-- demo-slot-6 -->

### API

| Props       | Description                                                               | Type     | Default    | Alternative |
| ----------- | ------------------------------------------------------------------------- | -------- | ---------- | ----------- |
| title       | Card's title                                                              | `node`   |            |             |
| action      | Card's operation                                                          | `node`   |            |             |
| loading     | Loading state                                                             | `bool`   | `false`    | `true`      |
| type        | Card type                                                                 | string   | `'normal'` | `'nested'`  |
| style       | Custom style of the card container                                        | `object` | `{}`       |             |
| bodyStyle   | Custom style of the content area                                          | `object` | `{}`       |             |
| className   | Custom calssname                                                          | `string` | `''`       |             |
| size        | Card Size                                                                 | `string` | `'large'`  | `'small'`   |
| leftExtra   | Custom content on the left side of the card (only for small size cards)   | `node`   |            |             |
| rightExtra  | Custom content on the right side of the card (only for small size cards)  | `node`   |            |             |
| bottomExtra | Custom content on the bottom side of the card (only for small size cards) | `node`   |            |             |

#### The following functions is obsolete in the new design system and is only used as a reference for the old version

<!-- demo-slot-1 -->
<!-- demo-slot-5 -->
