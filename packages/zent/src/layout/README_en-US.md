---
title: Layout
path: component/layout
group: Basics
---

## Layout

- `flex` based 24 column grid layout component
- `Row` and `Col` must be within a `Grid`
- Configurable gutter for rows and columns
- Responsive

### Dependencies

⚠️ Note: The responsive ability relies on [`matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) and `matchMedia.addListener`. It is user's responsibility to make sure these functions
are available, especially for legacy browsers. Polyfills to consider:

- [Paul Irish/Scott Jehl's matchMedia polyfill](https://github.com/paulirish/matchMedia.js)
- [David Knight's media-match polyfill](https://github.com/weblinc/media-match)

### API

#### Grid

| Property  | Description       | Type     | Required |
| --------- | ----------------- | -------- | -------- |
| className | Custom class name | `string` | No       |

#### Row

| Property  | Description          | Type     | Required | Default | Alternative                                                  |
| --------- | -------------------- | -------- | -------- | ------- | ------------------------------------------------------------ |
| justify   | Horizontal alignment | `string` | No       | `start` | `end` `center` `space-around` `space-between` `space-evenly` |
| align     | Vertical alignment   | `string` | No       | `top`   | `middle` `bottom`                                            |
| className | Custom class name    | `string` | No       |         |                                                              |

#### Col

| Property  | Description                         | Type                       | Required | Default |
| --------- | ----------------------------------- | -------------------------- | -------- | ------- |
| span      | Number of cells to occupy           | `number | ResponsiveValue` | Yes      |         |
| offset    | Number of cells to offset from left | `number | ResponsiveValue` | No       | 0       |
| order     | Cell flex order                     | `number | ResponsiveValue` | No       |         |
| className | Custom class name                   | `string`                   | No       |         |

#### ConfigProvider

Default config is `{ rowGutter: 0, colGutter: 0 }`.

| Property | Description        | Type           | Required |
| -------- | ------------------ | -------------- | -------- |
| value    | Grid configuration | `LayoutConfig` | Yes      |

#### ResponsiveValue

```typescript
interface ResponsiveValue {
	// Fallback value when no breakpoint is matched
	fallback: number;

	// Breakpoints from bootstrap 4
	xs?: number; // width <576px
	sm?: number; // width ≥576px
	md?: number; // width ≥768px
	lg?: number; // width ≥992px
	xl?: number; // width ≥1200px

	// These breakpoints are not in bootstrap
	xxl?: number; // width ≥1600px;
	fhd?: number; // width ≥1920px;
}

interface LayoutConfig {
	colGutter?: number | ResponsiveValue;
	rowGutter?: number | ResponsiveValue;
}
```
