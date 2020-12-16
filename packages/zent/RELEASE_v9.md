# 9.0.0 迁移指南

## 9.0.0(2020-12-14)

- 🦀️ `Drawer` 在 `nomask` 模式下，兼容冒泡事件到达时，节点已被移除 DOM 树的场景

## 9.0.0-beta.26(2020-12-14)

- ✨ `Select` 增加 `hideCollapsePop` 支持多选折叠模式下隐藏展示数据的气泡
- 🦀️ 修改 `Dialog` `overflow` 样式

## 9.0.0-beta.25(2020-12-11)

- `DatePicker`
  - 增加 `disabledTimeWithRange`、`getDisabledDateAndTimeWithRangeProps` 等工具函数，用户处理禁用时间或禁用日期
  - 扩展日期组件 `showTime` 时的 `defaultTime` 类型，支持根据日期自定义默认时间
  - 暗提示文本样式修改
- `Popover` `Pop` `Tooltip` `DateRangeQuickPicker` 类名修改
  - 💥 CSS 类名 `zent-pop` => `zent-pop-v2`
  - 💥 CSS 类名 `zent-tooltip` => `zent-tooltip-v2`
  - 💥 CSS 类名 `zent-popover` => `zent-popover-v2`
  - 💥 CSS 类名 `zent-date-range-picker` => `zent-date-range-quick-picker`

## 9.0.0-beta.24 (2020-12-10)

- 🦀️ 导出 `postcss-plugin-constants.js`，`@zent/compat` 需要用到

## 9.0.0-beta.23 (2020-12-10)

- 🦀️ 修复找不到 `ResizeObserver` 类型的问题

## 9.0.0-beta.22 (2020-12-10)

- 💥 使用了新的 jsx transform，不再兼容 17 以下的 React 版本
- 💥 主题色兼容老版本，区分 `rgb` 和 `rgba` 的场景，降低升级成本
- `Steps`
  - 💥 CSS 类名 `is-finish` => `zent-steps-item--finished`
  - 💥 CSS 类名 `is-current` => `zent-steps-item--current`
  - 💥 CSS 类名 `is-clicked` => `zent-steps-item--clickable`
  - 💥 CSS 类名 `is-last-finish` => `zent-steps-item--last-finished`
- ✨ 更新 `Dialog` 样式，调整了最大和最小宽高，并加入了高度自适应滚动的能力
- `Grid`
  - ✨ 增加 `GridColumnProvider` 设置全局列属性
  - ✨ 列属性中增加了 `isValueEmpty` 来自定义判断值为空的逻辑
  - ✨ 支持通过 `loadingProps` 自定义加载样式
- ✨ `Select` 支持通过 `disableSearch` 禁用搜索能力
- ✨ 设置了全局默认文字颜色为 `theme-stroke-1`
- `ClampLines`
  - ✨ 增加一种新的保证结果正确的算法，但是性能较差，默认依旧使用二分算法
  - 🦀️ 修复二分查找算法问题
  - 🦀️ 修复 `Safari` 下样式问题
  - 🦀️ 兼容 `Firefox` 有问题的 `ResizeObserver` 实现
  - 🦀️ 修复一些 Unicode 字符被截断的问题
- 🦀️ 更新 `Input` 样式
- 🦀️ 更新 `Select` 样式
- 🦀️ 更新 `Cascader` 样式
- 🦀️ 更新 `Steps` 样式
- 🦀️ 修复 `Tabs` 翻页逻辑

## 9.0.0-beta21 (2020-12-02)

- `Form`
  - 🦀️ 修复 `set.value` 和 `array.value` 不正确的触发了对 `value` 的持续监听
  - 🦀️ 修复 `array.getRawValue` 总是返回初始值的问题

## 9.0.0-beta20 (2020-12-02)

- 🦀️ 修复 `FieldArrayModel` 一些情况下下 `children` 和 `value` 个数对不上的问题
- 🦀️ `ModelRef` 内部为初始化完成前使用 `initialValue`，而不抛异常

