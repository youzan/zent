## 更新日志

3.5.3 之前版本的详细修改记录请看 [Github 日志](github_changelog#zent-3-5-2-2017-09-07)。

### 升级指南

- [3.x 升级指南](../migrating/3x)
- [2.1.x 升级指南](../migrating/21x)

### 5.0.1 (2018-03-20)

- 🦀️ 修复 `WeekPicker` 文字溢出问题
- 🦀️ 修复了一些打包问题

### 5.0.0 (2018-03-16)

> 从这个版本开始正式支持 `React` 16，后续开发都将基于 16。

- 🎉 升级 `React` 以及 `Enzyme` 到最新版本，正式支持 `React` 16
- `Button`
  - ✨ 添加对图标的支持
  - ✨ 新增 `Button.Group` 容器
- ✨ `Steps` 组件新增一个 `process` 状态，并且默认值也修改为 `process`
- 🦀️ 修复 `Loading` 组件高度问题
- 🦀️ 更新 `BlockHeader` 组件样式
- `Tree`
  - 🦀️ 修复节点 `expand` 不生效的问题
  - 📚 补充 `loadMore` 的文档
- `Upload`
  - ✨ 允许通过 `errorMessages` 参数自定义错误提示文案
  - 🦀️ 收敛 CSS 的类名，降低冲突风险

### 4.3.2 (2018-03-07)

- 🦀️ 更新 `Loading` 组件高度设置逻辑
- 🦀️ 修复 `Pagination` 文案
- 🦀️ 修复 `Radio` 和 `Checkbox` 组件嵌套使用时的问题
- 🦀️ `Radio` 和 `Checkbox` 的分组组件只读或禁用时会忽略组件自身的设置
- 🦀️ 修复 `Upload` 组件样式问题

### 4.3.1 (2018-03-05)

- 🦀️ 修复 `Select` 组件在标签样式下 placeholder 缩进不一致的问题
- 🦀️ 修复 `Popover` 在特定情况下循环调用 `adjustPosition` 的问题
- 🦀️ 调整 `Tree` 组件的字体大小
- 🦀️ 修复 `Grid` 组件在 Windows 系统下的现实问题
- 🦀️ 修复 `CopyButton` 在某些情况下选择错误的问题

### 4.3.0 (2018-02-14)

> 情人节快乐！新春快乐!

- 🎉 新增 `AutoComplete` 组件
- 🎉 新增 `Rate` 评分组件
- 🦀️ 优化 `Notify` 动画
- 🦀️ 去除 `Tabs` 组件样式中不必要的 `!important`
- 🦀️ 修复 `Select` 搜索框无法获取输入焦点的问题

### 4.2.3 (2018-02-09)

- 🦀️ 修复 `Sortable` 在没传 `items` 时的问题

### 4.2.2 (2018-02-07)

- ✨ `Steps` 新增垂直样式
- 🦀️ 修复 `Grid` 表头高度问题
- 🦀️ 修复打包 CSS 样式丢失问题

### 4.2.1 (2018-02-06)

请不要使用这个版本，用 4.2.2。

- 🦀️ 修复 `Upload` 文件类型判断问题

### 4.2.0 (2018-02-05)

请不要使用这个版本，用 4.2.2。

- 🎉 新组件 `Avatar`
- 🎉 新组件 `Collpase`
- ✨ `Menu` 增加内联模式
- ✨ `Cascader` 支持菜单样式
- ✨ `Input` 清空按钮的回调函数中加入判断来自按钮的参数
- ✨ 补全各个时间选择器的 `TypeScript` 定义
- ✨ `Badge` 组件支持自定义偏移量
- ✨ `NumberInput` 支持回车确认输入 
- ✨ `Upload` 的 `onUpload` 回调支持返回一个 `Promise`
- 🦀️ 修复 `Sortable` 中 `onMove`, `onEnd` 与 `onChange` 同时传入时的问题
- 🦀️ 修复 `Form` 中的多行文本框无法换行的问题
- 🦀️ 修复 `InfiniteScroller` 样式问题
- 🦀️ 修复 `Select` 键盘事件无效的问题
- 🦀️ 修复 `Grid` 边框样式问题
- 🦀️ 修复 `Select` 死循环问题

### 4.1.0 (2018-01-29)

- 🎉 新增 `TimePicker` 和 `TimeRangePicker`
- 🎉 新增 `Placeholder` 组件
- 🎉 新的文档网站样式
- `Card`
  - ✨ 新增 `loading` 状态支持
  - ✨ 支持嵌套的卡片
  - 🦀️ 样式更新
- ✨ `DatePicker` 支持 `canClear` 参数配置是否可以清除选中的时间
- `Upload`
  - ✨ 支持外部传入分组
  - 🦀️ 修复可以选择超过 `maxAmount` 数量文件的问题
  - 🦀️ 修复自动弹出的问题
- 🦀️ 修复 `Notify` 背景色

### 4.0.0 (2018-01-23)

- 💥 `DateRangePicker` 不再支持合并模式，`type` 参数废弃，升级请注意样式
- `Upload` 
  - ✨ 支持分组功能
  - ✨ 国际化支持
- ✨ `Menu` 支持图标展示
- `DatePicker`
  - 🦀️ 修复未选择时间直接确认没有考虑最小时间的问题
  - 🦀️ 修复最小时间的判断问题
- `Design`
  - 🦀️ 文档样式修复
  - 🦀️ `DesignEditor` 不再继承 `PureComponent`
- 🦀️ `Slider` 样式修复
- 🦀️ 修复文档网站锚点失效的问题
- 🦀️ `Grid` 修复头部高度不同步的问题
- 🦀️ 优化 `Notify` 的动画
- `Select`
  - 🦀️ 修复在部分浏览器下的兼容性问题
  - 🦀️ 修复 `emptyText` 无效的问题
- 🦀️ `Sortable` 修复示例

### 3.12.3 (2018-01-10)

- 🦀️ 修复 `Slider` 组件背景色问题
- 🦀️ `Upload` 添加 `image/bmp` 支持
- 🦀️ 修复 `Design` demo 中按钮布局和样式

### 3.12.2 (2018-01-09)

- ✨ `Loading` 没有 `children` 时去掉蒙层的背景色
- ✨ 重命名文件，保持项目内统一
- 🦀️ 修复 `Grid` 头部样式
- 🦀️ 修复大号 `Button` 字体大小
- 🦀️ 修复 `MonthPicker` 没有判断年份的问题
- 📚 增加了国际化的文档

### 3.12.1 (2018-01-05)

- 🦀️ 修复 `CombineDateRangePicker` 没有选完就关闭的问题
- 🦀️ 修复 `Notify` 出场动画问题

### 3.12.0 (2018-01-04)

- 🎉 新增拖拽排序组件 `Sortable`
- 🎉 组件国际化支持
- ✨ `Tag` 支持外部控制显示隐藏
- ✨ `Input` 组件支持清除按钮
- ✨ `Grid` 组件支持表头固定垂直滚动
- ✨ `Notify` 支持多个实例排列显示，同时加上了进出场动画
- `Form`
  - ✨ `Field` 修改错误显示逻辑，支持 `displayError` 控制错误是否显示
  - ✨ `Field` 支持 `relatedFields` 指定检验时同时触发的其他字段
  - ✨ 重写 `FieldArray`
- ✨ `Swiper` 支持动态增减图片
- ✨ `Design` 支持 `settings` 以及 `onSettingsChange` 来设置动态全局配置
- ✨ `Sweetalert` 支持配置关闭按钮以及点击蒙层是否关闭
- 🦀️ 修复 `DateRangePicker` 禁用样式
- 🦀️ 修复 `Loading` 布局中的问题
- 🦀️ 修复 `DatePicker` `onChange` 值不对的问题
- 🦀️ 修复 `NumberInput` `onBlur` 与 `onChange` 事件抛出的值不一致的问题
- 🦀️ 修复 `Upload` 上传图片乱序的问题
- 🦀️ 修复 `Select` tag 类型选中顺序不一致的问题
- 🦀️ 修复 `ColorPicker` 颜色输入框无法删除的问题
- 🦀️ 修复 `textarea` 高度抖动的问题
- 🦀️ 修复了一些 typo
- 🦀️ 修复 `yarn new-component` 命令

### 3.11.0 (2017-12-20)

- 🎉 新组件季度选择器 `QuarterPicker`
- ✨ `Select` 支持选中后清除
- ✨ `Grid` 支持表头固定的纵向滚动方式
- ✨ `DatePicker` 交互优化，没有时间的时候不需要按确认按钮
- ✨ `Upload` 支持已选图片拖拽排序
- ✨ `Input` 的 `textarea` 模式支持文字计数
- ✨ `Input` 的 `textarea` 模式支持根据高度自动撑高
- ✨ `BlockHeader` 修改弹层位置
- `Design`
  - ✨ 新增图片广告示例组件
  - ✨ 新增富文本示例组件
  - ✨ 支持在 preview 底部显示额外的信息
- ✨ `Popover` 和 `Pop` 新增 `onPositionUpdated` 回调函数
- `Form`
  - ✨ 修改 `required` 校验规则，`null` 也认为是错误
  - ✨ 支持禁止表单内部输入框回车提交表单的行为
  - 🦀️ 修复 `validationOnChange` 为 `false` 时部分情况下组件重新渲染的问题
  - 🦀️ 修复自动滚动到第一个错误处无法处理 Functional Component 的问题
- `Swiper`
  - 🦀️ 修复只有一个图片时的问题
  - 🦀️ 修复快速连续点击上一张/下一张的动画问题
- 🦀️ `Loading` 修复图标不居中的问题
- 🦀️ 滚动函数支持运行在 `node.js` 环境
- 🦀️ `Table` 修复使用 `batchcomponents` 时报错的问题
- 📚 `InfiniteScroller` 修复文档错误
- 📚 `Button` 修复示例

### 3.10.7 (2017-12-07)

- ✨ `Menu` 支持传入额外的自定义样式
- 🦀️ `Upload` 修复单文件上传的问题

### 3.10.6 (2017-12-06)

- ✨ `Form` 组件支持表单报错事滚动到第一个错误处
- 🦀️ `Upload` 增加文件过滤支持

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
