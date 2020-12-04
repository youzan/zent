---
title: ClampLines
subtitle: 多行文本裁剪
path: component/clamp-lines
group: 展示
---

## ClampLines

限制文本最大行数。不建议在一个页面上大量使用，会有性能问题。

- 自适应容器大小需要 `ResizeObserver` 支持，部分老浏览器需要自行引入 polyfill。
- 当 `ResizeObserver` 不存在时，该组件仅能处理由于窗口大小变化而导致的容器大小变化。

### API

| 参数      | 说明                               | 类型                               | 默认值          | 备选值               |
| --------- | ---------------------------------- | ---------------------------------- | --------------- | -------------------- |
| text      | 初始文本                           | `string`                           | `''`            |                      |
| lines     | 显示文本的最大行数                 | `number`                           | `2`             |                      |
| ellipsis  | 省略符号的样式                     | string                             | `'...'`         |                      |
| showPop   | 是否显示 Pop 提示                  | `boolean`                          | `true`          |                      |
| popWidth  | pop 的宽度                         | `number`                           | `250`           |                      |
| trigger   | Pop 的触发方式                     | `string`                           | `'hover'`       | `'click'`, `'focus'` |
| renderPop | 自定义 Pop content 的显示          | `function`                         | `identity`      |                      |
| resizable | 是否响应容器的大小变化             | `boolean`                          | `false`         |                      |
| mode      | 算法选择：可选性能或者准确性       | `'performance'` \| `'correctness'` | `'performance'` | `'correctness'`      |
| extra     | 额外节点，用于显示`更多`一类的操作 | `ReactElement`                     | `null`          |                      |
| className | 自定义额外类名                     | `string`                           | `''`            |                      |

#### 关于算法

内置两种算法

- `performance` 默认值；算法以性能优先，极端场景下可能出现截断位置错误，导致实际展示的行数和设置的不一致。但是，实际使用场景下很少会出现截断位置不准确的情况。导致截断错误的场景一般出现在大段中英文、以及 emoji 等字符混排的情况，同语种场景下基本不可能出现问题。
- `correctness` 算法确保截断结果准确，但是性能相比 `performance` 模式会有数量级的差异。几百个字符的场景下，相比 `performance` 算法就会有肉眼可见的延迟。所以请慎用该算法。
