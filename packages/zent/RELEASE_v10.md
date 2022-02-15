# 10.0.0 迁移指南

## Breaking Changes

本次升级我们尽量保证了组件的向前兼容，下面所列的破坏性改动理论上不涉及组件的功能，基本都是 UI 上的。

其中 `Tree` 和 `Link` 的改动可能会导致用户自定义的样式覆盖失效，所以我们把老版组件迁移到了最新版的 `@zent/compat` 中，需要平滑升级的话直接引用其中组件即可。

- `Tree`
  - 🦀️ DOM 结构调整
  - 🦀️ `autoExpandOnSelect` 默认值改为 false
- `Button`
  - 🦀️ icon 的 `font-size` 变为 20px
  - 🦀️ disabled 的按钮外层套了一层父元素，以支持 `cursor: not-allowed`
- `Link`
  - 🦀️ disable 状态下 classname 规范化。`zent-link__disabled` 重命名为 `zent-link--disabled`
- `Tag`
  - 🦀️ 默认 `theme` 调整为 `grey` 以适配新版设计语言
- `Loading`
  - 🦀️ 默认图标从 `youzan` 修改为 `circle`

## 新增组件

- ✨ 新增 `DropdownNav` 组件，封装自 `Dropdown`
- ✨ 新增 `Elevator` 组件
- ✨ 新增 `Password` 组件
- ✨ 新增 `Indicator` 组件，从 `Steps` 组件中拆分出
- ✨ 新增 `StatusBar` 组件，封装自 `Alert`
- ✨ 新增 `Banner` 组件，封装自 `Alert`
- ✨ 新增 `Prompt` 组件，封装自 `Alert`

## zent@10.0.0-rc.2(2022-02-15)

- ## `Sortable`
  - 🦀️ 取消拖拽过程中拖拽元素 overflow:hidden 样式设置
  - 🦀️ 元素拖拽中占位覆盖元素 zIndex 层级设置

## zent@10.0.0-rc.1(2022-02-10)

- 📚 组件分类修改
- `Grid`
  - 🦀️ 不传 `size` 时保持之前 tr 上设置的 56px 高度，不再是 break change
- `Card`
  - 暂时移除改动，API 还需要调整
- `Pagination`
  - 🦀️ 兼容次按钮样式更新导致的样式变动

## zent@10.0.0-beta.3(2022-01-28)

- `Button`
  - 🦀️ 回滚 beta2 中删除 `border` 属性的修改

## zent@10.0.0-beta.2(2022-01-26)

- `Button`
  - 🦀️ 修改次级按钮样式
- `Tabs`
  - ✨ `tabPanel` 新增 candel、canFixed 参数
- `Alert`
  - 🦀️ `closable` 默认值恢复 false
- `Banner`
  - 🦀️ `closable` 默认值设为 true
- `Prompt`
  - 🦀️ `closable` 默认值设为 true
- `StatusBar`
  - 🦀️ `closable` 默认值设为 true

## zent@10.0.0-beta.1(2022-01-17)

- `Tree`
  - ✨ 支持 select 状态
  - ✨ 支持 title 只显示一行，超出时 hover 显示 Pop
  - 🦀️ 调整 hover 及 disabled 状态下背景颜色
  - 🦀️ 展开、收起动画曲线及动画时间调整
  - 📚 自定义大小、自定义节点展示、自定义操作、可选树代码演示移入废弃区，新版设计语言已不再使用
- `Breadcrumb`
  - ✨ 支持 `maxItemCount` 属性，bread 数量超过后自动收起
  - ✨ 面包屑宽度可适配，超出展示左右 Icon
  - 🦀️ 最后一级 `BreadcrumbItem` 字体颜色、字号、字重调整
- `Tabs`
  - ✨ `card` 类型支持 `onAdd` 属性，显示添加按钮
  - ✨ 新增 `canFixed` 属性，支持固钉，固定状态支持受控
  - 🦀️ `card` 类型 hover、disabled 状态下字体及背景颜色调整
  - 📚 无 TabPanel、垂直模式、按钮模式代码演示移入废弃区，新版设计语言已不再使用
