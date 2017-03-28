## 开发

zent-icon的大部分文件都是工具生成的，主要依赖以下命令：

-   `sketchtool` [(安装)](https://www.sketchapp.com/tool/)
-   `iconfount` [(安装)](https://github.com/youzan/iconfount)
-   `jq` (安装: `brew install jq`)

工具生成的文件包括：

-   `assets/_zenticon-codes.scss`
-   `assets/_fontface.scss`
-   `assets/LICENSE.txt`
-   `examples/01-grid.js`

**禁止直接修改这些文件，发布时会被覆盖！**

如果生成的icon font字符和sketch文件有差异

-  给对应字符加上 `correct_contour_direction: true`, 这个方法只能解决部分图标填充不正确的问题.
-  找sketch文件的作者修改图标, 可以用不同的画图方式解决.

## 生成过程

所有脚本都在 `scripts` 目录下，都是 `shell` 脚本，主要步骤如下:

-  从sketch文件中提取所有图标的svg
-  用 `iconfount` 从svg文件生成字体文件
-  上传字体文件到CDN，并生成对应url的样式文件
-  根据 `iconfount` 的输出生成示例文件 `01-grid.js`
