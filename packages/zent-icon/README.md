# zent-icon

语义化的图标库。

部分图标分为实心和描线两个版本，用`-o`（字母）来区分，比如`shop`(实心)和`shop-o`(描线)。

命名规则：`icon名字-[variant(变体)]-[描线与否(o)]`。

有两种使用方式：

1. React组件形式：`<Icon type="shop" />`
2. CSS形式：`<i class="zenticon zenticon-shop"></i>`

如果只使用CSS形式，只需要项目中引入`zent-icon`的样式即可，不需要引入React。

## API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| type | 图标类型 | string | '' | '' |
| className | 自定义额外类名 | string | '' | '' |

**注意：zent-icon不支持自定义`prefix`，因为icon的class和字体名字有关系的。**

## 开发

zent-icon的大部分文件都是工具生成的，主要依赖以下命令：

* `sketchtool`安装请看[这里](https://www.sketchapp.com/tool/)。
* `iconfount`安装请看[这里](https://github.com/youzan/iconfount)。
* `jq`安装： `brew install jq`

工具生成的文件包括：

* `assets/_zenticon-codes.scss`
* `assets/_fontface.scss`
* `assets/LICENSE.txt`
* `examples/01-grid.js`

**请不要直接修改这些文件，发布时会被覆盖的！**

如果生成的icon font字符和sketch文件有差异，两个办法:

1. 给对应字符加上`correct_contour_direction: true`，这个方法只能解决部分图标填充不正确的问题
2. 如果第一个方法没用，找sketch文件的作者修改图标，一般都可以用不同的画图方式解决。

## 生成过程

所有脚本都在`scripts`目录下，都是`shell`脚本，主要步骤如下：

1. 从sketch文件中提取所有图标的svg
2. 用`iconfount`从svg文件生成字体文件
3. 上传字体文件到CDN，并生成对应url的样式文件
4. 根据`iconfount`的输出生成示例文件`01-grid.js`
