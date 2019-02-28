## 7.0.0-next.4(2019-02-26)

### Breaking changes

- 不再支持 16.8 以下的 React(Hooks 的最小可用版本)
- 删除 UMD 格式输出
- `Pagination` 重写，API 跟老版不兼容，具体参考 API 文档
- `Loading` 重写，API 跟老版不兼容，具体参考 API 文档
- 用 React 新的 context API 重写 `RadioGroup` 和 `CheckboxGroup`
- 移除 `Design` 和 `SKU` 组件，请使用 `@zent/design` 和 `@zent/sku`。`SKU` 组件不再维护，`Design` 组件进入维护期，不再迭代。
- `Switch` 删除大号样式支持
- `Tree` 组件删除老版支持(即不再支持 `useNew` 参数选择使用的版本)
- 废弃 `postcss` 改用 `node-sass`，样式源文件（assets 目录下的）按需加载需要升级 `babel-plugin-zent` 到 `2.0.0-next.3`

### Other changes

- 样式更新：`Button`, `SplitButton`, `Breadcrumb`, `Steps`, `Menu`, `Radio`, `Checkbox`, `Input`, `Select`, `Slider`, `Switch`, `Badge`, `Collapse`, `Pop`, `Tabs`, `Tag`, `Timeline`, `Dialog`, `Progress`, `Rate`, `Collapse`, `Table`, `Grid`
- 增加 `RadioButton`，按钮样式的单选框
- 删除 `zan-utils` 依赖
- 用 `createPortal` 重写 `Portal` 组件，API 向下兼容