## 9.0.0-beta19 (2020-12-01)

- ✨ `Form` `FieldArrayModel` 增加 `get` 方法用于获取指定下标的子 model
- 🦀️ `Grid` 的 `datasets` 类型改为只读数组

## 9.0.0-beta18 (2020-12-01)

- ✨ `Affix` 支持固定时宽度自适应原位置的容器大小
- ✨ `ClampLines` 支持自适应容器大小
- `Form`
  - ✨ 新增 `useFormValid`, `useFieldValid` 以及 `FieldValid` 用于监听是否有校验错误
  - ✨ `set`, `array` 支持深度订阅值的改变
- 🦀️ 修复 `openDialog` 返回值的类型
- `DatePicker`
  - 🦀️ 修复 `disabledTime` 校验不及时的问题
  - 🦀️ 修复 `disabledDate` 传入包含时间的 `min`、`max` 时不生效的问题
- 🦀️ 修复 `Select` 搜索结果列表键盘选择错误的问题

## 9.0.0-beta17 (2020-11-27)

- ✨ `Tabs` 增加 `disableLazyMount` 参数，但不推荐使用
- 🦀️ `Breadcrumb.Item` `name` 改为可选
- 🦀️ 修复嵌套 `Loading` 组件的样式问题
- 🦀️ 修复 `Popover` 一个可能的在 `unmount` 之后还更新状态的问题
- 🦀️ 修复 `DatePicker` `disabled` 属性不生效的问题
- 🦀️ 修复 `FormSelectField` 默认值不生效的问题
- 🦀️ 修复 `FormDatePickerField` 默认值不生效的问题
- 🦀️ 移除 `Form` 校验上下文中 `getFormValue` 的范型约束
- 🦀️ 修复 `useFieldValue` 中一个未正确清理订阅的问题

## 9.0.0-beta16 (2020-11-24)

- ✨ `Form` 增加 `willScrollToError` 回调，用于需要在滚动到错误前需要做一些额外操作的场景
- 🦀️ 修复 `Select` 通过键盘选择时的问题

## 9.0.0-beta15 (2020-11-21)

- 🦀️ 修复 `React@v17` 下 `Dialog` 动画的问题
- 🦀️ 修复 `DatePicker` 背景色问题
- ✨ 升级开发依赖：`React@v17` `TypeScript@v4.1`

## 9.0.0-beta14 (2020-11-20)

- 🦀️ 修复 `node-sass` 导致的一个问题
- ✨ 升级 `caniuse-lite` 数据库

## 9.0.0-beta13 (2020-11-19)

- 🦀️ 修复 `RadioButton` 文字不居中的问题
- 🦀️ 修复 `DatePicker` 弹层的 `z-index` 问题
- 🦀️ 修复主题色问题
- 📚 增加主题色相关 mixin 和 function 文档

## 9.0.0-beta12 (2020-11-17)

- ✨ `FieldSetValue` 支持直接传入 model
- 🦀️ 修复 `DatePicker` 样式问题
- 🦀️ 修复部分组件 CSS Variable 主题色支持问题
- 📚 更新 `Cascader` 组件 `renderValue` 的文档描述

## 9.0.0-beta11 (2020-11-13)

- `Cascader`
  - ✨ 支持通过 `visible` 和 `onVisibleChange` 外部控制打开/关闭
  - ✨ 支持通过 `renderItemContent` 自定义选项内容渲染
  - ✨ 支持通过 `renderList` 自定义选项列表渲染
  - ✨ 支持通过 `getItemTooltip` 自定义选项 hover 时的提示文案

## 9.0.0-beta10 (2020-11-11)

