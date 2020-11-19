## Coding Guides

Zent provides some useful SCSS mixins and functions to help write themable style.

### Mixins

There're three mixins defined in  `assets/theme/default`.

#### theme-color

`theme-color` is what you need most of time.

`theme-color($property, $category, $index, $opacity: 1)`, the last parameter `$opacity` is optional.

```scss
.container {
	@include theme-color(color, primary, 4);
	@include theme-color(background-color, stroke, 6);

	// with opacity
	@include theme-color(color, primary, 4, 0.7);
}
```

#### theme-border

`theme-border` provides an easy way to define border with theme support.

`theme-border($width, $style, $category, $index, $opacity: 1)`, again the last parameter `$opacity` is optional.

```scss
.container {
	@include theme-border(1px, solid, stroke, 6);

	// with opacity
	@include theme-border(1px, solid, stroke, 6, 0.8);
}
```

There're four variants corresponding to `border-left`, `border-right`, `border-top` and `border-bottom`, they all share the definition with `theme-border`.

- `theme-border-left`
- `theme-border-right`
- `theme-border-top`
- `theme-border-bottom`

#### theme-shadow

There're three predefined shadows: `layer`, `focus` and `modal`. These're the possible arguments to `theme-shadow($name)`.

- `layer` can be used for popup shadow, e.g. `Select` and `Pop`
- `focus` can be used for input focus highlight
- `modal` can be used for dialog shadow

### Functions

There're some cases where `theme-color`, `theme-border` and `theme-shadow` can not cover, you can use these functions to help write themable code.

#### theme-rgb

`theme-rgb($category, $index)` this function returns a CSS variable in RGB format.

For example `theme-rgb(stroke, 6)` returns something like `rgb(var(--theme-stroke-6, 235, 237, 240))`.

```scss
.container {
	box-shadow: 0 1px 0 0 $theme-stroke-6;
	box-shadow: 0 1px 0 0 theme-rgb(stroke, 6);
}
```

#### theme-rgba

`theme-rgba($category, $index, $opacity)` is like `theme-rgb`, except it accepts an `$opacity` parameter and returns a CSS variable in RGBA format.

For example `theme-rgb(stroke, 6, 0.8)` returns something like `rgba(var(--theme-stroke-6, 235, 237, 240), 0.8)`.

```scss
.container {
	box-shadow: 0 1px 0 0 rgba($theme-stroke-6, 0.8);
	box-shadow: 0 1px 0 0 theme-rgba(stroke, 6, 0.8);
}
```
