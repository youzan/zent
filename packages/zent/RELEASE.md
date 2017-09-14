## 更新日志

3.5.3 之前版本的详细修改记录请看 [Github 日志](github_changelog#zent-3-5-2-2017-09-07)。

### 3.5.3 (2017-09-13)

- 🐛 修复了同时打开多个 `Dialog` 时遮罩 `z-index` 不正确的问题
- 🐛 修复了 `DateRangeQuickPicker` 最近 7 天的语义，包含今天
- 🐛 修复了 `Tabs` 组件中 `activeId` 为 0 时无法选中的问题
- 🐛 修复了 `Form` 组件 `validateOnChange` 和 `validateOnBlur` 同时设为 `false` 时，表单提交时不显示校验错误的问题
- `Table`:
  - 🐛 修复了 `clearfix` 样式不存在的问题
  - 🐛 修复了 `totalItem` 没有正确读取的问题
  - 📚 修改了 `title` 类型的描述
- 🐛 修复了 `Select` 组件高度不正确的问题
