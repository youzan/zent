---
title: PopEllipsisText
path: component/pop-ellipsis-text
group: Feedback
---

## PopEllipsisText

A component that displays elliptical symbols and pop content when a single or multi-line text exceeds the specified length.

### Guides

- If only the width is specified, the component automatically displays the elliptical when the text width exceeds the specified width, and the full text is displayed when the mouse is moved in.
- Specifies the width and line number, the component width is consistent with the specified width, and the elliptical is displayed when the line number exceeds the specified number of lines, and the full text is displayed when the mouse is moved in.
- This component based on `Pop` components development, use other means such as trigger mode, layer thickness, consistent with them

### API

| Property | Description | Type | Required | Default | Alternative |
|------|------|------|--------|--------|-----|
| text | Text content | string\|inline-element | Yes | | |
| count | Word count | number | No | | |
| width | Text width | number | No | | |
| line | Number of rows | number | No | | |
| popClassName | Class name of pop content | string | No | | |
| prefix | Custom class name prefix | string | No | `'zent'` |  |

Other API refer to [Pop component](pop)。