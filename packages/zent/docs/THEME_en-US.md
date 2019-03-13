## Themes

Zent supports themes, only colors are customizable for now.

![zent-theme](https://img.yzcdn.cn/zanui/react/zent-theme.png)

Styles in Zent are written in [scss](https://sass-lang.com), we have a builtin theme extension file to support custom themes. You can build custom styles using this extension file.

This method is non-intrusive, but you have to manually build your custom theme every time you upgrade Zent.

### Customize

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
