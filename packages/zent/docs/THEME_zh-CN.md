## 定制主题

Zent 支持主题定制，目前仅支持组件库颜色的定制。

![zent-theme](https://img.yzcdn.cn/zanui/react/zent-theme.png)

### 使用 CSS Variables

Zent 使用<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties" target="_blank">CSS Variables</a>定制主题色，对于不支持 CSS Variables 的浏览器，会降级到默认主题色，可以通过重新构建 SCSS 定制主题色。

通过 CSS 变量覆盖主题色示例：
```css
:root {
  --theme-primary-1: 37, 43, 110;
  --theme-primary-2: 60, 70, 177;
  --theme-primary-3: 67, 79, 201;
  --theme-primary-4: 81, 95, 240;
  --theme-primary-5: 108, 120, 242;
  --theme-primary-6: 126, 136, 243;
  --theme-primary-7: 176, 182, 248;
  --theme-primary-8: 242, 243, 254;
}
```

CSS 变量主题色生成可以参考[这个链接](https://gist.github.com/cpylua/247a2ac8da6adfe2354daceb352dcdea)。

### 重新构建 SCSS 定制主题色

Zent 的样式使用 [scss](https://sass-lang.com) 开发，我们提供了一个预定义的扩展文件来支持主题定制，通过在 Zent 仓库中修改配置，生成一份定制的 css 样式。

这种方式对业务项目是非侵入式的，样式的定制和业务项目完全独立；但也有一个问题，就是每次更新 Zent 组件库都要重新生成一份定制主题。

#### 定制方法

1. 克隆 Zent [源码](https://github.com/youzan/zent)并安装依赖
2. 在 `packages/zent/assets/theme` 目录下找到一个名为 [`_override.scss`](https://github.com/youzan/zent/blob/master/packages/zent/assets/theme/_override.scss) 的文件，这个文件是预留用来覆盖默认主题变量的，所有主题变量可以在同目录的 [`_default.scss`](https://github.com/youzan/zent/blob/master/packages/zent/assets/theme/_default.scss) 文件内找到
3. 在 `packages/zent` 目录下面执行 `yarn theme`
4. 定制的主题样式文件会生成在 `packages/zent/css` 目录下

<style>
  img[alt="zent-theme"] {
    width: 514px;
    height: 319px;
  }
</style>
