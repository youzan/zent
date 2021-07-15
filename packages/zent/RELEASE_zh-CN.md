## 更新日志

3.5.3 之前版本的详细修改记录请看 [Github 日志](github_changelog#zent-3-5-2-2017-09-07)。

### 升级指南

- [9.x 升级指南](./changelog-v9)
- [7.x 升级指南](./changelog-v7)
- [3.x 升级指南](../migrating/3x)
- [2.1.x 升级指南](../migrating/21x)

### 9.8.0(2021-07-15)

- ✨ 重画所有图标，同时增加了一些新图标。由于新、旧图标大小可能有细微差别，个别场景下样式可能会有些许偏移
- 🦀️ 修复 `Grid` 切换 `selection` 时视图和数据不同步的问题
- 🦀️ 修复 `Select` 组件挂载时通过 `display: none` 隐藏，之后再渲染出来的时候弹层宽度错误的问题
- 🦀️ 清理并重写仓库 `eslint` 规则
- 📚 文档网站骨架迁移到 `TypeScript`

### 9.7.3(2021-07-02)

- 🦀️ `Upload` 文件对象上公开 `file` 和 `id` 属性，之前的 `_file` 和 `_id` 仍保留，如果有使用 `_` 开头的属性请尽快替换
- 🦀️ 修复 `bootstrap` 脚本参数问题
- 📚 `Form` 文档中 `useMAppend` 替换成 `useMulti`
- 依赖升级
  - `TypeScript` `4.1` 升级到 `4.3`
  - `rxjs` `v6` 升级到 `v7`
  - `sortablejs` `1.12.0` 升级到 `1.13.0`
  - `webpack` `v4` 升级到 `v5`，开发模式编译性能有较大提升
  - `jest` `v24` 升级到 `v27`
  - `postcss` `v6` 升级到 `v8`
  - 升级其他所有依赖到最新版
- 📚 使用 `react-refresh-webpack-plugin` 替换 `@hot-loader/react-dom`

### 9.7.2(2021-06-25)

- 🦀️ 修复 `Tag` 组件无法作为 `Pop` 的 trigger 使用的问题
- 🦀️ 修复 `DatePicker` 组件中当前时间按钮的禁用逻辑
- 🦀️ 更新 `caniuse-lite` 数据库
- 📚 修复 `DataPicker` 英文文档中示例丢失的问题

### 9.7.1(2021-06-17)

- `Form`
  - 🦀️ 之前版本 Model 被销毁后仍能被操作，导致一些比较奇怪的视图/数据不一致的问题，因此增加了 Model 销毁后继续被使用的检查，更及时的暴露问题
  - 🦀️ 修复性能警告文案错误问题
  - 📚 文档增加 Model 常用 API 描述
  - 📚 修改 `destroyOnUnmount` 的文档，减少歧义
- 📚 `Pop` 文档增加长文本的 FAQ

### 9.7.0(2021-06-04)

这个版本都是 `Form` 相关改动。

✨ 放宽绝大部分 Hooks 对 `FormContext` 的依赖。

- 允许 `Field` 和 `FieldArray` 相关 hooks 传入 `Model` 类型参数时在 `FormContext` 之外使用；`FieldSet` 相关 hooks 依旧必须在 `FormContext` 之中使用
- Hooks 在 `Model` 模式下允许使用 `name` 来引用 model 对象，不再限制仅在 `View` 模式允许使用 `name`
- 废弃临时解决方案 `useModelValue` 和 `useModelValid`，直接使用 `useFieldValue` 和 `useFieldValid` 即可

✨ `Model` 模式下支持动态增/删表单项，[设计文档](https://github.com/youzan/zent/discussions/1663)。

- 所有 model 对象上都增加了 `builder` 属性来获取生成这个 model 的 `Builder` 对象，`View` 模式下该字段永远为空
- `FieldSetModel` 和 `FormModel` 上导出两个新方法 `removeChild` 以及 `registerChild` 用于删除/添加子 model
- 重载 `FieldArrayModel` 上的 `push`, `unshift` 以及 `splice` 方法接受 model 类型的参数，之前仅支持传 model 的值
- 新增 `useNamedChildModel` hook，用于订阅 `FieldSetModel` 以及 `FormModel` 子 model 的增加/删除行为
- 增加 `Model` 模式下动态增/删表单项的文档和示例

### 9.6.0(2021-05-28)

- ✨ `InfiniteScroller` 增加 `threshold` 参数，用以控制触发 `loadMore` 时距离列表底部的距离
- ✨ `Menu` `inline` 模式支持受控的菜单展开和选中
- ✨ `Checkbox` 支持 `style` 内联样式
- 🦀️ 修复 `Select` 中 `width` 为非数字并且没有设置 `popupWidth` 时，弹层和输入框宽度不一致的问题
- 📚 更新 `Collapse` 的类型定义和文档描述

### 9.5.0(2021-05-07)

- ✨ `Affix` 支持相对非 `window` 节点定位
- ✨ `InfiniteScroller` 支持 `ref`
- `Form`
  - ✨ `willScrollToError` 支持自定义滚动的节点
  - 🦀️ `ArrayBuilder` 类型中移除 `null`
  - 🦀️ 调整订阅容器值/校验状态时的警告逻辑，内部代码不再触发警告
- 🦀️ 修复 `Popover` trigger 中对 `Fragment` 的错误处理
- 🦀️ 修复 `ButtonDirective` 中对 `Fragment` 的错误处理
- 🦀️ 修复某些浏览器(Safari)里 `IMEComposition` 内输入框不触发 `onChange` 事件
- `Grid`
  - 🦀️ 修复并统一单选/多选/展开列的样式
  - 🦀️ 列配置中的 `nowrap` 重命名为 `noWrap`，老字段仍然兼容
  - 📚 更新文档中关于 `Table` 的描述
- 📚 更新 `Form` 的文档，补充了基础 API 的信息

### 9.4.2(2021-03-26)

- 🦀️ `Badge` 类型定义中 `children` 属性改为可选
- 🦀️ 更新 `@wojtekmaj/enzyme-adapter-react-17` 到最新版
- `Upload`
  - 🦀️ 修复 `getUploadSuccessOverrideProps` 不生效的问题
  - 🦀️ 修复一些文档和代码中的拼写错误
- `Form`
  - 🦀️ `FormInputField`, `FormImageUploadField` 以及 `FormUploadField` 增加往 `props.props` 上设置默认值的警告
  - 📚 修复 `Model` 模式示例中数组下标作为 `key` 的问题
  - 📚 调整了文档结构，增加了一些概述性说明，方便理解表单的工作原理
- 📚 修复 `Select` 虚拟滚动示例特殊情况下崩溃的问题
- 文档
  - 📚 Github Actions 中增加同步 Gitee Pages 的能力
  - 📚 Github Actions 中发版完成后增加企业微信通知
  - 📚 更新 logo 以及设计语言网站链接

### 9.4.1(2021-03-11)

- ✨ 导出 `Form` 中的 `useFormChild`，并添加了文档
- 🦀️ 修复 `Cascader` 设置 `options` 后选中状态不同步的问题
- 📚 不同版本的文档链接使用相对路径，方便部署到其他平台
- 📚 升级文档代码高亮包 `prismjs`，修复安全问题
- 📚 `v9` 的升级指南中将 `Dialog` 的视觉交互改动列入不兼容改动

### 9.4.0(2021-02-26)

- ✨ `Popover` / `Pop` / `Tooltip` hover 模式兼容 `disabled` 的 `input` 和 `button`，目前仅支持 zent 内置组件，三方组件需要自行处理兼容问题，具体请参考文档
- `Select`
  - ✨ `onKeywordChange` 增加 `meta` 参数标识回调函数触发的原因
  - 🦀️ 修复搜索框使用输入法时触发 `onChange` 的时机问题

### 9.3.0(2021-01-28)

- ✨ `MenuCascader` 多选模式支持通过 `simplifySelection` 参数控制是否合并展示子节点全选的选项
- `Form`
  - ✨ Model 上新增 `clearError` 函数，用于手动清除错误状态
  - ✨ 增加 `useModelValue` 和 `useModelValid` 两个不依赖 `FormContext` 的 Hooks
- 📚 9.0 的 changelog 中补充遗漏的 `Table` 迁移描述

### 9.2.0(2021-01-21)

- ✨ `Grid` 支持单选
- `DatePicker`
  - 🦀️ 修复年份、月份的禁用逻辑
  - 🦀️ 优化 `CombinedDatePicker` 交互
  - 🦀️ `DateRangePicker` 支持数组形式的 `disabled` 和 `canClear`
- 🦀️ 修复 `DateRangeQuickPicker` `min` 和 `max` 不生效的问题
- 🦀️ 修复 `Select`, `Switch` 以及 `CheckboxGroup` defaultProps 引起的类型问题
- 🦀️ 修复 `Form` 渲染时 `willScrollToError` 的警告信息
- 🦀️ 更新 `Select` 以及 `Cascader` 下拉箭头样式

### 9.1.2(2021-01-11)

- 🦀️ 修复 `Grid` 多选框串数据的问题
- 🦀️ 修复 `Tree` `expandAll` 变更不生效的问题
- 🦀️ 修复 `Form` 文档中 `FormInputField` 代码问题

### 9.1.1(2021-01-05)

- ✨ 新增一个图标
- `Form`
  - ✨ 滚动到第一个错误处功能支持通过 `willScrollToError` 自定义偏移量
  - 🦀️ 调整表单域垂直间距为 24px

### 9.1.0(2020-12-21)

- 💥 修复 `Select` 范型参数的问题，原来一个范型参数改为两个范型参数，`Select<ISelecItem<number>>` => `Select<number>`
- ✨ 新增单文件上传组件
- ✨ `NumberInput` 支持自定义步进
- 🦀️ 修复 `Button` 禁用时边框的样式问题

### 9.0.2(2020-12-18)

- ✨ `Swiper` 支持自定义上一个/下一个按钮

### 9.0.1(2020-12-18)

- `Select`
  - ✨ 支持受控模式下回填选中的值
  - ✨ 支持自定义渲染输入框中已选择的选项列表，仅在多选模式可用
- `Grid`
  - ✨ `batchRender` 添加位置参数
  - 🦀️ 修复表头分组场景下浮动列表头高度问题
- 🦀️ `DateRangeQuickPicker` 修改今日结束时间为当前时间

### 9.0.0(2020-12-14)

详见 [9.x 升级指南](./changelog-v9)

### 8.6.3(2021-03-19)

- 🦀️ 修复 `Upload` 的 `onUpload` 返回值没有生效的问题

### 8.6.2(2021-01-11)

- 🦀️ 修复 `Tree` `expandAll` 不受控的问题

### 8.6.1(2020-12-18)

- `Grid`
  - 🦀️ 修复浮动列在表头分组场景下高度问题
  - 🦀️ `batchRender` 增加渲染位置可选参数

### 8.6.0(2020-12-15)

- ✨ 主题色支持透明度，主题色定义兼容老版本，但老版本无法使用透明度
- 🦀️ 调整 `Radio` 的右边距为 `24px`

### 8.5.12(2020-11-05)

- 🦀️ 修复 `Upload` 上传文件时顺序变化的问题
- 🦀️ 修复 `Grid` 自定义行组件的类型

### 8.5.11(2020-10-28)

- 🦀️ 修复 `Form` 的类型定义问题
- 🦀️ `WindowEventHandler` 兼容 SSR 场景
- 🦀️ `Input` 不可编辑状态下隐藏清除按钮

### 8.5.10(2020-10-22)

- 修复 `Sortable` 无法将元素移动到第一个的问题

### 8.5.9(2020-10-12)

- `Form`
  - 🦀️ 修复 `FormModel.prototype.owner` 不能赋值的问题
  - 🦀️ 优化了 `value-listener` 中异步订阅的逻辑
  - 🦀️ 类型定义优化
- 🦀️ 修复 `Button` 部分场景下 `disabled` 处理逻辑不对的问题
- 🦀️ 修复 `Portal` 在 SSR 场景下的报错
- 🦀️ 修复 `ClampLines` 在文本为空时可能出现的渲染问题

### 8.5.8(2020-09-11)

- 🦀️ 调整 `Button` 之间的间距
- `Form`
  - ✨ `Field` 组件支持初始值 `initialValue`，并增加 `reset` 事件用于触发表单重置
  - 🦀️ 修复 `state` 变更导致 `ZentForm` 不必要的重新创建
- `Input`
  - ✨ 增加 `onIconClick` 回调
  - ✨ `TextareaInput` 新增 `maxCharacterCount` 属性支持文本超长及错误提示

### 8.5.7(2020-08-28)

- 🦀️ 修复 `Progress` 组件 `circle` 类型的 `normalColor`，`successColor`，`exceptionColor` 和 `strokeWidth` 不生效问题

### 8.5.6(2020-08-21)

- 🦀️ 修复 `Slider` 值超出范围的问题
- 🦀️ 调整 `Checkbox` 之间的间距
- `Form`
  - 🦀️ 导出 `IMaybeError` 和 `ValidatorContext`
  - 🦀️ 优化 `FormSelectField` 的类型定义

### 8.5.5(2020-08-14)

- ✨ `Loading` 组件支持 `colorPreset` 参数
- ✨ `ColorPicker` 支持 `disabled` 参数禁用，并兼容 `Disabled` 组件
- 🦀️ 修复 `Table` 组件 `renderBody` 参数的类型定义
- 🦀️ 修复 `Form` 组件 `scrollToError` 定位错误的问题
- 🦀️ 删除无用的 `formulr` 依赖
- 🦀️ 更新两个图标 `calendar-o` 和 `gift`
- 📚 更新文档高亮依赖的 `prismjs` 版本至 `1.21.0`

### 8.5.4(2020-08-04)

- 🦀️ 修复上个版本 `TypeScript` 和 `tslib` 不匹配的问题
- 🦀️ 修复 `Checkbox` 禁用时的文字颜色
- 📚 增加一个 `Form` 自定义表单项的示例

### 8.5.3(2020-07-22)

- ✨ 添加新图标 `thumbnail`
- `Form`
  - ✨ `formulr` 合入仓库内，不再单独发包
  - ✨ 增加 `FormContext` 支持自定义 `labelStyle`
  - 🦀️ 确保 `FieldArray` 的 child 上一定存在 `id` 属性，可以避免使用数组下标作为 key
  - 🦀️ 修复一个 React 的 warning
- 🦀️ 修复 `Grid` `batchComponents` 为空数组是的渲染问题
- 🦀️ 修复编译自定义主题时的代码校验逻辑
- 🦀️ `ClampLines` 允许超长非 CJK 字符串词内折行
- 📚 文档导航增加 `babel-plugin-zent` 的链接
- 📚 修复文档的一些样式问题

### 8.5.2(2020-06-23)

- `Form`
  - 🦀️ 修复一些逻辑问题
  - 🦀️ `FormSelectField` 支持 `onDelete` 逻辑处理，兼容 `tags` 模式
  - 🦀️ 导出 validator 相关的类型
- 🦀️ 修复 `Swiper` 组件在一些场景下跳动的问题
- 🦀️ 修复 `ScrollAlert` children 识别问题

### 8.5.1(2020-06-10)

- ✨ `Tooltip` 支持 `display` 属性透传到 `Popover` 组件
- ✨ 新增 `drag` 图标
- 🦀️ 更新 `Dialog` 的 TypeScript 类型定义
- 🦀️ 修复 `NumberInput` 的类型定义
- 🦀️ 修复 `Form` React 16.13 之后版本的 warning
- 📚 补充了 `Form` `ValidateOption` 相关的文档

### 8.5.0(2020-05-07)

- ✨ 新增 4 个图标：`folder-o`, `open-folder-o`, `refresh`, `save-o`
- ✨ `Upload` 删除默认辅助文案，不提供 `tips` 属性时不展示辅助文案
- `Alert`
  - ✨ 增加 `hint` 样式类型
  - ✨ 增加 `ScrollAlert`，支持轮播的通知
- `Form`
  - ✨ `Field` 的 `validate` 会向上冒泡到上层的 `FieldArray` 或者 `FieldSet`
  - ✨ 新增 `ValidatorMiddlewares`，用于动态修改 validator 的行为
  - ✨ `FormSelectField` 支持透传 `children`
  - 🦀️ 修复 `Form` `submit` 后 use after unmount 的问题
  - 🦀️ 修复 `Select`、`Option`、`FormInputField` 的类型定义
- 🦀️ 修复 `Grid` `scroll.x` 变化时固定列阴影展示问题
- 🦀️ 修复 `Collapse` 的类型定义
- 🦀️ 修复 `Pagination` 跳转页码按回车没反应的问题

### 8.4.0-1(2020-11-17)

- 🦀️ 修复部分组件主题色不支持 CSS Variable 配置的问题

### 8.4.0(2020-03-16)

- ✨ `Upload` 支持自定义上传项 UI
- ✨ `Tabs` 按钮样式优化
- 🦀️ 修复 `Windows` 系统开发兼容性问题
- 🦀️ `DatePicker` 不修改传入的 `Date` 类型参数
- `Grid`
  - 🦀️ 修复窗口尺寸变化时固定列的阴影没有同步更新的问题
  - 🦀️ 修复禁用行 hover 高亮时的背景色问题
  - 🦀️ 修复 `getCheckboxProps` 类型定义
- `Form`
  - 🦀️ 导出 `BasicForm`
  - 🦀️ 修复 `required` 参数类型处理不正确的问题

### 8.3.0(2020-02-26)

- `Grid`
  - ✨ 增加禁用行高亮的参数 `disableHoverHighlight`
  - 🦀️ 修复跨页反选后数据错误的问题
- 🦀️ 修复了部分文档样式问题
- `Form`
  - 🦀️ 更新样式
  - 🦀️ 修复 `FieldSet` 类型定义
  - 🦀️ 导出 `ValidateOption`
- 📚 升级了文档网站的依赖

### 8.2.0(2020-02-18)

- ✨ `BlockHeader` 增加一种极简样式
- ✨ `Grid` 表头吸顶支持自定义顶部偏移量
- 🦀️ 修复兼容百分比超出范围时 `Progress` 样式错误的问题
- `Form`
  - 🦀️ 更新错误样式
  - 🦀️ 修复 TypeScript 类型定义问题

### 8.1.0(2020-02-10)

- `Grid`
  - ✨ 表头支持吸顶
  - ✨ 行复选框禁用时支持设置提示文案展示原因
- `Form`
  - ✨ 增加表单值联动的示例
  - ✨ 使用 `model` 模式时 `Field` 组件支持 `validators` 参数，主要应用场景是用在 `FieldArray` 中
  - 🦀️ 修复 `FormNumberInputField` 数据和视图不一致的问题
  - 🦀️ 调整了非输入框的 `Field` 行高，视觉上更紧凑
- 🦀️ 优化了 `ColorPicker` 的拖拽性能，视觉上更加平滑，不卡顿
- 🦀️ 修复 `Select` 组件首次渲染时选中元素为空的问题
- `Upload`
  - 🦀️ 修改上传组件的文件数量计算规则，将上传失败的文件也统计到上传文件数量中
  - 🦀️ 修改 `FILE_UPLOAD_STATUS` 常量的导出方式为组件上的静态属性

### 8.0.1(2020-01-19)

- `Upload`
  - 🦀️ 新版使用和老版本不一样的类名
  - 🦀️ 修复一个删除上传项时页数计算错误的问题

### 8.0.0(2020-01-17)

- 🎉 增加 `Waypoint` 组件，这个组件抽象了元素移入/移除屏幕的逻辑
- 🎉 增加 `Dropdown` 组件，只是对 `Popover` 组件的一层简单封装
- 🎉 [breaking change] 重写 `Upload` 组件，不兼容老版本；老版本请使用 `@zent/compat`
- `Affix`
  - [breaking change] ✨ `offsetTop` 不再有默认值 0，必须自己传
  - ✨ 使用 `Waypoint` 重写
  - ✨ 支持同时设置 `offsetTop` 和 `offsetBottom`
- `InfiniteScroller`
  - ✨ 使用 `Waypoint` 重写
  - [breaking change] ✨ 删除无用的 `offset`，`useCapture` 和 `prefix` 属性
  - [breaking change] ✨ 重命名 `initialLoad` 为 `skipLoadOnMount`，意义相反，默认值行为没变
  - [breaking change] ✨ `hasMore` 默认值修改为 `false`
  - [breaking change] ✨ `useWindow` 默认值修改为 `false`
- `Cascader`
  - ✨ 支持 `disabled` 属性
  - ✨ 删除 `prefix` 支持
  - 🦀️ `onChange` 现在传入的是原始的 option 元素
  - 🦀️ 更新 placeholder 文字颜色
  - 🦀️ [breaking change] 所有 CSS 类名增加前缀，例如 `.open` 这种
- `Select`
  - ✨ 删除 `prefix` 支持
  - 🦀️ 更新组件的箭头图标，和其他组件保持一致
  - 🦀️ [breaking change] 所有 CSS 类名增加前缀，例如 `.tags__empty` 这种都被替换掉了
- ✨ 优化了全局事件处理
- `Icon`
  - ✨ 增加两个新图标 `filter-o` 和 `scan-code-o`
  - ✨ 重命名 `text-guide` 为 `text-guide-o`
  - ✨ 重命名 `video-guide` 为 `video-guide-o`
- ✨ `QuickDateRangePicker` 支持默认选中一个 preset
- ✨ `eslint` 替换 `tslint`
- 🦀️ 更新 `Dialog` 关闭按钮样式
- `Form`
  - ✨ 增加 `useFieldValue` hook
  - ✨ `Form` 上增加 `getSubmitValue` 方法
  - 🦀️ 更新错误样式
  - 🦀️ 更新类型定义
  - 🦀️ 导出 `FormDescription` 组件
  - 🦀️ `FormSelectField` 透传 `withoutLabel` 属性
  - 🦀️ `layout` 改为可选参数
- 🦀️ 修复 `CopyButton` 的类型定义
- 🦀️ 修复 `Pagination` 的字体样式
- 🦀️ 修复 `Rate` 组件小数值时的图标显示问题
- 🦀️ 修复部分组件 `babel-plugin-zent` 处理不正确的问题

### 7.4.5(2021-03-11)

- 🦀️ 回迁 [PR#1406](https://github.com/youzan/zent/pull/1406)，修复 `Swiper` 的快速切换的逻辑问题

### 7.4.4(2020-05-11)

- 🦀️ 修复一个 `NumberInput` 输入状态不对的问题

### 7.4.3(2019-12-19)

- 🦀️ 修复 `FormSelectField` 的 `destroyOnUnmount` 没有生效的问题
- 🦀️ 优化 `Form` 的类型定义
- 🦀️ `FormNumberInputField`(`integer`) 以及 `FormSelectField`(`tags`, `data`) 的所有属性都归入 `props` 下，跟其他组件统一
- 🦀️ 更新表单报错的样式

### 7.4.2(2019-12-13)

- 🦀️ 修复 `Grid` 一个样式问题
- 🦀️ 修复 `DateRangeQuickPicker` 的类型问题

### 7.4.1(2019-12-13)

- ✨ 新增 3 个新图标：`doc`, `video`, `audio`
- ✨ 使用一个内置的精简版替换 `tinycolor2`
- 🦀️ 修复 `Layout` 组件不兼容 SSR 的问题
- 🦀️ `Grid` 的 column name 支持 `a.b.c` 这种写法，不推荐使用，仅为和老版本兼容
- 🦀️ 修复 `Sortable` 组件重复初始化的问题以及类型定义
- 🦀️ 修复 `TextMark` 的类型定义
- 🦀️ 增大时间选择组件的图标大小
- 🦀️ 调整 `BlockHeader` 的 `title` 类型为 `ReactNode`
- 🦀️ 清理了 `createAlias` 相关的无用代码

### 7.4.0(2019-12-06)

- ✨ 新增 `Tooltip` 组件，用于展示提示信息
- ✨ 删除 `lodash-es` 依赖，改用内置函数以及语言特性，同时明确了必须的 polyfill
- 🦀️ **[breaking change]** 所有时间选择组件的 `isFooterVisble` 参数重命名为 `isFooterVisible`，这是个存在很久的拼写错误；如有使用地方，全局替换即可，不发大版本了。
- 🦀️ 修复 `Select` 选项过滤之后按回车选择没有用的问题
- 🦀️ 修复 `Upload` 组件在上传中删除某一项时报错的问题
- 🦀️ `Upload` 组件拖动排序之后不再重置每个图片的唯一 ID

### 7.3.2(2019-11-29)

- ✨ `Link` 组件独立目录，同时兼容 `Disabled` 组件

### 7.3.1(2019-11-27)

- ✨ 新增 `Link` 组件替换 `zent-link` CSS 的使用场景
- ✨ `Radio` 和 `Checkbox` 新增 `labelStyle`
- 🦀️ 修复 `ButtonDirective` 样式问题
- 🦀️ 修复打包编译时读取到的包版本和发布的版本不一致的问题
- 🦀️ 回滚 `Radio` 文字标签的 `display` 为 `inline`
- 🦀️ 修复 `RadioGroup` 内非 `Radio` 组件不可见的问题
- 🦀️ 修复 `CheckboxGroup` 内非 `Checkbox` 组件不可见的问题

### 7.3.0(2019-11-25)

- 🎉 隔离不同版本 zent 的样式，避免页面上存在两份 zent 时的样式污染。
- 🎉 增加了一批编译期常量，可在 TypeScript 或者 SCSS 文件内使用，类似 C 语言的 `__FILE__` 这种变量
- 🦀️ 更新 `BlockHeader` 内部图标颜色
- 🦀️ 修复 `Grid` 批量操作导致滚动展示异常的问题
- 🦀️ 修复 `FormRadioGroupField` `defaultValue` 的判空问题

#### 样式隔离可能的不兼容影响

- 如果有代码直接使用了 zent 的 CSS 样式，但是没有使用 zent 的组件，这个版本之后这些使用方式都会失效。
- 部分自定义样式如果优先级和组件库内的是一样的，但是依赖样式出现的顺序来实现覆盖的，在这个版本之后可能会遇到自定义样式失效的问题；解决方案是增加一个自定义类名，提高自定义样式的优先级。

#### 已知受影响的使用场景

- 直接使用 `Icon` CSS 样式的请使用 `Icon` 组件
- 直接使用 `Breadcrumb` CSS 样式的请使用 `Breadcrumb` 组件
- 使用 `zent-link` CSS 样式的请使用 `Link` 组件，这个组件就是一个 `a` 标签，封装了样式

### 7.2.0(2019-11-18)

- 🎉 新增 `IMEComposition` 组件，同时对有用到 `input` 的组件内部做了兼容处理
- ✨ `Grid` 添加批量操作支持
- ✨ `Pagination` 增加到达最后一页时的提示支持
- ✨ 升级 `date-fns` 到 2.x 版本
- ✨ Fork `fecha`，用 TypeScript 重写；官方的包类型定义问题反反复复出现，不跟他们玩了
- 📚 扩充了 `Form` 的上手文档
- 🦀️ 增大 `BlockHeader` 的图标
- 🦀️ 修复 `Radio` 以及 `Checkbox` 的高度问题，现在不会有多余的垂直方向空白了
- 🦀️ 修复了 `useFieldArrayValue` 数据丢失的问题
- 🦀️ 优化 `Form` 默认的错误渲染函数处理 `undefined` 的逻辑
- 🦀️ 修复 `FormSelectField`, `Form` 以及 `FieldSet` 的类型定义问题
- 🦀️ 修复 `Switch`, `CopyButton` 以及 `DatePicker` 的类型定义问题

### 7.1.0(2019-11-08)

- ✨ `Select` 增加 `retainNullOption` 参数允许选中值为 `null` 的选项
- ✨ 新增 `Notify.info`
- 📚 全新的图标列表
- 🦀️ 修复 `Progress` 在 Safari 下页面缩放时的样式错位问题
- 🦀️ 修复 `Form` 和 `Cascader` 的类型定义
- 🦀️ 更新 `Pagination` 和 `QuarterPicker` 中 `i18n` 的使用方法

### 7.0.1 (2019-11-01)

- 🦀️ `Form` 增加 `default export`

### 7.0.0 (2019-11-01)

改动较多，参考[这个文档](./changelog-v7)。

### 6.6.2 (2019-02-26)

- `Form`
  - 🦀️ 修复异步检验通过还是报错的问题
  - 🦀️ 更新 `createForm` 的 TypeScript 定义
- 🦀️ 增加 `Affix` 以及 `Avatar` DOM 节点不存在时的异常校验

### 6.6.1 (2019-01-30)

- 🦀️ 修复 `Grid` 表头滚动时内容不跟着滚动的问题

### 6.6.0 (2019-01-29)

- ✨ `Grid` 支持表头分组
- 🦀️ 修复了 `Table`, `Grid`, `WindowResizeHandler` 的 `undefined` 报错问题

### 6.5.3 (2019-01-13)

- ✨ `Pop` 支持函数形式的 `position` 参数，参考 `Popover.Position.create`
- `Form`
  - 📚 增加了自定义校验函数的文档
  - 🦀️ 修复了使用 `Fragment` 时滚动报错的问题
- 🦀️ 修复 `ClampLines` 组件修改 `text` 后不更新的问题
- 🦀️ 修复了几个组件中 unmount 之后部分代码报错的问题，包括 `Table`, `Select`, `Grid`, `ClampLines`

### 6.5.2 (2018-12-12)

- ⚠️ 回滚了之前 `6.4.0` 版本引入的一个 `FormSelectField` 在 `tags` 模式下的不兼容改动，不影响 `Select` 组件本身，且这个问题只在使用了 `FormSelectField` 的 `tags` 模式才会出现。

### 6.5.1 (2018-12-07)

⚠️ `6.4.0` 版本引入了一个 `FormSelectField` 在 `tags` 模式下的不兼容改动，`6.5.2` 已经回滚这个改动。

- ✨ 增加维权图标
- `Table`
  - ✨ 支持在行内渲染半选中状态的复选框
  - 🦀️ 修复右对齐无效的问题
- 🦀️ 修复 `Form` 对组件类型的检查
- 🦀️ 修复了一些 TypeScript 的类型定义问题

### 6.5.0 (2018-10-29)

⚠️ `6.4.0` 版本引入了一个 `FormSelectField` 在 `tags` 模式下的不兼容改动，`6.5.2` 已经回滚这个改动。

⚠️ `Form` 的改动可能会导致之前写的有问题代码暴露出问题来，如果遇到这个问题请在 `onSubmitFail` 里处理这些异常。

- ✨ 增加一批新的图标
- 🦀️ `Form` 提交时不会再静默吞掉未处理的异常
- 🦀️ 用 `lodash/assign` 替换了代码中对 `Object.assign` 的依赖
- 🦀️ 修复 `SKU` 组件中弹窗的层级问题
- 🦀️ 修复 `Grid` 组件的 `TypeScript` 定义

### 6.4.1 (2018-10-16)

⚠️ `6.4.0` 版本引入了一个 `FormSelectField` 在 `tags` 模式下的不兼容改动，`6.5.2` 已经回滚这个改动。

- ✨ `Tabs` 通过 `navExtraContent` 增加导航栏自定义额外内容的能力

### 6.4.0 (2018-09-26)

⚠️ 这个版本引入了一个 `FormSelectField` 在 `tags` 模式下的不兼容改动，`6.5.2` 已经回滚这个改动。

- ✨ `FormSelectField` 支持 `tags` 模式 (_已回滚_)
- 🦀️ 修复 `Select` 组件 placeholder 颜色不对的问题
- 🦀️ 修复 `Upload` 上传多个音频时的样式问题

### 6.3.0 (2018-09-07)

- ✨ `TimePicker` 组件增加 `disabledTime` 时间禁用函数属性
- ✨ `Loading` 支持延迟显示
- ✨ 打包支持 ES module 输出形式
- ✨ `babel-plugin-zent@1.2.1` 支持只处理样式引入，配合 ES module 实现 tree shaking（需要打包工具支持）
- `InfiniteScroller`
  - 🦀️ 修复反复触发 `loadMore` 回调的问题
  - 🦀️ 修复文档问题

### 6.2.0 (2018-08-24)

- 🎉 新增多文本缩略显示 `ClampLines` 组件
- ✨ `Grid` 支持拖拽操作
- ✨ `Menu` 添加子菜单折叠/展开以及点击的回调函数
- 🦀️ `DatePicker` 关闭浏览器自动填充输入框的行为
- 🦀️ 修复 `Form` 初始化 `FieldArray` 时的问题

### 6.1.0 (2018-08-03)

- `Grid`
  - ✨ 支持给每一列设置一个默认的展示文案
  - 🦀️ 修复 `selection.getCheckboxProps` 没有实时更新的问题
- ✨ 新增几个 `Icon`
- ✨ `Cascader` 支持通过 `expandTrigger` 设置子菜单的触发方式
- ✨ `Pop` 增加 `containerSelector` 支持
- `Button`
  - ✨ 样式更新
  - ✨ 当按钮文案为两个中文字符时，会在两个字符中间插入一个空格
- 🦀️ 修复了 `NumberInput` 处理 `.xy` 形式的浮点数的问题
- 🦀️ `Table` 选择模式下支持将行设置为选中同时是禁用的状态
- 🦀️ 修复 `Form` 中 `FieldArray` 没有正确更新的问题
- 🦀️ 修复了非常多的 `TypeScript` 定义问题

### 6.0.1 (2018-07-13)

> ⚠️ 之前的版本 `Icon` 字体文件可能在 Windows 下展示会有问题，如果 Window 环境对你很重要建议使用这个版本。

- 🦀️ 修复 Windows 下 `Icon` 显示不正常的问题

### 6.0.0 (2018-07-04)

> 这个版本移除了对 React 15.3 以下版本的支持。

> 文档网站从这个版本开始将放到 [github pages](https://youzan.github.io/zent) 上维护。

- 💥 [breaking change] 删除 `Loading` 组件的 `on`, `off` 以及 `newInstance` 方法
- 💥 [breaking change] 修复 `WeekPicker` 的禁用和选中逻辑
- 💥 [breaking change] `Table` 单元格的 `box-sizing` 变为 `border-box`
- 💥 [breaking change] 删除 `Select` 弹层上的 `zent-select` 类名，这个类名只应该存在于 trigger 上面
- 🎉 新组件 `Mention`
- 🎉 新组件 `Timeline`
- 🎉 `Tree` 重写了一个新版，兼容老的 API，通过 `useNew` 启用；新版加入了受控模式支持
- `Form`
  - ✨ `FieldArray` 支持串行调用多次操作函数，如 `push` 等
  - ✨ `DateRangePickerField` 以及 `DateRangeQuickPickerField` 支持通过 `dateFormat` 来透传依赖组件的 `format` prop
  - ✨ 补全 `DatePicker` 相关的 `Field` 类型，比如 `FormWeekPickerField` 等
  - ✨ `FieldArray` 支持通过 `setFieldsValue` 以及 `initialize` 修改值
- `Grid`
  - ✨ 增加 `TypeScript` 类型定义
  - ✨ 支持 `expandation` 行展开配置
  - ✨ 增加行展开时的 `onExpand` 回调函数
  - ✨ `onChange` 回调支持传递分页大小
  - 🦀️ 移除 `cloneDeep` 的使用，React 16 下复制 jsx 会报错
  - 🦀️ 修复 `rowKey` 无效的问题
  - 📚 文档优化
- `ErrorBoundary`
  - ✨ 增加 `catchError` HOC，适合使用 decorator 的场景
  - 📚 修复文档中 `withErrorBoundary` 的描述
- `Cascader`
  - ✨ 增加 `displayText` 回调自定义选中值的展示
  - 🦀️ 修复 `value` 值不存在时报错的问题
- ✨ `Table` 组件的 `onChange` 回调支持传递分页大小
- ✨ `AutoComplete` 增加 `TAB` 按键处理
- ✨ `SplitButton` 支持下拉菜单位置配置
- ✨ `Pagination` 支持在分页大小改变时触发 `onPageSizeChange` 回调函数
- 🦀️ 修复 `BlockHeader` 标签类型限制的问题(`p` 不能嵌套 `div`)
- 🦀️ 修复 `Avatar` 的 `TypeScript` 类型定义
- 🦀️ 修复 `Sortable` 的 `TypeScript` 类型定义
- 🦀️ 修复 `SplitButton` 的 `TypeScript` 类型定义
- 🦀️ 修复 `Tabs` 的 `TypeScript` 类型定义
- 🦀️ 添加了几个新的图标
- 🦀️ 修复 `Input` 组件的 `addonBefore` 和 `addonAfter` 样式
- 🦀️ 修复 `Swiper` 组件只有两个元素时删除其中一个元素时位置错位的问题
- `Dialog`
  - 🦀️ 修复关闭时报错的问题
  - 🦀️ 修复 SSR 报错
- 🦀️ 修复 `Button` 组件代码里的一些拼写错误，不影响功能
- 🦀️ 修复 `Collapse` 组件的 props 类型申明
- 🦀️ 修复 `DatePicker` 时间禁用逻辑
- 🦀️ 修复 `Select` 某些情况下 `focus` 报错的问题
- 🦀️ 修复 `Loading` 组件在 React 16 下关闭报错的问题
- 🦀️ 删除了 `Card` 中的一些无用样式
- 📚 修复文档的 `babel` 拼写错误

#### Breaking change 迁移方案

> `Loading` `on`, `off`, `newInstance` 的迁移方案：

将 `Loading.on` 以及 `Loading.off` 替换为组件形式，并通过 `state` 上的开关控制。

```js
<Loading float show={this.state.loading} />
```

如果使用了 `newInstance` 方法，渲染多个 `Loading` 实例即可。

> `WeekPicker` 迁移方案:

- 涉及到自定义了 `diabledDate` 的场景，新版中返回的日期区间将只包含可选的日期，老版本会返回整个完整的周，包括那些不可选的日期。这个代码里自行处理下，多数情况应该没有影响。
- 内部维护的周日期区间 `[start, end]` 两个值的时间部分有变化，新版 `start` 时间部分是 `00:00:00:000`, `end` 时间部分是 `23:59:59:999`。所以在 `disabledDate` 的回调函数里判断日期是否禁用的时候需要注意时间部分的差，原则上日期比较是不应该关注时间部分的，但是很多写得不好的代码是直接 `a.getTime() < b.getTime()` 这样比较的，这种用法很大概率上会出问题。

> `Table` 单元格样式迁移方案:

之前是 `content-box`，这次更新之后变为 `border-box`，有些情况下可能会出现单元格变窄的情况，需要在使用的地方适当将受影响的单元格加宽。

> `Select` 弹层的 `zent-select` 类名迁移方案：

首先把这个类名删除是正确的，trigger 和 弹层是不应该公用一个类名的。之前依赖弹层上的 `zent-select` 类名的地方改为 `zent-select__popover` 就行了。

### 5.1.1 (2018-04-19)

- 🦀️ 修复 `Dialog` 某些情况下关闭的时候没有动画的问题
- 🦀️ 修复 `Table` 单元格宽度超出设置值的问题
- 🦀️ `Form` 滚动到第一个错误位置时允许非 `ControlGroup` 封装的 `Field`
- ✨ 升级 `lerna` 到最新版

### 5.1.0 (2018-04-17)

- 🎉 新组件 `ErrorBoundary`，需要 `React` >= 16
- 🎉 新组件 `SplitButton`
- ✨ `previewImage` 支持图片缩放
- ✨ `BlockHeader` 增加 `childAlign` 属性，支持子元素靠右侧显示
- ✨ `Portal` 组件重构，新增 `PurePortal` 和 `LayeredPortal`
- ✨ 升级 `Design` 组件的拖拽库
- ✨ `Dialog` 增加打开/关闭动画
- `YearPicker`
  - ✨ 支持设置 `max` 和 `min`
  - ✨ `value` 支持 `Date` 类型
- 🦀️ 修复 `height` 在 `Loading` 不显示的时候被忽略的问题
- 🦀️ 修复 `BlockHeader` 弹层样式
- 🦀️ 修复 `Popover` 在 `React` 16 下位置计算不正确的问题
- 🦀️ 修复 `Form` 组件 `asyncValidate` 的返回值在某些条件下不是 `Promise` 的问题
- 🦀️ 修复 `Pagination` 样式问题
- 🦀️ `Select` 的 `tag` 模式会撑大内容区域，而不是出现滚动条
- 🦀️ `Cascader` 单测兼容 `React` 16
- 📚 更新文档网站中英文截图

### 5.0.1 (2018-03-20)

- 🦀️ 修复 `WeekPicker` 文字溢出问题
- 🦀️ 修复了一些打包问题

### 5.0.0 (2018-03-16)

> ⚠️ 这个版本 `Upload` 组件有问题，请不要使用。

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

> ⚠️ 这个版本 `Loading` 组件样式有问题，请不要使用。

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

> ⚠️ 这个版本 CSS 打包有问题，请不要使用。

- 🦀️ 修复 `Upload` 文件类型判断问题

### 4.2.0 (2018-02-05)

> ⚠️ 这个版本 CSS 打包有问题，请不要使用。

- 🎉 新组件 `Avatar`
- 🎉 新组件 `Collapase`
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
	}
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
