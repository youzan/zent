## 7.0.0 迁移指南

#### 全局变更

- `React` 必须升级到 16.8 以上
- 删除了所有组件上的 `propTypes`
- 不再支持 `cjs`，请使用支持 esm 的打包工具
- 由于 `React` 内部逻辑的变更，在 `Portal` 内部触发的事件会随着组件树往上冒泡，注意不是 DOM 树，而是组件树。请仔细阅读[官方文档](https://reactjs.org/docs/portals.html#event-bubbling-through-portals)。

#### `babel-plugin-zent`

需要升级到最新的版本，不兼容之前版本的 `zent`

#### 默认字号从 12 调整为 14

注意调整后的页面样式有没有问题

#### `Button`

`Button` 删除了 `component` 属性，请使用新的 `ButtonDirective` 组件处理之前 `component` 的使用场景。

#### `Pagination`

`Pagination` 分为 3 种类型，`import { Pagination, LitePagination, MiniPagination } from 'zent'`。后两种是新增的，不涉及迁移问题。`Pagination` 的一些参数有变化：

- `totalItem` 重命名为 `total`，老的参数名还是支持的，新代码请用 `total`
- `onChange` 回调函数的参数是个对象（老版是个数字），包含当前分页大小和当前页码，老版本只有当前页码
- 删除了 `onPageSizeChange`，`onPageSizeChange` 的能力合并到 `onChange` 之中了
- 删除了 `maxPageToShow`，`maxPageToShow` 的效果可以用 `formatTotal` 来实现，但是请注意语义不一样
- `pageSize` 不再耦合当前页码和页码选项，拆开成两个独立参数：`pageSize` 和 `pageSizeOptions`。分页选项配置也和原来的不一致，接受数字或者 `{value: number, text: node}`。
- CSS 类名和 HTML 结果有变化，有样式复写的需要确认样式是否正常。

#### `Grid` 和 `Table`

因为这两个组件的 `pageInfo` 参数依赖 `Pagination`，所以 `Pagination` 的改动对这个参数一样有影响。

#### `Loading`

`Loading` 拆分成了 3 种子类型，`import { BlockLoading, InlineLoading, FullScreenLoading } from 'zent'`，`InlineLoading` 是新增的能力，不涉及迁移问题。新增了一种样式和描述文案支持。

- 老版中用到 `float` 参数的场景可以用 `FullScreenLoading` 替换，非 `float` 的场景用 `BlockLoading` 替换
- `showDelay` 重命名为 `delay`，逻辑一致
- `show` 重命名为 `loading`，逻辑一致
- 删除了 `containerClass` 参数
- CSS 类名和 HTML 结果有变化，有样式复写的需要确认样式是否正常。

#### `Radio`

现在 Radio 的 `disable` 属性总是比父组件 RadioGroup 的 `disable` 拥有更高优先级。

####  `Checkbox`

现在 Checkbox 的 `disable` 属性总是比父组件 CheckboxGroup 的 `disable` 拥有更高优先级。

#### `Design` 和 `SKU`

使用 `@zent/design` 和 `@zent/sku`，功能一致的。

#### `Switch`

用了大号样式的地方统一改成默认样式，同时找视觉确认下。

#### `Tree`

- 删除了老版的非受控代码，只支持受控模式（这个很早就存在了），组件参数基本是一致的。
- 选中逻辑仅保留受控模式
- `defaultCheckedKeys` 重命名为 `checkedKeys`
- `onCheck` 参数发生变化

```ts
onCheck = (checked: Array, extra: IExtra) => {
    console.log(checked, extra);
    this.setState({
        checkedKeys: checked,
    });
}

interface IExtra {
  // 触发onCheck的节点
  currentRoot: Node;
  // 禁用节点集合
  disabled: Node[];
  //  所有选中的节点集合
  all: Node[];
  //  所有选中节点的祖先节点；即全选可能只有顶部节点
  top: Node[];
  //  能够组成这次选中的最底层节点；即全选可能是金字塔底部的节点
  bottom: Node[];
}
```

#### `NumberInput`

- 组件完全重写
- `onChange` 的参数改为字符串，原来是个事件对象
- 修改了 `onChange` 触发的行为，现在只会在 `onBlur` 或者通过加减按钮修改时触发 `onChange`

#### `Form`

`equals` 和 `equalsField` 这两个内置校验方法迁移到 `===`，以前是 `==`，用到的地方需要自行排查是否兼容。

#### `Layout`

组件真正支持响应式布局，意味着布局可以随着屏幕大小变化而调整，之前的版本布局是固定的。

导出的组件名字变了，老的写法

```js
import { Layout } from 'zent';

const { Row, Col } = Layout;
```

新的写法

```js
import { LayoutRow as Row, LayoutCol as Col, LayoutGrid as Grid } from 'zent';
```

另外，`LayoutRow` 和 `LayoutCol` 必须在 `LayoutGrid` 内部。

### `Tag`

- 删除`onVisibleChange`，不再有内部`state`
- 搭配 `visible` 和 `onClose` 可以实现关闭效果
- 删除`borderColor`，`bgColor`，`fontColor`，直接从`style`传入控制
- 删除`closeButtonFontColor`，添加`closeButtonStyle`
- 预设主题色属性从 `color` 改名为 `theme`，移除 `darkgreen` 主题色，且不再支持自定义颜色传递，需要自定义样式可改用 `style`

#### `Portal`

```js
import { Portal } from 'zent';
const { PurePortal } = Portal;

const MyPortal1 = Portal.withEscToClose(Portal);
const MyPortal2 = Portal.withNonScrollable(Portal);
```

新的写法

```js
import { Portal, PurePortal } from 'zent'

// 替代 withEscToClose
<Portal closeOnESC>...</Portal>

// 替代 withNonScrollable
<Portal blockPageScroll>...</Portal>
```

- 删除了 `LayeredPortal`，请用 `Portal` 替换。
- 去除 `onMount` 和 `onUnmount`，使用方直接使用上层组件的 `componentDidMount` 和 `componentWillUnmount` 即可。

#### `Input`

- 重写，API 无不兼容改动
- CSS 样式层级有变化，样式覆盖需要注意
- 增加了 `icon` 属性

####  `SearchInput`

- 删除了这个组件，使用 `<input icon="search" />` 代替

#### `BlockHeader`

- 删除 `content` 和 `childAlign`，改用 `leftContent` 和 `rightContent` 来控制左右侧额外展示的内容
- 不再渲染 `children` 中的内容
- 整体布局改为 `flex`

### `Alert`

- 内部布局改为 flex 布局
- 删除 `type` 属性中的 `danger` 类型（可改用 `error` 类型），添加 `success` 类型
- 删除 `size`、`rounded` 属性（新版设计中都是圆角样式，且没有大小区分，需要自定义大小和圆角请使用自定义 `className` 修改样式）
- 添加新的属性 `loading`、`outline`、`closeContent`、`extraContent`，使用方法请参考组件文档
- 添加 `title`、`description` 两个属性用于简化内容排版
- `onClose` 现在回调会在点击关闭触发器同时被触发，而不是等到 React 更新完后才触发

### `Rate`

- 删除了 `zent-rate-star-active` 这个 class，外部如果依赖的话请使用 `zent-rate-star-half` 替换

### `Progress`

- 修改状态计算逻辑，传入外部 `status` prop 的情况下，直接使用外部 `status`，否则通过百分比进行状态计算
- 修改消息展示中 `format` 函数的优先级，`success` 和 `exception` 状态下只显示图标，不调用 `format` 函数
- `line` 类型的默认宽度变为适配容器宽度（即100%）

### `Tabs`

- 删除 `onTabChange`，这个回调等价于 `onChange`，并且两年前就已经 deprecate 了，如果有用到的直接替换就行
- 内部布局修改为 flex 布局
- 在 `children` 和 `tabs` 两种配置方式都未使用的情况下会报错，请检查之前的代码是否有使用空 tabs 的情况
- 删除了之前未在文档中提及的 `TabPanel` 的 `onTabReady` prop 回调，如有需要，请在 `onChange` 回调中执行相关代码
- 删除 `align` 参数，新版设计下不再支持自定义布局；若原来有通过 `align="center"` 的方式进行 tab 均分内容区域的地方，可以使用新的 prop —— `stretch` 代替
- 修改 `type` 支持的样式类型，删除了 `slider` 类型，添加了 `button` 类型，默认展示样式类型从卡片样式改为新版基础样式，若需要维持卡片样式不变，请添加 `type="card"`
- 删除 `canadd` 和 `onAdd` 参数，若需要实现动态增删 tab，请使用 `navExtraContent`，传入自定义的 Add Trigger，可参考 tab 文档下的 '动态增删' demo
- 删除 `size` 参数，需要自定义大小请使用 `className`
- 添加 `VerticalTabs` 组件，用于展示竖状样式
- 修改了部分组件 className，请注意样式覆盖的使用场景

#### 源样式

如果之前依赖了 postcss 的源样式，需要改成 sass。

## 7.0.0-next.37(2019-10-10)

- 修复 TimePicker resetTime 的问题

## 7.0.0-next.36(2019-10-10)

- 修复 `Select.Option` 的导出问题

## 7.0.0-next.35(2019-10-10)

- 修复 `Pagination` 样式问题
- 修复 `Alert` 样式问题 
- 修改 `Grid` 排序 icon 样式
- 修复 `Upload` 样式问题
- `Checkbox` 样式修改
- `Sweetalert` 添加 `onClose` 回调
- 修复 `Tree` 会修改外部传入的数据的问题
- `Tabs` 添加类型不匹配时的默认展示行为

## 7.0.0-next.34(2019-09-20) 修复 33 的发布问题，内容一样
## 7.0.0-next.33(2019-09-20) 这个版本有问题，不要使用

- 修复 `Loading` 的延迟
- 修复 `Alert` 的样式
- [重构 `Progress`](#progress)
- [重构 `Tabs`](#tabs)
- 修复 `Sortable.js` 的类型定义
- `Rate` 增加 `readonly`
- 修复 `Notice` 的 `className` 和 `style`
- 重构 `Slider`，内部实现有变化
- 修复 `DateQuickRangePicker` 在 `Form` 下的高亮

## 7.0.0-next.32(2019-09-16)

- 修复 `Select` 样式
- `Button` 添加 warning 样式
- 添加新组建 `Notice`
- 修复 `Notify` 样式
- 更新 `Upload` 样式
- 修复 `Table` 类型定义

## 7.0.0-next.31(2019-09-06)

- `Input`
  - 删除组件的内联样式，放到样式文件内，方便外部覆盖
  - 图标从左侧移到右侧
- 修复 `Button` 对 `Disabled` 组件兼容性问题
- 替换 `ColorPicker` 内的 `componentWillReceiveProps` 为新 API
- 修复 `Table` 排序逻辑错误
- `Grid`
  - hover 背景色由灰色改为蓝色
  - 纵轴滚动条设置为 `auto`，高度不够时不显示滚动条
- 更新 `Notify` 为最新的样式
- 修复 `Select` tags 模式的样式问题

## 7.0.0-next.30(2019-08-27)

- `Pop` 添加 `cushion` API
- `NumberInput` 调整内部实现，`integer` 模式下用户输入为空时 `onChange` 会得到 `null`

## 7.0.0-next.29(2019-08-23)

- 修复 `QuarterPicker` 的选中逻辑
- 按新的视觉样式重写 `Alert`，有不兼容改动，具体参考上面的 `Alert` 一节
- `Popover` 的 trigger 支持 functional component

## 7.0.0-next.28(2019-08-22)

- 样式重构为 CSS Variable
- `package.json` 里加回 `main` 字段，和 `modules` 指向相同的代码
- `Grid` 和 `Table` 支持 `mini` 类型的分页器
- 重写 `Icon` 组件为 functional component
- 用 Hooks 重写 `Checkbox` 组件，现在 `Checkbox` 的 `disable` 属性总是比父组件 `CheckboxGroup` 的 `disable` 拥有更高优先级
- `NumberInput` 支持整数模式，此时 `value` 类型为数字

## 7.0.0-next.27(2019-08-19)

- 修复 `AnimateHeight` 高度为 `auto` 时动画结束没有正确设置高度为 `auto` 的问题
- 修复 `Tree` 的更新逻辑

## 7.0.0-next.26(2019-08-14)

- 修复 `TypeScript` 编译器导致的的一个循环依赖 bug

## 7.0.0-next.25(2019-08-14)

- 更新 `Cascader` 和 `Form` 的样式
- 修复非法属性被透传到 `input` 的问题
- 使用 Hooks 重写 `Radio` 组件，现在 `Radio` 的 `disable` 属性总是比父组件 `RadioGroup` 的 `disable` 拥有更高优先级

## 7.0.0-next.24(2019-08-05)

- 修复 `Upload` 组件 `categoryId` 无法修改的问题

## 7.0.0-next.23(2019-07-31)

- 修复 `Input` 样式问题
- 修复 `date-fns` 代码引用问题
- 修复 `Layout` 响应式参数不生效的问题
- `Tree` 组件选择行为仅保留受控形式，详见上面的迁移指南

## 7.0.0-next.22(2019-07-30)

- 临时修复三方依赖类型定义和实际代码对不上的问题
- 修复 `Disabled` 组件对 `textarea` 不生效的问题
- 修复 `Grid` 鼠标移动时触发重绘的问题
- 修复 `Mention`, `AutoComplete` 弹层不出现的问题
- 修复 `ColorPicker` 修改颜色没有及时生效的问题

## 7.0.0-next.21(2019-07-26)

- 删除 `cjs` 格式输出，只支持 esm；白话版：npm 包里 `lib` 目录没有了，只保留 `es`
- 新增 `Disabled` 组件，用来做区块级别的组件禁用
- 修改 `Grid` 和 `Table` 组件排序规则，同时扩大点击热区到整个表头
- 修复文档小程序组件库链接
- 修复 `Input` 背景颜色不对的问题
- `Table` 排序按钮现在和 `Grid` 一致，一致显示，不需要 hover
- 补全 `Grid` 的类型定义
- 移除 `Cascader`, `Swiper` 以及 `LazyMount` 内的废弃生命周期函数依赖
- 增加文档百度统计能力

## 7.0.0-next.20(2019-07-11)

- 修复 `Form` 最后一个 `Field` 设置 `validateOnBlur` 为 `false` 时表单校验结果没有更新的问题
- `Pagination`
  - 修复 `double` 属性警告
	- 修复页码输入框触发上层表单提交的问题
- 修复 `DatePicker` 字体样式
- 修复在第一次 mount `Portal` 时如果 `selector` 节点不存在的报错问题
- 修复 `NumberInput` 不传 `value` 时的非必要重绘

## 7.0.0-next.19(2019-06-26)

- 重写 `BlockHeader`，有不兼容改动，详见上面的迁移指南
- 重写 `Input`，增加 `icon` 支持，样式覆盖可能有兼容问题，详见上面的迁移指南
- 删除 `SearchInput`，使用 `<input icon="search" />` 代替
- 修复嵌套 `Portal` 的 `componentDidMount` 时无法获取正确 DOM 信息的问题
- 回滚 `TypeScript` 到 3.4，3.5 有严重问题
- 更新 `Upload` 的文案
- `Pagination` 右对齐
- 使用 `flex-start` 以及 `flex-end` 替换 `start` 和 `end`

## 7.0.0-next.18(2019-06-24)

- 重排 `primary` 颜色的顺序，从深到浅，自定义主题的需要更新一下主题色顺序([1096](https://github.com/youzan/zent/pull/1096))
- 修复 `Grid` 类型没导出完全的问题
- 修复 `ButtonDirective` 默认值问题
- `Table` 和 `Grid` 增加 `Pagination` 的 `formatTotal` 支持
- 修复 `Grid` 样式问题

## 7.0.0-next.17(2019-06-24)

内容同 `7.0.0-next.18`，遇到一个 `TypeScript` 的 [bug](https://github.com/microsoft/TypeScript/issues/32057)，已下线，不要使用。

## 7.0.0-next.16(2019-06-18)

- 更新全局字体配色
- 修复 `Tag` 组件样式问题，移除 `color` 属性，增加 `theme` 属性
- 修复 `Loading` 组件包裹内容时导致内容重绘的问题
- `Pagination` 增加 `formatTotal` 用来自定义总数
- 修复 `Table` 批量操作区域样式

## 7.0.0-next.15(2019-06-10)

- 修复 `babel-plugin-zent` 处理非 `default export` 的问题
- 修复 `TabPanel` 缺失的 `disabled` 属性
- 修复 `Upload` 在小屏幕情况下样式问题
- 重构 `Button`，新增 `ButtonDirective` 替换 `component` 的使用场景
- 重构 `Tag`，删除`onVisibleChange`，不再有内部`state`；搭配 `visible` 和 `onClose` 可以实现关闭效果；删除`borderColor`，`bgColor`，`fontColor`，直接从`style`传入控制；删除`closeButtonFontColor`，添加`closeButtonStyle`
- 重构 `AnimationHeight`，删除无用功能，保留最小可用功能
- `Pagination`
  - 删除 `componentWillReceiveProps`
  - 优化上一个、下一个按钮的禁用逻辑

## 7.0.0-next.14(2019-05-29)

- 修复嵌套 `Dialog` 关闭时窗口滚动问题
- 修复 `NumberInput` 加减按钮没有 `onChange` 回调的问题

## 7.0.0-next.13(2019-05-21)

- 修复 `Pagination` 样式
- `Grid` 支持 `bodyRender` 的参数添加 `fixed` 属性，用来判断固定了哪里的列
- `DataRangeQuickPicker` 支持在 `preset` 里自定义时间区间

## 7.0.0-next.12(2019-05-21)

- 支持 `React.CSSProperties` 形式的 style 属性
- 修复 `Portal` 每次 render 都重新 mount 的问题
- 移除 `DatePicker`, `ClampLine` 以及 `Menu` 的 `componentWillReceiveProps` 生命周期依赖

## 7.0.0-next.11(2019-04-29)

### 不兼容改动

- `Portal` hooks 重构，API 有变化，具体看上面的 `Portal` 部分
- `NumberInput` 默认关闭 `autoComplete`
- 更新了组件的字体大小，现在是 14，之前改漏了

### 其他

- 更新打包时的警告信息
- 更新了一些组件的类型定义
- 清理 `SelectMenu` 的代码
- `Grid` 文档里的排序功能增加了数据变化，更加直观
- 修复了 `Grid` 没有滚动条时的多余阴影问题

## 7.0.0-next.10(2019-03-29)

## 7.0.0-next.9(2019-03-29)

- 新增 `TextMark` 组件，用于高亮文本中的一组关键字
- `Table` 和 `Grid`
  - 支持通过 `paginationType="lite"` 选择简化版的分页器
  - 修复一个样式问题

## 7.0.0-next.8(2019-03-27)

- 修复了一些文档和类型定义问题

## 7.0.0-next.7(2019-03-25)

- 修复 `NumberInput` 的样式问题
- 修复 `Timeline` 的演示代码问题

## 7.0.0-next.6(2019-03-25)

### 不兼容改动

- `Form` 校验方法中的 `equals` 和 `equalsField` 迁移到 `===` 比较，之前是 `==`
- 重写 `NumberInput` 组件，`onChange` 参数修改为字符串，不再是个模拟的事件对象；同时 `onChange` 只在 blur 的时候触发
- 更新了 `babel-plugin-zent` 插件的数据格式，不兼容以前的版本
- 重写 `Layout`，不再导出 `Layout` 这个命名空间；同时真正支持响应式布局

### 其他

- 删除了组件上所有的 `propTypes`，现在依赖 `TypeScript` 的类型系统；使用 JavaScript 的话就没有 props 的类型检查了
- 组件代码迁移到 TypeScript，同时使用 `tsc` 替代 `babel` 做转码
- 恢复主题自定义功能，使用方式有变化，具体看文档
- `Portal` 支持嵌套，后续会把 `Popover` 里处理嵌套的相关逻辑迁移到 `Portal`

## 7.0.0-next.5(2019-02-28)

### 不兼容改动

- 拆分 `Pagination` 为 `Pagination`, `MiniPagination` 以及 `LitePagination` 三个独立的样式。

## 7.0.0-next.4(2019-02-26)

### 不兼容改动

- 默认字号从 12 调整为 14
- `prefix` 参数不再支持，后续后全面移除，现在部分组件已经移除
- 不再支持 16.8 以下的 React(Hooks 的最小可用版本)
- 删除 UMD 格式输出
- `Pagination` 重写，API 跟老版不兼容，具体参考 API 文档
- `Loading` 重写，API 跟老版不兼容，具体参考 API 文档
- 用 React 新的 context API 重写 `RadioGroup` 和 `CheckboxGroup`
- 移除 `Design` 和 `SKU` 组件，请使用 `@zent/design` 和 `@zent/sku`。`SKU` 组件不再维护，`Design` 组件进入维护期，不再迭代。
- `Switch` 删除大号样式支持
- `Tree` 组件删除老版支持(即不再支持 `useNew` 参数选择使用的版本)
- 废弃 `postcss` 改用 `node-sass`，样式源文件（assets 目录下的）按需加载需要升级 `babel-plugin-zent` 到 `2.0.0-next.3`
- `NumberInput` 的 `onChange` 回调的参数是 `string`

### 其他

- 样式更新：`Button`, `SplitButton`, `Breadcrumb`, `Steps`, `Menu`, `Radio`, `Checkbox`, `Input`, `Select`, `Slider`, `Switch`, `Badge`, `Collapse`, `Pop`, `Tabs`, `Tag`, `Timeline`, `Dialog`, `Progress`, `Rate`, `Collapse`, `Table`, `Grid`
- 增加 `RadioButton`，按钮样式的单选框
- 删除 `zan-utils` 依赖
- 用 `createPortal` 重写 `Portal` 组件，API 向下兼容