- `DatePicker`
  - 🦀️ 修改 item 选中和 hover 时的背景颜色
  - 🦀️ 修改日期时候，不重置已选择的时间
  - 🦀️ icon 替换为新版 ZentIcon
  - 🦀️ 周选择高亮覆盖范围包含第一天
- `Cascader`
  - 🦀️ 样式修改，修改选中时和 hover 时的背景颜色，tag 的 margin 大小，字体颜色，icon 颜色
  - ✨ 新增`maxLine`参数，控制多选状态下最多显示行数，默认为 null
  - ✨ 新增`normal`模式的多选模式
- `Swiper`
  - ✨ 组件改名为 `Carousel` ，并增加相应命名导出，原组件名 `Swiper` 仍可用
  - ✨ 下方翻页按钮调整，支持 `line` 类型，默认为 `line` 类型
  - ✨ 支持通过 `arrowsDisabled` 属性，禁用左右切换按钮
  - ✨ 左右两侧按钮支持 hover 显示
  - ✨ 支持 `arrowSize` 属性，调整左右两侧按钮尺寸
  - ✨ 支持 `dotsTheme` 属性，提供两种指示器主题色
  - 🦀️ 左右两侧按钮尺寸、背景颜色调整
  - 📚 文档中英文名调整为 `Carousel`
- `Alert`
  - **现在作为基础组件，不再建议直接使用，可以根据场景使用 `StatusBar`、`Banner` 或者 `Prompt`**
  - ✨ 支持配置 `bordered` 调整边框是否显示，默认无边框
  - ✨ 支持自定义左侧 Icon
  - ✨ 支持自定义 close 按钮颜色
  - ✨ 支持配置顶部进度条进度
- `Button`
  - ✨ 新增 type="icon" 按钮类型
  - ✨ 新增 type="text" 按钮类型
- `SplitButton`
  - 分类上归类到按钮组
  - ✨ 新增`text`样式
  - ✨ 新增没有左侧 button 的下拉按钮样式
- `Radio`
  - 🦀️ 修改文案色值，和 disabled 状态色值
- `Checkbox`
  - 🦀️ 修改文案色值，和 disabled 状态色值
- `Switch`
  - 🦀️ 关闭状态和禁用状态颜色调整
  - 🦀️ loading 状态下图标尺寸调整
- `Link`
  - ✨ 新增 `weak` 参数，true 时表示弱文字链接，默认值 false
  - 🦀️ 强文字链接去掉了 hover 时的按钮背景
  - 🦀️ css 语义化修改
  - 📚 原链接改为强文字链接，增加弱文字链接示例
- `Tag`
  - ✨ 新增 `LinkTag` 和 `SelectTag` 组件
  - ✨ 新增 `size` 属性，支持调整组件尺寸
  - 📚 彩色标签和可关闭标签代码演示移入废弃区，新版设计语言已不再使用
- `Select`
  - ✨ 内部实现创建条目方法，原来是通过传入的 `onCreate` 修改 options 实现，现在是内部处理新增 options 的逻辑
  - 🦀️ select 样式修改，修改 hover 和选中背景颜色，tags 超出一行显示省略号，分组下间距字体大小修改
  - 🦀️ select 增加 `widthSize` 的类型，分为 xs、s、m、l、xl
  - 📚 文档中修改 demo 中样式，滚动加载的显示高度，加载中 icon 文字的大小 padding
- `Badge`
  - 🦀️ 修复 `offset` 参数实际实现与文档说明（[x, y]）相反的 bug
  - 🦀️ 徽标数字从 12px 改为 10px，使用 scale 实现
  - 📚 组件名称 徽标数 改为 徽标，修改使用指南
- `Card`
  - ✨ 新增无边框样式
  - ✨ 新增小卡片样式
  - 🦀️ title 字体大小、字重调整
  - 🦀️ header 区域间距、边框调整
  - 🦀️ 内联卡片样式调整
  - 📚 有边框、无标题及嵌入模式代码演示移入废弃区，新版设计语言已不再使用
