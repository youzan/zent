## 如何参与 Zent 的开发

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

我们提供了一个脚本来自动化大部分初始化工作，在 `packages/zent` 目录下执行 `yarn new-component YOUR-COMPONENT-NAME`，脚本会自动创建组件需要的目录和样板代码。

代码写完之后还需要在 `packages/zent/typings` 目录下添加新组建对应的 Typescript 类型定义。

#### 文件命名

* 组件文件名字驼峰，例如 `ActionButton` 组件的文件名就是 `ActionsButton.js`
* 导出函数的文件名驼峰（首字母小写），一般和函数名字保持一致，例如 `withPop`
* 文件夹名字用 - 隔开，例如 `number-input`
* demos文件夹中的Md文件名字用 - 隔开，例如 `with-close-btn`

#### 本地测试

`__tests__` 里面只是单元测试，本地测试请在本地运行文档网站，确保每次修改代码文档都回有相应的更新。

我们的原则是：文档即代码。

```bash
cd site && yarn dev
```

## 组件文档如何编写

每个组件根目录下都有两个 README 文件，`README_zh-CN.md` (注意名称大写) 是中文文档，`README_en-US.md` 是英文文档。组件文档采用 Markdown 格式，具体书写规范请参考 [组件文档书写规范](markdown)。

## 一些实用技巧

#### 组件互相引用

比如说 `Dialog` 里面引用了 `Portal` 组件，代码里支持 `import Portal from 'portal';` 这样去引用，不需要写相对路径。

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
