## 开发 zent

#### 初始化项目:

```bash
yarn
yarn run bootstrap

cd site && yarn
```

#### 代码目录结构

- 仓库包含两个 npm 包，代码都在 `packages` 目录下：`babel-plugin-zent` 以及 `zent`。
- `site` 目录下是文档网站的代码，本地开发时可以在 `site` 目录下运行 `yarn dev` 开启文档网站。

组件代码都在 `packages/zent` 目录下：

```
packages/zent
├── __tests__       # 测试
├── assets          # 样式代码
├── docs            # 一些文档
├── scripts         # 一些脚本，用于测试、发布等
├── src             # 组件源码
├── typings         # typescript 的定义文件
```

#### 添加新组件

主要步骤：

- 添加 Javascript 代码
- 添加样式代码
- 添加测试代码
- 添加文档
- 添加 Typescript 的定义

以添加 `Button` 组件为例，首先在 `packages/zent/src` 目录下新建目录 `button`，这个目录下有个 `index.js` 文件导出组件，需要的话可以建其他文件来组织代码。

除了代码，这个目录下还应该有一个 `README.md` 文件，这个文件是组件的详细文档，包括使用示例以及 `API` 等。

新添加的组件代码要在 `packages/zent/src/index.js` 中导出。

组件对应的样式需要放到 `packages/zent/assets` 目录下，像 `Button` 组件的话需要新建一个文件 `button.pcss`。如若个组件样式比较复杂，为了方便组织代码可以在 `packages/zent/assets` 下面新建一个同名目录 `button`，里面可以放一些 partial 样式。

新添加的 `button.pcss` 文件需要在 `packages/zent/assets/index.pcss` 中 import。

添加新组件后需要跑一下 `packages/zent/scripts/update-jest-module-mapper.js` 这个脚本来更新 `Jest` 的配置文件，这个文件在测试的时候需要。

做完这些之后要在 `packages/zent/typings` 目录下添加新组建对应的 Typescript 类型定义。

最后，需要将新组建的文档添加到文档网站上，只需要在 `site/src/nav.config.js` 文件中合适的位置将组件的 `README.md` 文件 `require` 进去。

#### 本地测试

我们的原则是：文档即代码。本地测试请在本地运行文档网站，确保每次修改代码文档都回有相应的更新。

```bash
cd site && yarn dev
```

## 组件文档如何编写

#### 文件格式

组件文档采用 markdown 格式，和普通 markdown 最大的区别是示例代码是直接写在 markdown 文件里面的，所以请确保你写的示例代码是可以运行的。每一个组件的 markdown 文件名称：`README.md` (注意名称大写)。

#### 文档内的标题规范

文档标题从 `h2`（也就是 `##` 标题 ）开始，每往下一级多加一个 `#` 号；一般到 `h3` (两级标题)或者`h4` (三级标题)就足够了，不要出现过多的标题层级。

#### 组件描述

大标题下面是对组件的一个一句话简要描述。

#### 使用指南（可选）

如果组件有使用指南的话，放在组件描述下面，另起一个二级标题。

#### 代码演示

另起一个二级标题，正文可以是 markdown 和示例的混合。示例的结构如下:

    :::demo 基础用法（必须以:::demo开头，后面的描述可选，如果有的话控制在一两句话，不要过长）
    ```js                             // :::demo后面必须接代码段，否则不会识别为示例
    import { Alert } from 'zent';
    ReactDOM.render(                  // 最终渲染的定西必须写在ReactDOM.render里面
      <Alert>公告内容。</Alert>        // 你要render的东西
      , mountNode                     // 这个变量直接写就可以了，不用定义
    );
    ```
    :::                               // 示例结束的标记，必须接在代码段之后，否则不会识别为示例

代码演示的几个书写原则：
- 从简单用法开始介绍，不要上来就同时使用一大堆的 API，会让人觉得很难上手
- 正交性原则，一个示例只演示一个（或者一类）API 的使用方法，如无特殊需求不要在一个示例中同时演示多个 API 混合使用
- 如果示例的一句话描述无法完整描述整个场景，可以在 `:::demo` 之前写一段详细的说明性文字

#### API 说明

组件的 API 说明，请以表格的形式书写，表格包含以下列：

| 参数         |   说明         | 类型     | 默认值      | 备选值            |
| ------------ | ------------- | -------- | ---------- | ----------------- |
| visible      | 是否可见       | bool     |    `false` | `true` \| `false` |

## 一些实用技巧

#### 组件互相引用

比如说 `Dialog` 里面引用了 `Button` 组件，代码里支持 `import Button from 'button';` 这样去引用，不需要写相对路径。

#### 组件导出

为了统一管理，每个组件只能 `export default` 一个东西，如果需要导出多个变量，请把其余变量挂载在 `export default` 的变量上。

#### 样式

组件样式使用 `precss`，语法请参考 [precss 文档](https://github.com/jonathantneal/precss).

#### 关于 z-index

为了防止 `z-index` 滥用，我们规定了组件库内部的 `z-index` 使用规范。

`z-index` 优先级（从高到低）：

* 特殊组件：Notify 永远在最上面，[10000, +∞)
* 小范围的 ‘用完就关’ 的组件：Pop, Select, Datetimepicker, ColorPicker, Cascader 等 [2000, 3000)
* 全屏幕的组件：Dialog, image-preview 等 [1000, 2000)
* 其他：组件内部用来控制层次的 z-index 的区间 [-10, 10]，尽可能写小，一般1，2，3这种就够了。

## 发布

**注意：不是所有人都有发包权限的**

1. 更新代码到最新: `git pull`
2. 安装 [github-changelog-generator](https://github.com/skywinder/github-changelog-generator)
3. `./scripts/publish.sh` 选择需要的版本即可

## Tips

* 导出的组件不要写成 [Functional Component](https://facebook.github.io/react/docs/refs-and-the-dom.html#refs-and-functional-components)，这样子使用的时候没法加 `ref` (虽然不推荐用 `ref`，但是我们不应该不让使用)。
* 提交的代码确保已经通过 eslint 检查。
* 不要用全局的 `lerna`，因为 `lerna` 的配置文件和版本绑定的，所以请用本地 `node_modules` 目录下的 `lerna`。
* `scripts` 目录下有一些工具脚本。
* `./lerna updated` 可以查看哪些包有改动。
* 如果A依赖B，B改动的话A也会发新包。
