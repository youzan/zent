## Themes

Zent supports themes, only colors are customizable for now.

![zent-theme](https://img.yzcdn.cn/zanui/react/zent-theme.png)

### Customize

Styles in Zent are written in [postcss](http://postcss.org/), so we have a postcss plugin [postcss-theme-variables](https://www.npmjs.com/package/postcss-theme-variables) to support themes.

There're two different ways to use this plugin:

1. Build a custom css style within Zent.
2. Import Zent's style source files within your project and config postcss to use custom colors.

Each has its own pros and cons. 

The first one is non-intrusive, but you have to manually build your custom theme every time you upgrade Zent.

On the other hand, the second one is intrusive, you have to adjust your project's building process to support Zent's postcss files. The good news is you don't have to rebuild your custom theme when you upgrade Zent.

Rule of thumb: Use option 1 unless you happen to use postcss in your project.

#### Option 1

1. Clone Zent from [github](https://github.com/youzan/zent) and install dependencies
2. Create a file in `packages/zent`, e.g. `custom-theme.js`, define your custom colors in this file. All customizable colors are defined in [Colors](colors).
3. Run `yarn theme custom-theme.js` within `packages/zent`
4. Your custom theme is in `packages/zent/css`.

```
/* custom-theme.js */

// Only customize primary colors
module.exports = {
  'theme-primary-1': '#72f',
  'theme-primary-2': '#83f',
  'theme-primary-3': '#95f',
  'theme-primary-4': '#dbf',
  'theme-primary-5': '#f7e8fd',
  'theme-primary-6': '#f3eaff',
};
```

#### Option 2

Make sure you are using Zent's postcss source files for styling, you can find them in `zent/assets`.

You can import all styles with one line `import zent/assets/index.pcss`.

Or you can use [babel-plugin-zent](babel-plugin-zent)'s `useRawStyle` option to automatically import postcss styles for you.

Please refer to the following postcss configuration, make sure postcss-theme-variables is properly configured. Read the plugin docs [here](https://www.npmjs.com/package/postcss-theme-variables).

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

    // Minify(Optional)
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
