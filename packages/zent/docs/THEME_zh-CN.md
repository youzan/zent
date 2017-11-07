## 定制主题

Zent 支持主题定制，目前仅支持组件库颜色的定制。

![zent-theme](https://img.yzcdn.cn/zanui/react/zent-theme.png)

### 定制方法

Zent 的样式使用 [postcss](http://postcss.org/) 开发，我们提供了一个 postcss 的插件 [postcss-theme-variables](https://www.npmjs.com/package/postcss-theme-variables) 来支持主题定制。

有两种定制方式：

1. 通过在 Zent 仓库中修改配置，生成一份定制的 css 样式。
2. 直接在业务项目中引用 Zent 的 postcss 源文件并配置自定义主题，在业务项目打包过程中自动生成定制后的样式。

两种方式各有优劣。

第一种方式对业务项目是非侵入式的，样式的定制和业务项目完全独立，这种方案的问题是每次更新 Zent 组件库都要重新生成一份定制主题。

第二种方式对业务项目是侵入式的，需要修改业务项目的打包配置，支持 Zent 的 postcss 源文件，好处是更新 Zent 后不需要单独去重新生成定制主题。

我们的建议：如果你的项目使用 postcss 那么可以考虑方案2，否则推荐方案1。

#### 方案1

1. 克隆 Zent [源码](https://github.com/youzan/zent)并安装依赖
2. 在 `packages/zent` 目录下新建一个文件，例如 `custom-theme.js`，并设置要覆盖的主题颜色，颜色的名字及默认值请参考[色彩](colors)
3. 在 `packages/zent` 目录下面执行 `yarn theme custom-theme.js`
4. 定制的主题会生成在 `packages/zent/css` 目录下

```
/* custom-theme.js */

// 只自定义主色
module.exports = {
  'theme-primary-1': '#72f',
  'theme-primary-2': '#83f',
  'theme-primary-3': '#95f',
  'theme-primary-4': '#dbf',
  'theme-primary-5': '#f7e8fd',
  'theme-primary-6': '#f3eaff',
};
```

#### 方案2

首先，项目的样式文件里需要直接引入 Zent 的样式源文件，源文件在 `zent/assets` 目录下。
一般直接引入 `zent/assets/index.pcss` 即可，如果你希望只引入使用到的组件样式的话可以使用 [babel-plugin-zent](babel-plugin-zent) 的 `useRawStyle` 参数。

请参考如下配置，确保 postcss-theme-variables 这个插件配置正确，注意事项请看 [postcss-theme-variables 文档](https://www.npmjs.com/package/postcss-theme-variables)。

```
module.exports = {
  plugins: [
    require('postcss-easy-import')({
      prefix: '_',
      extensions: ['pcss', 'css']
    }),
    require('postcss-theme-variables')({
      // ... your overrides here
      vars: {
        'theme-primary-1': '#72f',
        'theme-primary-2': '#83f',
        'theme-primary-3': '#95f',
        'theme-primary-4': '#dbf',
        'theme-primary-5': '#f7e8fd',
        'theme-primary-6': '#f3eaff',
      },
      // precss variables starts with $
      prefix: '$'
    })
    require('autoprefixer'),
    require('precss'),

    // 可选压缩
    require('cssnano')({ safe: true })
  ]
};
```

<style>
  img[alt="zent-theme"] {
    width: 514px;
    height: 319px;
  }
</style>
