## 7.0.0 迁移指南

#### 全局变更

- `React` 必须升级到 16.8 以上
- 删除了所有组件上的 `propTypes`
- 由于 `React` 内部逻辑的变更，在 `Portal` 内部触发的事件会随着组件树往上冒泡，注意不是 DOM 树，而是组件树。请仔细阅读[官方文档](https://reactjs.org/docs/portals.html#event-bubbling-through-portals)。

#### `babel-plugin-zent`

需要升级到最新的版本，不兼容之前版本的 `zent`

#### 默认字号从 12 调整为 14

注意调整后的页面样式有没有问题

#### `Pagination`

`Pagination` 分为 3 种类型，`import { Pagination, LitePagination, MiniPagination } from 'zent'`。后两种是新增的，不涉及迁移问题。`Pagination` 的一些参数有变化：

- `totalItem` 重命名为 `total`，老的参数名还是支持的，新代码请用 `total`
- `onChange` 回调函数的参数是个对象（老版是个数字），包含当前分页大小和当前页码，老版本只有当前页码
- 删除了 `onPageSizeChange` 和 `maxPageToShow`，`onPageSizeChange` 的能力合并到 `onChange` 之中了
- `pageSize` 不再耦合当前页码和页码选项，拆开成两个独立参数：`pageSize` 和 `pageSizeOptions`。分页选项配置也和原来的不一致，接受数字或者 `{value: number, text: node}`。
- CSS 类名和 HTML 结果有变化，有样式复写的需要确认样式是否正常。

#### `Grid 和 `Table`

因为这两个组件的 `pageInfo` 参数依赖 `Pagination`，所以 `Pagination` 的改动对这个参数一样有影响。

#### `Loading`

`Loading` 拆分成了 3 种子类型，`import { BlockLoading, InlineLoading, FullScreenLoading } from 'zent'`，`InlineLoading` 是新增的能力，不涉及迁移问题。新增了一种样式和描述文案支持。

- 老版中用到 `float` 参数的场景可以用 `FullScreenLoading` 替换，非 `float` 的场景用 `BlockLoading` 替换
- `showDelay` 重命名为 `delay`，逻辑一致
- `show` 重命名为 `loading`，逻辑一致
- 删除了 `containerClass` 参数
- CSS 类名和 HTML 结果有变化，有样式复写的需要确认样式是否正常。

#### `RadioGroup` 和 `CheckboxGroup`

应该没有影响，只是内部实现变了。

#### `Design` 和 `SKU`

使用 `@zent/design` 和 `@zent/sku`，功能一致的。

#### `Switch`

用了大号样式的地方统一改成默认样式，同时找视觉确认下。

#### `Tree`

删除了老版的非受控代码，只支持受控模式（这个很早就存在了），参数是一致的，一些选中逻辑会有细微区别。

#### `NumberInput`

组件重写，`onChange` 的参数改为字符串。修改了 `onChange` 触发的行为，现在只会在 `onBlur` 或者通过加减按钮修改时触发 `onChange`。

#### `Form`

`equals` 和 `equalsField` 这两个内置校验方法迁移到 `===`，以前是 `==`，用到的地方需要自行排查是否兼容。

#### `Layout`

组件真正支持响应式布局，意味着布局可以随着屏幕大小变化而调整，之前的版本布局是固定的。

导出的组件名字变了，老的写法

```js
import { Layout } from 'zent';

const { Row, Col } = Layout
```

新的写法

```js
import { LayoutRow as Row, LayoutCol as Col, LayoutGrid as Grid } from 'zent';
```

另外，`LayoutRow` 和 `LayoutCol` 必须在 `LayoutGrid` 内部。

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

#### 源样式

如果之前依赖了 postcss 的源样式，需要改成 sass。

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
