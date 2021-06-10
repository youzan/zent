---
title: Menu
subtitle: 菜单
path: component/menu
group: 导航
---

## Menu 菜单

菜单，为页面提供导航的菜单

### API

#### Menu

| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|------|------|------|--------|-----|
| onClick | 点击菜单节点回调 | `(e: React.MouseEvent, key: string) => void` |  | |
| onSubMenuClick | 点击子菜单(非叶子节点)的回调, 入参为子菜单 ID | `(id: string | number) => void` |  | |
| mode | 模式 | string | 'pop' | 'pop', 'inline' |
| style | 自定义内联样式 | object |  | |
| className | 节点类名 | `string` |  | |

#### `inline` 模式 Menu 参数
| 参数 | 说明 | 类型 | 默认值 | 可选值 |
|------|------|------|--------|-----|
| defaultExpandedKeys | 默认展开的 SubMenu 的 keys | `string[]` | | |
| defaultSelectedKey | 默认选中的 MenuItem 的 key | `string` | |
| selectedKey | 选中的 MenuItem 的 key | `string` | |
| expandedKeys | 展开的 SubMenu 的 keys | `string[]` | | |
| onSelectChange | 选中的 MenuItem 的 key 变化时的回调函数 | `(key: string) => void` | |
| onExpandChange | 菜单展开/折叠时的回调, 入参为此时处于展开状态的 SubMenu id 数组 | `(keys: string[]) => void` |  | |
| inlineIndent | `inline` 模式下的缩进(px) | `number` | 24 | |

#### MenuItem

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | item 的唯一标志 | string | 内部生成的唯一ID |
| disabled | 是否禁用当前菜单项 | bool |  |
| className | 节点自定义类名 | string |  |


#### SubMenu

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | subMenu 的唯一标志 | string | 内部生成的唯一ID |
| title | 子菜单项显示值 | node |  |
| disabled | 是否禁用当前子菜单 | bool |  |
| overlayClassName | 弹出菜单的自定义类名 | string |  |
| className | 子菜单项自定义类名 | string |  |


### FAQ

- 菜单组件使用统一代理的点击事件回调函数, 其参数为 event 和 key(实际上是节点的 index 属性值)。
- 当 MenuItem 不设置 `key` 属性时的会按顺序和层级自动生成节点的唯一标识(从0开始)并保存在 `speckey` 属性上, 作为 `onClick` 函数的第二个参数。
  如果手动设置了 `key` 属性则会被复制到 `speckey` 属性, 覆盖自动生成的标识。建议在Menu不复杂的情况下手动为 MenuItem 设置格式合理的 `key` 属性。

  ```
	<Menu>
		<MenuItem />   -------- 'item_0'
		<SubMenu>      -------- 'item_1'
			<MenuItem /> -------- 'item_1_0'
			<MenuItem /> -------- 'item_1_1'
		</SubMenu>
		<MenuItem />   -------- 'item_2'
	</Menu>

	```
