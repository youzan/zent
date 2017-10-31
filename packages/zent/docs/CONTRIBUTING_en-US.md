## 如何参与 Zent 的开发

English Mode

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

每个组件根目录下的 `README.md` (注意名称大写) 文件即为该组件文档。组件文档采用 markdown 格式，内容包括使用示例以及 `API` 等。具体书写规范请参考 [组件文档书写规范](markdown)。

## 一些实用技巧

#### 组件互相引用

比如说 `Dialog` 里面引用了 `Button` 组件，代码里支持 `import Button from 'button';` 这样去引用，不需要写相对路径。

#### 组件导出

为了统一管理，每个组件只能 `export default` 一个东西，如果需要导出多个变量，请把其余变量挂载在 `export default` 的变量上。

导出的组件不要写成 [Functional Component](https://facebook.github.io/react/docs/refs-and-the-dom.html#refs-and-functional-components)，这样子使用的时候没法加 `ref`，虽然不推荐用 `ref`，但是我们应该支持在组件上加 `ref`。

#### 样式

组件样式使用 `precss`，语法请参考 [precss 文档](https://github.com/jonathantneal/precss).

#### 关于 z-index

为了防止 `z-index` 滥用，我们规定了组件库内部的 `z-index` 使用规范。

`z-index` 优先级（从高到低）：

* 特殊组件：Notify 永远在最上面，[10000, +∞)
* 小范围的 ‘用完就关’ 的组件：Pop, Select, Datetimepicker, ColorPicker, Cascader 等 [2000, 3000)
* 全屏幕的组件：Dialog, image-preview 等 [1000, 2000)
* 其他：组件内部用来控制层次的 z-index 的区间 [-10, 10]，尽可能写小，一般1，2，3这种就够了。
