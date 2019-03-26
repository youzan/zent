---
title: Tag
path: component/tag
group: Data Display
---

## Tag

Tag is suitable for marking and sorting。

### Guides

-  Tag is usually used as special marks or sorting marks.
-  You can add multiple tags for one item.
-  The text in tag should not more than four words.

### API

| Property     |  Description  | Type     | Default  | Alternative |
| ------- | -------------  | ------  | -------------|----------------- |
| color   | The color of tag | string  | `'red'`      | `'red'` \| `'green'` \| `'yellow'` \| `'blue'` \| `'darkgreen'` |
| outline | The style with colorful border and transparent backgound. | bool    | `'false'`    |`true` \| `false`    |
| rounded | Whether the tag is rounded or not | bool | `true` | `true` \| `false` |
| closable| Whether the tag can be closed | bool    | `false`      | `true` \| `false`   |
| onClose | The callback function that is trigged when the tag is closed | func | `noop`  |  |
| visible | Controlled visibility | bool | | `true` \| `false` |
| onVisibleChange | Visibility change callback | func | | |
| borderColor | The color of tag's border | string | | |
| bgColor | The color of tag's background | string | | |
| fontColor | The color of tag's content | string | | |
| className| The custom classname | string   | `''`  |  |
| prefix  | The custom prefix  | string   | `'zent'` |  |

> All props are optional, visibility can be controlled by using `visible` and `onVisibleChange` together.
