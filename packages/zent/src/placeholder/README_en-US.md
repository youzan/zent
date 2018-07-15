---
title: Placeholder
path: component/placeholder
group: Feedback
---

## Placeholder

Placeholder is used as loading state in sections.

### Guides

- You can use this component to reduce users' anxiety when the part of page is loading.
- Includes building block components and some presets.
- Build your own placeholder using the building block components when presets does not meet your requirements.

### API

Presets：`TextBlock`, `RichTextBlock`。

Components: `TextRow`, `TextRowDashed`, `Circle` and `Rectangle`. Use these components to build your own placeholder.

### TextBlock

Text block, lines can be dashed.

| Property     |   Description  | Type     |  Required  |   Default  | Alternative       |
| ------------ | ------------- | -------- | ---------- | ---------- | ----------------- |
| rows         | Text rows     | `number` |  Yes         |           |         |
| widths       | Tow width pool, each number is a percentage | `number[]` | No | Omitted | |
| dashed       | Dashed  | `bool`  | No          | `true`    | `false` |
| dashSegments | Dashed line segments, each segment can be a percent or fixed width | `(number | string)[][]` | No | Omitted | |
| lineSpacing  | Line spacing on top     | `string` \| `number`    |  No   |  `'0.7em'`   |  |
| style        | Additional styles    | `object`  |  No       | `{}`       |  |
| animate      | Animate shapes  | `bool`    | No         |  `true`   | `false`  |
| className    | Additional class      | `string`  | No         |  `''`     |   |
| prefix       | Custom class name prefix | `string`  | No         | `'zent'`  |   |

### RichTextBlock

Supports all props in `TextBlock`, with the following extra props.

| Property     |   Description  | Type     |  Required  |   Default  | Alternative       |
| ------------ | ------------- | -------- | ---------- | ---------- | ----------------- |
| shape        | Shape name, circle or rectangle | `string` | No | `'circle'` | `'rect'` |
| size         | Shape size       | `number` \| `string` | No | `80` | |

### TextRow

Solid text row.

| Property     |   Description  | Type     |  Required  |   Default  | Alternative       |
| ------------ | ------------- | -------- | ---------- | ---------- | ----------------- |
| lineSpacing  | Line spacing on top     | `string` \| `number`    |  No   |  `'0.7em'`   |  |
| style        | Additional styles    | `object`  |  No       | `{}`       |  |
| animate      | Animate shapes  | `bool`    | No         |  `true`   | `false`  |
| className    | Additional class      | `string`  | No         |  `''`     |   |
| prefix       | Custom class name prefix | `string`  | No         | `'zent'`  |   |

### TextRowDashed

Dashed text row.

| Property     |   Description  | Type     |  Required  |   Default  | Alternative       |
| ------------ | ------------- | -------- | ---------- | ---------- | ----------------- |
| segments     | Line segments, each segment can be a percent or fixed width       | `(number | string)[]`  |  No        |  Random   |       |
| lineSpacing  | Line spacing on top     | `string` \| `number`    |  No   |  `'0.7em'`   |  |
| style        | Additional styles    | `object`  |  No       | `{}`       |  |
| animate      | Animate shapes  | `bool`    | No         |  `true`   | `false`  |
| className    | Additional class      | `string`  | No         |  `''`     |   |
| prefix       | Custom class name prefix | `string`  | No         | `'zent'`  |   |

### Circle

| Property     |   Description  | Type     |  Required  |   Default  | Alternative       |
| ------------ | ------------- | -------- | ---------- | ---------- | ----------------- |
| diameter     | Circle diameter      | `number` \| `string`  | No        | `80`       |   |
| style        | Additional styles    | `object`  |  No       | `{}`       |  |
| animate      | Animate shapes  | `bool`    | No         |  `true`   | `false`  |
| className    | Additional class      | `string`  | No         |  `''`     |   |
| prefix       | Custom class name prefix | `string`  | No         | `'zent'`  |   |

### Rectangle

| Property     |   Description  | Type     |  Required  |   Default  | Alternative       |
| ------------ | ------------- | -------- | ---------- | ---------- | ----------------- |
| width        | Rectangle width     | `number` \| `string`  | No        | `80`       |   |
| height        | Rectangle height     | `number` \| `string`  | No        | `80`       |   |
| style        | Additional styles    | `object`  |  No       | `{}`       |  |
| animate      | Animate shapes  | `bool`    | No         |  `true`   | `false`  |
| className    | Additional class      | `string`  | No         |  `''`     |   |
| prefix       | Custom class name prefix | `string`  | No         | `'zent'`  |   |
