## Themes

Zent supports themes, only colors are customizable for now.

![zent-theme](https://img.yzcdn.cn/zanui/react/zent-theme.png)

### Customize through CSS variables

Zent uses [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties), so it is possible to customize themes via custom CSS variables.

Example (with default theme):
```css
:root {
  --theme-stroke-1: #323233;
  --theme-stroke-2: #646566;
  --theme-stroke-3: #969799;
  --theme-stroke-4: #c8c9cc;
  --theme-stroke-5: #dcdee0;
  --theme-stroke-6: #ebedf0;
  --theme-stroke-7: #f2f3f5;
  --theme-stroke-8: #f7f8fa;
  --theme-stroke-9: #fff;
  --theme-stroke-10: #eaeaea;
  --theme-stroke-11: #f4f5f5;
  --theme-primary-1: #0a2a61;
  --theme-primary-2: #10439b;
  --theme-primary-3: #114db4;
  --theme-primary-4: #155bd4;
  --theme-primary-5: #3773da;
  --theme-primary-6: #5487df;
  --theme-primary-7: #94b4eb;
  --theme-primary-8: #edf4ff;
  --theme-success-1: #268d37;
  --theme-success-2: #2da641;
  --theme-success-3: #4cb35d;
  --theme-success-4: #66be74;
  --theme-success-5: #f0faf2;
  --theme-error-1: #b40000;
  --theme-error-2: #d40000;
  --theme-error-3: #da2626;
  --theme-error-4: #df4545;
  --theme-error-5: #ffebeb;
  --theme-warn-1: #ed6a0c;
  --theme-warn-2: #f1924e;
  --theme-warn-3: #fff5ed;
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
