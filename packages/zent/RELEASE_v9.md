# 9.0.0 迁移指南

## Breaking Changes

### 移除 `prefix` 支持

所有组件都不再支持 `prefix` 属性。

这个属性是历史遗留问题，开始于一个远古的 zent 版本，本身设计的目的为了支持样式定制，但其实一点用也没有。如果有在使用这个属性来做样式定制的，请直接使用 zent 提供的主题功能。

### 重写 `Popover` 组件

⚠️ 如果希望使用老版本的 `Popover` 组件，请使用 `@zent/compat` 这个包。这个包里的 `Popover` 组件不再迭代，不加新功能，不改 bug。

老版本的 `Popover` 因为 React 的限制，会有一个包裹层 `zent-popover-wrapper`，新版本的 React 支持了 Fragment，所以 `Popover` 不再需要这个包裹层了。由于这个改动，`Popover` 上原来用来控制这个包裹层样式的参数都被删除了，包括 `width`、`display` 以及 `wrapperClassName`，这些属性可以直接在 trigger 上自行控制。另外增加了控制弹层样式的 `style` 属性，原来的 `className` 行为未变。

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

### 重写 `Select`

老版本的 `Select` 是一个非受控组件，代码逻辑难以捉摸，这次是从头开始的完全重写，可以认为是两个完全不同的组件，使用说明请参考新版 `Select` 的文档。新版加入了一些需求很大的功能，比如选项的动态加载等。

如果希望继续使用老版本的 `Select` 组件，请使用 `@zent/compat` 这个包。⚠️ 注意：这个包里的 `Select` 组件不再迭代新功能，也不再修 bug，只会酌情处理致命的问题。

### 重写 `DatePicker` 等时间选择组件

和 `Select` 类似，这也是完全重写，和老组件没有任何关联，使用说明请参考新版组件的文档。新版本采用了全新的交互、视觉设计，新增了一些新交互的组件，比如 `CombinedDateRangePicker` 和 `CombinedTimeRangePicker`。

如果希望继续使用老版本的时间选择组件，请使用 `@zent/compat` 这个包。⚠️ 注意：这个包里的时间选择组件不再迭代新功能，也不再修 bug，只会酌情处理致命的问题。

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

### 文档

- 删除 [`Sku`](https://github.com/zent-contrib/sku) 和 [`Design`](https://github.com/zent-contrib/design) 的文档，这两个组件上个版本已经移除，如果需要查看它们的文档请到对应的仓库看。

## 新功能

- 新增 `Transfer` 组件，一个左右布局的选择组件。

## 9.0.0-beta2（2020-10-23）

- ✨ 导出 `EventHandler`、`SmoothScroll` 和 `AnimateHeight`
- 📚 增加 `v6`、`v7` 使用文档版本选择
- 🦀️ 修复 `Cascader` 组件 `multiple` 参数的类型定义问题
- 🦀️ 修改 `DatePicker` 组件 `valueType` 和 `onChange` 参数的类型定义