- 🦀️ 修复 `CombinedDateRangePicker` 和 `WeekPicker` 的范围样式
- 🦀️ 修改 `Pop` 组件属性 `onConfirm` 和 `onCancel` 的类型定义
- 🦀️ 调整 `Pop` 组件 `confirm` 类型中按钮的样式
- 🦀️ 修改 `FormNumberInputField` 的 `props` 类型

## 9.0.0-beta9 (2020-11-10)

- 🦀️ 修复 `Cascader` 多选时选项层级不一致导致的报错

## 9.0.0-beta8 (2020-11-09)

- 🦀️ 视图模式下 `normalizeBeforeSubmit` 可选

## 9.0.0-beta7 (2020-11-09)

- [breaking change] 修改 `FormSelectField` props 的传递方式，所有 `Select` 的属性都通过 `props.props` 传递，和其他 `Field` 一致，受影响的只有 `multiple` 和 `options` 两个属性
- ✨ `Form` 视图模式增加 `normalizeBeforeSubmit` 支持
- 🦀️ 修复 model builder `normalizeBeforeSubmit` 运行时报错的问题
- 🦀️ 更新 `Radio` 样式

## 9.0.0-beta6 (2020-11-07)

- ✨ 新增 `eye`、`closed-eye` 图标
- 🦀️ 日期选择组件的 `value` 属性类型优化

## 9.0.0-beta5 (2020-11-05)

- ✨ `Cascader` 增加自定义渲染(`renderTags`)多选结果的能力

## 9.0.0-beta4 (2020-11-05)

- 🦀️ `utils/scroll` 导出方式兼容老版本

## 9.0.0-beta3 (2020-11-02)

- ✨ 新增 `Drawer` 组件
- ✨ `Tabs` 新增标签栏分页和锚点功能
- ✨ `@zent/compat` 增加老版本的 `Pop` 和 `Tooltip` 组件，方便迁移
- ✨ 日期区间选择组件支持限制可选范围
- 🦀️ 修复周选择组件的样式问题
- 🦀️ 修复 `Pop` 的类型定义
- 🦀️ 修复时间选择组件禁用逻辑

## 9.0.0-beta2 (2020-10-23)

- ✨ 导出 `EventHandler`、`SmoothScroll` 和 `AnimateHeight`
- 📚 增加 `v6`、`v7` 使用文档版本选择
- 🦀️ 修复 `Cascader` 组件 `multiple` 参数的类型定义问题
- 🦀️ 修改 `DatePicker` 组件 `valueType` 和 `onChange` 参数的类型定义

## Breaking Changes

### React 最低版本升级到 17

不再支持 React <= 16 的版本。

### 移除 `prefix` 支持

所有组件都不再支持 `prefix` 属性。

这个属性是历史遗留问题，开始于一个远古的 zent 版本，本身设计的目的为了支持样式定制，但其实一点用也没有。如果有在使用这个属性来做样式定制的，请直接使用 zent 提供的主题功能。

### 重写 `Popover` 组件

⚠️ 如果希望使用老版本的 `Popover` 组件，请使用 `@zent/compat` 这个包。这个包里的 `Popover` 组件不再迭代，不加新功能，不改 bug。

老版本的 `Popover` 因为 React 的限制，会有一个包裹层 `zent-popover-wrapper`，新版本的 React 支持了 Fragment，所以 `Popover` 不再需要这个包裹层了。由于这个改动，`Popover` 上原来用来控制这个包裹层样式的参数都被删除了，包括 `width`、`display` 以及 `wrapperClassName`，这些属性可以直接在 trigger 上自行控制。另外增加了控制弹层样式的 `style` 属性，原来的 `className` 行为未变。

新版 CSS 类名有变化，具体参考上面各版本的详细说明。

#### 废弃 `Trigger.Base` 基类

请使用 `PopoverAnchor` 来实现自定义的 trigger，`Trigger.Base` 不再被支持。

#### `Trigger.Click`

- `autoClose` 重命名为 `closeOnClickOutside`，这个名字更加贴切的描述了这个属性的作用
- 删除 `isOutSide` 参数，这个参数太过于灵活，使用频次也非常低
- 新增 `toggle` 和 `getElement`，具体说明请参考 `Popover` 的文档说明

