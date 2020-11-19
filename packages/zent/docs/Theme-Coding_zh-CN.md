## 编码规范

为了做到代码可切换主题色，需要在开发时遵循一定的规范。zent 提供了一些有用的 SCSS mixin 和 function 来简化代码。

### Mixins

zent 在 `assets/theme/default` 内提供了三个非常有用的 mixin。

#### theme-color

`theme-color` 是最常用的一个 mixin，通过它可以自动生成向后兼容并且可动态切换主题色的代码。

它的定义是这样子的：`theme-color($property, $category, $index, $opacity: 1)`，最后一个参数 `$opacity` 是可选参数。

```scss
.container {
	@include theme-color(color, primary, 4);
	@include theme-color(background-color, stroke, 6);

	// 设置不透明度
	@include theme-color(color, primary, 4, 0.7);
}
```

#### theme-border

`border` 样式是代码中经常出现的，但是由于 `border` 是一个有多个参数的简写形式，所以没有办法直接使用 `theme-color` 来定义。

一种方案是通过将 `border` 拆开成 `border-style`, `border-width` 以及 `border-color`，这样子可以使用 `theme-color` 来定义，但是代码相对繁琐。

`theme-border` 提供了一种更方便的姿势来定义主题色边框，它的定义：`theme-border($width, $style, $category, $index, $opacity: 1)`，最后一个参数 `$opacity` 同样是可选参数。

```scss
.container {
	@include theme-border(1px, solid, stroke, 6);

	// 设置不透明度
	@include theme-border(1px, solid, stroke, 6, 0.8);
}
```

除了 `theme-border` 之外，zent 还提供了 4 个变体，分别对应 `border-left`, `border-right`, `border-top` 以及 `border-bottom`，它们的参数和 `theme-border` 完全一样。

- `theme-border-left`
- `theme-border-right`
- `theme-border-top`
- `theme-border-bottom`

#### theme-shadow

`theme-shadow` 包含三个预定义的阴影类型，分别是 `layer`, `focus` 以及 `modal`。它的定义 `theme-shadow($name)`。

- `layer` 适用于弹层的阴影，比如 `Select` 以及 `Pop` 组件的弹层阴影
- `focus` 适用于输入框有焦点时的高亮描边
- `modal` 适用于对话框类型的阴影，例如 `Dialog` 就是使用这类阴影

### Functions

这些函数主要用于 `theme-color`, `theme-border` 以及 `theme-shadow` 无法覆盖的场景，这类场景需要手动将一个 CSS 属性写两遍，最常见的是自定义 `box-shadow` 的场景。

#### theme-rgb

`theme-rgb` 返回一个可以通过 CSS Variable 动态覆盖的 RGB 形式的主题色，它的定义：`theme-rgb($category, $index)`。

例如 `theme-rgb(stroke, 6)` 会返回一个类似 `rgb(var(--theme-stroke-6, 235, 237, 240))` 的结果。

```scss
.container {
	box-shadow: 0 1px 0 0 $theme-stroke-6;
	box-shadow: 0 1px 0 0 theme-rgb(stroke, 6);
}
```

#### theme-rgba

`theme-rgba` 同 `theme-rgb` 类似，区别在于它接受一个 $opacity 参数，同时返回 RGBA 形式的主题色，它的定义 `theme-rgba($category, $index, $opacity)`。

例如 `theme-rgb(stroke, 6, 0.8)` 会返回一个类似 `rgba(var(--theme-stroke-6, 235, 237, 240), 0.8)` 的结果。

```scss
.container {
	box-shadow: 0 1px 0 0 rgba($theme-stroke-6, 0.8);
	box-shadow: 0 1px 0 0 theme-rgba(stroke, 6, 0.8);
}
```
