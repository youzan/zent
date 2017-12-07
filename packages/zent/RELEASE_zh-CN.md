## 更新日志

3.5.3 之前版本的详细修改记录请看 [Github 日志](github_changelog#zent-3-5-2-2017-09-07)。

### 3.10.5 (2017-12-05)

- 🦀️ 回滚 `Design` 的预览宽度为 `320px`

### 3.10.4 (2017-12-04)

- `Design`
  - ✨ 预览区域宽度调整为 `375px`
  - 🦀️ 样式优化
- ✨ `Pop` 和 `Popover` 组件导出了 `adjustPosition` 用于在极端情况下手动触发位置更新
- 🦀️ 修复 `Button` 组件在某些全局环境下，样式错误的问题
- `Upload`
  - 🦀️ 样式优化
  - 🦀️ 处理了一些 ES6 的兼容问题

### 3.10.3 (2017-11-29)

- `Upload`
  - 🦀️ 修复 `accept` 参数无效的问题
  - 🦀️ 修复语音上传问题
- 🦀️ `Pagination` 样式修复
- `Design`
  - ✨ 修改添加组件按钮样式
  - ✨ 优化删除组件逻辑
  - 🦀️ 去掉添加/删除组件时的自动滚动

### 3.10.2 (2017-11-28)

- 🦀️ 修复 `Upload` 组件 `accept` 参数无效的问题

### 3.10.1 (2017-11-27)

- 🎉 `NumberInput` 新增一种新样式，通过 `showCounter` 开启
- `Upload`
  - ✨ 组件增强文件类型判断功能
  - ✨ 支持语音上传
  - 🦀️ 修复删除图片位置不对的问题
- `Design`
  - 🦀️ 修复了一些样式问题
  - ✨ 新增 `canInsert`, `canDelete` 用于细粒度控制添加/删除按钮
- 🦀️ 修复 `Form` 组件有异步校验导致无法提交的问题
- 🦀️ 修复 `Pop` 的 TypeScript 类型定义

### 3.10.0 (2017-11-24)

- 🎉 新增年份选择组件 `YearPicker`
- `Design`
  - ✨ 新的添加组件交互
  - ✨ 不再依赖 `react-dnd`
- 🦀️ 修复 `Cascader` 数据不能为空的问题

如果你的 `Design` 组件依赖 `react-dnd` 你可能需要在 App 的顶层自己注入 `react-dnd` 的 context.

```jsx
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContextProvider } from 'react-dnd';

export default class YourApp {
  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
      /* ... */
      </DragDropContextProvider>
    );
  };
}
```

### 3.9.9 (2017-11-22)

- `Design`
  - 🦀️ 修复添加组件浮层字体颜色不对的问题
  - 🦀️ 暂时去掉了选中组件时滚动到屏幕内的行为
- `Form`
  - 🦀️ 修复 `FieldArray` 因删减导致的表单校验报错的问题
  - 🦀️ 修复 `FieldArray` 在嵌套使用时，部分域增删时数据不对问题
  - 🦀️ 修复文档中错误文字
  - 🦀️ 修复 `setFieldsValue` 和 `initialize` 方法无法设定表单域为 `0` 的问题
  - 🦀️ 修复 `validateOnChange` 和 `validateOnBlur` 同为 `false` 时，部分情况下仍然在非提交时报错

### 3.9.8 (2017-11-21)

- 🦀️ 更新 `Design` 删除/添加组件的交互

### 3.9.7 (2017-11-20)

- 🦀️ 修复 `Design` 分组样式问题

### 3.9.6 (2017-11-20)

- `Design`
  - ✨ 当组件达到最大可添加数量时，支持展示一个提示给用户
  - ✨ 样式更新，最主要的是去掉了添加组件区域上面的箭头
- `Input`
  - ✨ 增加了一个 `select` 方法用于选中输入框的文字，同时也支持 `autoSelect` 来默认选中部分文字
  - 🦀️ 修复了 `diabled` 状态的样式问题
- 🦀️ 修复了 `Upload` 组件无法重复上传同一个组件的问题
- 🦀️ 修复了 `Select` 中 `data` 参数为 `undefined` 或者 `null` 时报错的问题
- 🦀️ 修复了 `MonthPicker` 的禁用逻辑
- 🦀️ 修复了 `Table` 组件的 `emptyLabel` 类型
- 🦀️ 修复了 `Button` 组件的 TypeScript 定义

### 3.9.5 (2017-11-13)

- ✨ 文档网站增加组件搜索功能
- 🦀️ 修复了 `DatePicker` 时间联动禁用逻辑

### 3.9.4 (2017-11-09)

- 🦀️ 更新英文文档

### 3.9.3 (2017-11-09)

- 🎉 新版文档网站，加入了英文文档支持
- ✨ `Progress` 组件支持自定义颜色
- ✨ 表单组件（例如 `Input`, `Select` 等）支持通过传入 `width=xx` 来设置宽度
- ✨ `Notify` 组件支持 `config` 函数来设置全局弹框消失延迟时间
- ✨ `DatePicker` 支持 `max` 和 `min` 来禁用时间
- 🦀️ 修复了 `Form` 组件提交表单时不触发没有校验过的异步校验的问题
- 🦀️ 修复了 `Popover` 组件某些情况下调用 `getBoundingClientRect` 出错的问题

### 3.9.2 (2017-11-06)

- ✨ `Design` 组件支持创建时自定义默认类型
- 🦀️ 修复了 `Table` 某些情况下跨页多选失败的问题
- 🦀️ 修复了一些 React 16 下的兼容问题

### 3.9.1 (2017-11-02)

- 🦀️ 修复了 `Design` 的一些样式问题

### 3.9.0 (2017-10-31)

- ✨ 增加了基础全局样式，类似 `normalize.css` 和 `reset.css`
- `Grid`:
  - 🦀️ 修复了不能动态修改 `columns` 的问题
  - 🦀️ 修复当行高高于默认高度时，左侧固定列和右侧固定列高度不一致的问题
  - 🦀️ 修复滚动到最右侧时，最右侧固定列的阴影不消失的问题
- 🦀️ 修复了 `Design` 代码中的一个变量名错误，不影响代码功能
- 🦀️ 修复了 `Form` 的 `ControlGroup` 不能处理 Functional Component 的问题
- 📚 更新了文档网站细节样式

### 3.8.1 (2017-10-26)

- 🎉 新增组件库 Demo，可以在文档的[项目示例](demos)页面查看
- 🎉 新增新建组件样板的脚本 `yarn new-component`
- ✨ `Table` 支持整行选择，通过参数 `canRowSelect` 控制，默认关闭
- `Design`:
  - 🦀️ 修复了 `defaultSelectedIndex` 的应用逻辑
  - 🦀️ 修复了 Chrome 62 中的按钮样式问题
- 🦀️ 修复了 `Select` 组件在格式化数据时会修改 `data` 数组中对象的问题

### babel-plugin-zent@1.1.0 (2017-10-26)

- ✨ 新增 `useRawStyle` 参数，支持 import postcss 样式，需要配合 zent >= 3.8.1 使用

### 3.8.0 (2017-10-20)

- 🎉 新组件 `InfiniteScroller`，用来实现滚动自动加载
- `Form`:
  - 🎉 新增 `FormSection` 以及 `FieldArray` 支持
  - 🎉 新增 `setFieldsValue` 以及 `initialize` 方法
  - 🎉 更多内置表单元素组件: `FormColorPickerField`, `FormDateRangePickerField`, `FormNumberInputField`, `FormSwitchField`
  - 🎉 `Field` 添加重要提示 `notice` 属性
  - ✨ 增加 `setFormDirty` 和 `isFieldDirty` 方法
- ✨ `Select` 做了一些代码逻辑优化
- ✨ `Design` 添加组件的时候支持回调函数终止当前操作
- ✨ `Popover` 的 `onBeforeClose` 以及 `onBeforeShow` 支持终止当前操作
- 🦀️ `Slider` 组件现在高亮圆点的时候会同时高亮滑动条
- 🦀️ 修复了 `DateRangePicker` 的 TypeScript 定义
- 🦀 修复了 `SearchInput` 的一个样式问题

### 3.7.0 (2017-09-28)

- 🎉 新组件 `Grid`，功能和 `Table` 组件类似，但是底层是用 `<table>` 实现的，现在 `Grid` 有些 `Table` 的功能还没有实现
- 🎉 Zent 支持自定义主题，文档网站同步添加了[色彩](colors)和[主题定制](theme)的章节
- `Steps`:
  - ✨ 新增了 `onStepChange` 和 `sequence` 参数
  - ✨ 更新了 `number` 类型的样式
- 🦀️ 修复了 React 16 下面的一些警告
- 🦀️ 修复了 `Slider` 文档页面上的警告
- 🦀️ 更新了 `DateRangeQuickPicker` 的样式
- 🦀️ 修复了 `Select` 在选项数组置空后选中项不会重置的问题

### 3.6.1 (2017-09-21)

- 🦀️ 修复了 `Design` 的样式问题

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
- 📚 更新了文档网站，添加了[组件开发的详细文档](contribute)

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
