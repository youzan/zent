# zent-menu

菜单组件

## API

### Menu props

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| prefix | 自定义前缀 | string | 'zent' | null |
| onClick | 点击菜单节点回调 | func |  |  |
| wrapperClassName | 包裹节点的类名 | string | '' | '' |
| className | 每个菜单项的类名 | className | string | '' | '' |

### MenuItem props
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | item 的唯一标志 | string |  |  |
| disabled | 是否禁用当前菜单项 | bool |  |  |

### SubMenu props
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 子菜单项值 | string |  |  |
| disabled | 是否禁用当前菜单项 | bool |  |  |
| subClassName | 当前子菜单类名 | bool |  |  |


