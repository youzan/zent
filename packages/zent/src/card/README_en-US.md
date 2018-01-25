---
title: Card
path: component/card
group: Data Display
---

## Card

Card is used for information displayed on the card container.

### Guides

- Control whether to display title by `title`
- Provide interactive operation through `action`
- Customize content style through `bodyStyle` 

### API

| Props        | Description      | Type     | Default  | Alternative |
| --------- | ------- | ------ | ---- |-----|
| title      | Card's title    | `node` |  |  |
| action     | Card's operation    | `node` |  |  |
| loading    | Loading state | `bool` | `false` | `true` |
| type       | Card type  | string | `'normal'` | `'nested'` |
| style      | Custom style of the card container | `object` | `{}` |  |
| bodyStyle  | Custom style of the content area | `object` | `{}` |  |
| className  | Custom calssname | `string` | `''` |  |
| prefix     | Custom prefix | `string` | `zent` |  |
