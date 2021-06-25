---
title: Customize
path: guides/theme
group: Theme
scatter: true
---

## Themes

Zent supports themes, only colors are customizable for now.

![zent-theme](https://img.yzcdn.cn/zanui/react/zent-theme.png)

### Customize through CSS variables

Zent uses [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), so it is possible to customize themes via custom CSS variables.

Each theme color should be provided in both HEX and RGB format, These variables can be generated as follows:

<!-- demo-slot-2 -->

### Customize through rebuilding SCSS

Styles in Zent are written in [scss](https://sass-lang.com), we have a builtin theme extension file to support custom themes. You can build custom styles using this extension file.

This method is non-intrusive, but you have to manually build your custom theme every time you upgrade Zent.

#### Build Steps

1. Clone Zent from [github](https://github.com/youzan/zent) and install dependencies
2. Create a file named [`_override.scss`](https://github.com/youzan/zent/blob/master/packages/zent/assets/theme/_override_.scss) in `packages/zent/assets`, define your custom colors in this file. All customizable colors are defined in [`_default.scss`](https://github.com/youzan/zent/blob/master/packages/zent/assets/theme/_raw-vars.scss) within the same directory.
3. Run `yarn theme` within `packages/zent`
4. Your custom theme styles are in `packages/zent/css`.

#### Modify theme color dynamically

Could use `ThemeSDK API`, pass a basic color to update the theme colors. Choose a color with a higher saturation and brightness, please. like: S > 85, B > 80, like the following:

<!-- demo-slot-1 -->
<!-- demo-slot-3 -->

### API

| 参数                  | 说明                                                                               | 类型                                                  | 默认值             |
| --------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------ |
| getThemeColor         | get all the css variables and values of the current theme                         | () => ITheme                                         |                    |
| generatePalette       | get all the theme colors, base on the base color                                  | (baseColor: string) => string[]                      |                    |
| generateTheme         | get all the css variables and values of the theme by the semantic scene and value | (config: IThemeConfig) => ITheme                       |                    |
| applyTheme            | apply the theme                                                                   | (theme: ITheme)  => void                             |                    |

<style>
img[alt='zent-theme'] {
  width: 514px;
  height: 319px;
}
</style>