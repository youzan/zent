## Zent 2.1.0 升级指南

这个版本主要升级了 React 版本到 15.5.x。

### React 升级到 15.5.x

从 2.1.0 开始 Zent 的开发都是基于 React 15.5.x，和老版本的 React 一起使用时可能会在开发时出现 warning。

详细的 React 升级方案请看[官方的说明文档](https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html)。

推荐使用 Facebook 提供的 [codemod](https://github.com/reactjs/react-codemod) 来自动化迁移工作。

### Button 默认的 `type` 变更

Button 提供了一个 `htmlType` 属性，这个属性在 2.1.0 之前是没有默认值的，行为和原生的 button 一致，会在 form 里触发 submit。

在 2.1.0 版本开始，`htmlType` 设置了默认值为 `"button"`，所以原来在表单里依赖 submit 行为的地方需要加上 `htmlType="submit"`。
