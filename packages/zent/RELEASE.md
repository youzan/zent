## 更新日志

3.5.3 之前版本的详细修改记录请看 [Github 日志](github_changelog#zent-3-5-2-2017-09-07)。

### 3.6.0 (2017-09-21)

- `Design`:
  - ✨ 支持添加区域组件的分组展示
  - ✨ 支持限制每个组件可添加的次数
- ✨ `DatePicker` 添加了 `onBeforeConfirm` 以及 `onBeforeClear` 的钩子
- ️🦀️ 修复了 `Table` 全选复选框在整页都不可选时没有禁用的问题
- 🦀️ 修复了某些情况下 `Popover` 在屏幕滚动后弹出层位置错误的问题
- 🦀️ 修复了 `MonthPicker` 禁用的日期依然可以选择的问题

### 3.5.4 (2017-09-15)

- `Swiper`：
  - 🦀️ 修复了只有一张图片时的显示问题
  - 📚 增加了实例 API 文档，用于外部控制切换
- 🦀️ 修复了 `Table` 跨页多选在全选按钮上无效的问题
- 🦀️ 回滚了 `Select` 组件的宽度样式
- 🦀️ 修复了 `Design` 组件没有正确删除 `beforeunload` 事件回调函数的问题
- 🦀️ 更新了 `Tabs` 组件的 Typescript 定义
- 📚 更新了文档网站，添加了组件开发的详细文档

### 3.5.3 (2017-09-13)

- 🦀️ 修复了同时打开多个 `Dialog` 时遮罩 `z-index` 不正确的问题
- 🦀️ 修复了 `DateRangeQuickPicker` 最近 7 天的语义，包含今天
- 🦀️ 修复了 `Tabs` 组件中 `activeId` 为 0 时无法选中的问题
- 🦀️ 修复了 `Form` 组件 `validateOnChange` 和 `validateOnBlur` 同时设为 `false` 时，表单提交时不显示校验错误的问题
- `Table`:
  - 🦀️ 修复了 `clearfix` 样式不存在的问题
  - 🦀️ 修复了 `totalItem` 没有正确读取的问题
  - 📚 修改了 `title` 类型的描述
- 🦀️ 修复了 `Select` 组件高度不正确的问题
