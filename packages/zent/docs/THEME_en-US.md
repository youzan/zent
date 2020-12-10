## Themes

Zent supports themes, only colors are customizable for now.

![zent-theme](https://img.yzcdn.cn/zanui/react/zent-theme.png)

### Customize through CSS variables

Zent uses [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), so it is possible to customize themes via custom CSS variables.

Each theme color should be provided in both HEX and RGB format, for example:

```css
:root {
	/* Use these when opacity is not needed */
  --theme-primary-1: #252b6e;
  --theme-primary-2: #3c46b1;
  --theme-primary-3: #434fc9;
  --theme-primary-4: #515ff0;
  --theme-primary-5: #6c78f2;
  --theme-primary-6: #7e88f3;
  --theme-primary-7: #b0b6f8;
	--theme-primary-8: #f2f3fe;
	
	/* Values are the same as above, but used when opacity is required */
  --theme-rgb-primary-1: 37, 43, 110;
  --theme-rgb-primary-2: 60, 70, 177;
  --theme-rgb-primary-3: 67, 79, 201;
  --theme-rgb-primary-4: 81, 95, 240;
  --theme-rgb-primary-5: 108, 120, 242;
  --theme-rgb-primary-6: 126, 136, 243;
  --theme-rgb-primary-7: 176, 182, 248;
  --theme-rgb-primary-8: 242, 243, 254;
}
```

These variables can be generated with this code：

```scss
// TODO: define your theme overrides here, and that's all!
$theme-overrides: (
	--theme-primary-1: #252b6e,
	--theme-primary-2: #3c46b1,
	--theme-primary-3: #434fc9,
	--theme-primary-4: #515ff0,
	--theme-primary-5: #6c78f2,
	--theme-primary-6: #7e88f3,
	--theme-primary-7: #b0b6f8,
	--theme-primary-8: #f2f3fe,
);

@mixin theme-css-vars($vars) {
	@each $name, $color in $vars {
		#{$name}: $color;
	}
}

@mixin theme-rgb-css-vars($vars) {
	@each $name, $color in $vars {
		#{str-insert($name, "-rgb", 8)}: to-rgb($color);
	}
}

@function to-rgb($color) {
	@return red($color), green($color), blue($color);
}

:root {
	@include theme-css-vars($theme-overrides);

	// Same but used in rgba contexts
	@include theme-rgb-css-vars($theme-overrides);
}
```

### Customize through rebuilding SCSS

Styles in Zent are written in [scss](https://sass-lang.com), we have a builtin theme extension file to support custom themes. You can build custom styles using this extension file.

This method is non-intrusive, but you have to manually build your custom theme every time you upgrade Zent.

#### Build Steps

1. Clone Zent from [github](https://github.com/youzan/zent) and install dependencies
2. Create a file named [`_override.scss`](https://github.com/youzan/zent/blob/master/packages/zent/assets/theme/_override_.scss) in `packages/zent/assets`, define your custom colors in this file. All customizable colors are defined in [`_default.scss`](https://github.com/youzan/zent/blob/master/packages/zent/assets/theme/_default.scss) within the same directory.
3. Run `yarn theme` within `packages/zent`
4. Your custom theme styles are in `packages/zent/css`.

<style>
  img[alt="zent-theme"] {
    width: 514px;
    height: 319px;
  }
</style>
