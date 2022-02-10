---
title: Tag
path: component/tag
group: Basics
scatter: true
---

## Tag

Often used to mark object attributes, classification, usually a rounded rectangle.

### Guides

- Use when you need to mark the attributes and dimensions of the content, or supplement the description
- Use tags for cross-level search
- It is recommended that the label text should not exceed 7 characters, and the size of the display label can be configured as required

### Demos

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-3 -->

#### The following functions is obsolete in the new design system and is only used as a reference for the old version

<!-- demo-slot-4 -->
<!-- demo-slot-5 -->
<!-- demo-slot-6 -->

### API

| Property         | Description                                                  | Type                | Default | Alternative                                                |
| ---------------- | ------------------------------------------------------------ | ------------------- | ------- | ---------------------------------------------------------- | --- |
| theme            | The preset color of tag                                      | string              | `'red'` | `'red'` \| `'green'` \| `'yellow'` \| `'blue'` \| `'grey'` |
| outline          | The style with colorful border and transparent backgound.    | bool                | `false` | `true` \| `false`                                          |
| rounded          | Whether the tag is rounded or not                            | bool                | `true`  | `true` \| `false`                                          |
| closable         | Whether the tag can be closed                                | bool                | `false` | `true` \| `false`                                          |
| onClose          | The callback function that is trigged when the tag is closed | func                | `noop`  |
| visible          | Tag is visible                                               | bool                | `true`  | `false`                                                    |     |
| closeButtonStyle | Style of close button                                        | React.CSSProperties |         |                                                            |
| className        | The custom classname                                         | string              |         |                                                            |
| style            | The custom style                                             | React.CSSProperties |         |                                                            |

> All props are optional, a tag can be closed by using `visible` and `onClose` together.

#### LinkTag

| Property      | Description                | Type                | Default | Alternative |
| ------------- | -------------------------- | ------------------- | ------- | ----------- |
| className     | The custom classname       | string              |         |             |
| style         | The custom style           | React.CSSProperties |         |             |
| linkIconStyle | The custom link icon style | React.CSSProperties |         |             |

#### SelectTag

| Property  | Description                                                     | Type                | Default | Alternative       |
| --------- | --------------------------------------------------------------- | ------------------- | ------- | ----------------- |
| className | The custom classname                                            | string              |         |                   |
| style     | The custom style                                                | React.CSSProperties |         |                   |
| selected  | selected state                                                  | boolean             | `false` | `true` \| `false` |
| onChange  | The callback function that is triggered when the tag is clicked | func                | `noop`  |                   |

> the selected state of SelectTag is fully controlled
