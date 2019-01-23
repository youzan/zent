---
title: Layout
subtitle: 布局
path: component/layout
group: 基础
---

## Layout 布局

- 基于 `flex` 的 24 栅格布局组件
- `Row` 和 `Col` 必须包裹在 `Grid` 内部
- 可配置的行、列间隔
- 支持响应式

### 依赖

⚠️ 注意：响应式能力依赖 [`matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) 以及 `matchMedia.addListener`。如果需要支持较老的浏览器，使用是请确保引入相应的 polyfill。

- [Paul Irish/Scott Jehl's matchMedia polyfill](https://github.com/paulirish/matchMedia.js)
- [David Knight's media-match polyfill](https://github.com/weblinc/media-match)

### API

#### Grid

| 属性      | 说明       | 类型     | 是否必填 | 默认值 |
| --------- | ---------- | -------- | -------- | ------ |
| className | 自定义类名 | `string` | 否       |        |

#### Row

| 属性      | 说明         | 类型     | 是否必填 | 默认值  | 备选值                                        |
| --------- | ------------ | -------- | -------- | ------- | --------------------------------------------- |
| justify   | 水平排列方式 | `string` | 否       | `start` | `end` `center` `space-around` `space-between` |
| align     | 垂直对齐方式 | `string` | 否       | `top`   | `middle` `bottom`                             |
| className | 额外的样式名 | `string` | 否       |         |                                               |

#### Col

| 属性      | 说明           | 类型                       | 是否必填 | 默认值 |
| --------- | -------------- | -------------------------- | -------- | ------ |
| span      | 所占的栅格数   | `number | ResponsiveValue` | 是       |        |
| offset    | 左偏移的栅格数 | `number | ResponsiveValue` | 否       | 0      |
| order     | 栅格顺序       | `number | ResponsiveValue` | 否       |        |
| className | 额外的样式名   | `string`                   | 否       |        |

#### ConfigProvider

默认的配置是 `{ rowGutter: 0, colGutter: 0 }`。

| 属性  | 说明     | 类型           | 是否必填 |
| ----- | -------- | -------------- | -------- |
| value | 栅格配置 | `LayoutConfig` | 是       |

#### ResponsiveValue

```typescript
interface ResponsiveValue {
	// 未匹配到相应式值时候的默认值
	fallback: number;

	// 以下响应式断点同 bootstrap 4
	xs?: number; // width <576px
	sm?: number; // width ≥576px
	md?: number; // width ≥768px
	lg?: number; // width ≥992px
	xl?: number; // width ≥1200px

	// 以下断点 bootstrap 中不存在
	xxl?: number; // width ≥1600px
	fhd?: number; // width ≥1920px
}

interface LayoutConfig {
	colGutter?: number | ResponsiveValue;
	rowGutter?: number | ResponsiveValue;
}
```
