## 开发 zent

#### 初始化项目:

```bash
yarn
yarn run bootstrap

cd site && yarn
```

#### 组件互相引用

比如说 `Dialog` 里面引用了 `Button` 组件，代码里支持 `import Button from 'button';` 这样去引用，不需要写相对路径。

#### 组件导出

为了统一管理，每个组件只能 `export default` 一个东西，如果需要导出多个变量，请把其余变量挂载在 `export default` 的变量上。

#### 样式

组件样式使用 `precss`，语法请参考 [precss 文档](https://github.com/jonathantneal/precss).

#### 添加新组件

添加新组件后需要跑一下 `scripts/update-jest-module-mapper.js` 这个脚本来更新 `Jest` 的配置文件。

#### 本地测试

我们的原则是：文档即代码。本地测试请在本地运行文档网站，确保每次修改代码文档都回有相应的更新。

```bash
cd site && yarn dev
```

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
