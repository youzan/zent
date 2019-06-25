---
title: Tag
path: component/tag
group: Data Display
---

## Tag

Tag is suitable for marking and sorting。

### Guides

- Tag is usually used as special marks or sorting marks.
- You can add multiple tags for one item.
- The text in tag should not more than four words.

### API

| Property         | Description                                                  | Type                | Default | Alternative                                                |
| ---------------- | ------------------------------------------------------------ | ------------------- | ------- | ---------------------------------------------------------- |
| theme            | The preset color of tag                                      | string              | `'red'` | `'red'` \| `'green'` \| `'yellow'` \| `'blue'` \| `'grey'` |
| outline          | The style with colorful border and transparent backgound.    | bool                | `false` | `true` \| `false`                                          |
| rounded          | Whether the tag is rounded or not                            | bool                | `true`  | `true` \| `false`                                          |
| closable         | Whether the tag can be closed                                | bool                | `false` | `true` \| `false`                                          |
| onClose          | The callback function that is trigged when the tag is closed | func                | `noop`  |
| visible          | Tag is visible                                               | bool                | `true`  | `false`                                                    |  |
| closeButtonStyle | Style of close button                                        | React.CSSProperties |         |                                                            |
| className        | The custom classname                                         | string              |         |                                                            |
| style            | The custom style                                             | React.CSSProperties |         |                                                            |

> All props are optional, a tag can be closed by using `visible` and `onClose` together.