#### `Trigger.Hover`

- 删除 `quirk` 和 `isOutSide` 参数
- 新增 `anchorOnly` 和 `getElement` 参数，其中 `anchorOnly` 用于替代 `quirk` 的绝大部分使用场景

#### `Trigger.Focus`

- 新增 `getElement` 参数

### `Pop` 和 `Tooltip`

`Popover` 的改动同样适用于 `Pop` 和 `Tooltip`，这里不再重复，请参考上文 `Popover` 的描述以及 `Pop` 和 `Tooltip` 各自的文档说明。

老版本的 `Pop` 和 `Tooltip` 已经迁移到 `@zent/compat`。

新版 CSS 类名有变化，具体参考上面各版本的详细说明。

### 重写 `Select`

老版本的 `Select` 是一个非受控组件，代码逻辑难以捉摸，这次是从头开始的完全重写，可以认为是两个完全不同的组件，使用说明请参考新版 `Select` 的文档。新版加入了一些需求很大的功能，比如选项的动态加载等。

如果希望继续使用老版本的 `Select` 组件，请使用 `@zent/compat` 这个包。⚠️ 注意：这个包里的 `Select` 组件不再迭代新功能，也不再修 bug，只会酌情处理致命的问题。

### 重写 `DatePicker` 等时间选择组件

和 `Select` 类似，这也是完全重写，和老组件没有任何关联，使用说明请参考新版组件的文档。新版本采用了全新的交互、视觉设计，新增了一些新交互的组件，比如 `CombinedDateRangePicker` 和 `CombinedTimeRangePicker`。

如果希望继续使用老版本的时间选择组件，请使用 `@zent/compat` 这个包。⚠️ 注意：这个包里的时间选择组件不再迭代新功能，也不再修 bug，只会酌情处理致命的问题。

### `DateRangeQuickPicker` CSS 类名变化

新版 CSS 类名有变化，具体参考上面各版本的详细说明。

实现上使用了新版时间选择组件。

### 重写 `Cascader`

这也是一个从头开始的完全重写，和原组件完全不兼容，使用说明请参考新版组件的文档。新版增加了异步搜索，滚动加载等新功能。

如果希望继续使用老版本的 `Cascader`，请使用 `@zent/compat` 这个包。⚠️ 注意：这个包里的 `Cascader` 不再迭代新功能，也不再修 bug，只会酌情处理致命的问题。

### 内置的 `Form` `Field` 组件

由于 `Select` 和时间选择组件的重构，这些组件对应的 `Field` 也做了相应改造，如果希望使用在新 `Form`（基于 formulr）中使用这些老版本的 `Field`，请使用 `@zent/compat` 这个包里的 `formulr/form-components`。⚠️ 注意：这些 `Field` 组件不再迭代新功能，也不再修 bug，只会酌情处理致命的问题。

### `previewImage`

所有 CSS 类名都加了 `zent-image-p-` 的前缀，如果有自定义样式不正常请检查类名是否正确。

- `zent-show-image`
- `image-is-zooming`
- `image-p-footer-paging`
- `show-rotate-btn`
- `rotate-action`

### `Steps`

新版部分 CSS 类名有变化，具体参考上面各版本的详细说明。功能无变化。

### 文档

- 删除 [`Sku`](https://github.com/zent-contrib/sku) 和 [`Design`](https://github.com/zent-contrib/design) 的文档，这两个组件上个版本已经移除，如果需要查看它们的文档请到对应的仓库看。

## 新功能

- 新增 `Transfer` 组件，一个左右布局的选择组件
- 新增 `Drawer` 组件
- 主题色支持透明度，同时兼容老版本的主题色（老版主题色不支持透明度），详细配置参考主题色的文档
- 其余新功能请参考上面各版本的详细说明