- `Drawer`
  - ✨ 支持两种默认尺寸（default: 728px、small: 364px）
  - 🦀️ 标题区域间距调整
  - 🦀️ 关闭按钮尺寸和颜色调整
  - 📚 自定义位置及无遮罩代码演示移入废弃区，新版设计语言已不再使用
- `Popover`
  - 🦀️ 圆角和 padding 大小修改
- `Dialog`
  - 🦀️ 标题区域间距调整
  - 🦀️ 关闭按钮尺寸和颜色调整
  - 📚 无头部及仅内容代码演示移入废弃区，新版设计语言已不再使用
  - 📚 组件名称对话框改为对话窗
- `Pagination`
  - 🦀️ svg 箭头图标改为 ZentIcon 中的箭头
- `Steps`
  - ✨ 拆分部分功能到 Indicator 组件
  - ✨ breadcrumb 、number 类型支持自定义 Icon
  - ✨ breadcrumb 类型支持 ghost 属性，显示反色样式
  - 🦀️ 步骤条间间距调整
  - 📚 tabs 及 card 类型演示移入废弃区，新版设计语言已不再使用
- `Input`
  - ✨ 新增 `widthSize` API，支持四种长度 xs、s、m、l、xl
  - 🦀️ 样式修改，修改 icon 大小，icon 边距，disabled 状态下 icon 颜色，textArea 默认高度，超出时间字数统计变为红色
- `NumberInput`
  - 🦀️ 样式修改，改变图标大小，hover 时候的样式
  - ✨ 异常输入添加 pop 提示
  - 📚 删除带 + - 号步进器的 demo，新版设计语言已不再使用
- `Slider`
  - 🦀️ 样式修改，修改 hover 和 active 时滚动点的边框大小
  - 📚 删除双滑块的 demo，新版设计语言已不再使用
- `Tooltip`
  - 🦀️ tooltip 背景色与 padding 大小的修改，去掉阴影
  - 📚 文档中删除 LT、LB、RT、RB 四个方向，新版设计语言已不再使用
- `Collapse`
  - ✨ 支持标题自定义内容
  - 🦀️ 折叠箭头 Icon 调整为 ZentIcon
  - 🦀️ 标题间距、颜色调整
  - 🦀️ 分割线颜色调整
  - 📚 有边框及无箭头样式演示移入废弃区，新版设计语言已不再使用
- `Grid`
  - ✨ 新增 size 属性，支持三种尺寸
  - ✨ 新增排序按钮 hover 时的 tooltip 提示，并增加 hover 对应的背景色
  - 🦀️ 表格行 hover 时的背景色修改
  - 🦀️ 可展开列按钮改为 ZentIcon 中的箭头
- `Sortable`
  - 🦀️ 拖拽动效优化
  - 📚 新增拖拽手柄及拖拽禁用相关 demo
- `Progress`
  - ✨ 进度条边缘样式支持配置为 `round`、`square`，默认为 `round`
  - 🦀️ 默认宽度及 Icon 尺寸调整
  - 📚 环形进度条代码演示移入废弃区，新版设计语言已不再使用
- `Notify`
  - 🦀️ Icon 尺寸调整
  - 🦀️ 圆角调整为 2px
  - 🦀️ 去掉最小宽度
- `Loading`
  - 🦀️ circle 图标替换为 svg
  - ✨ 支持 `showBackground` 属性，展示白色背景
  - ✨ 支持 `textSize` 属性，设置 loading 文案字体大小
- `Form`
  - 🦀️ 调整提示信息错误信息之间的间距，样式
  - 📚 修改自定义 model 的 demo，校验失败后能自动滚动到错误位置，将大部分 label 和 input 改成上下排列
- `语义化相关`
  - ✨ 新增文字按钮、图片按钮语义化定义
  - 🦀️ Button 组件部分语义化修改
