# zent-menu

菜单组件

## API

### Menu props

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| prefix | 自定义前缀 | string | 'zent' | null |
| onClick | 点击菜单节点回调 | func |  |  |
| className | 节点类名 | string |  |  |   |

### MenuItem props
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | item 的唯一标志 | string |  |
| disabled | 是否禁用当前菜单项 | bool |  |
| className | 节点类名 | string |  |  |


### SubMenu props
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 子菜单项值 | string |  |
| disabled | 是否禁用当前菜单项 | bool |  |
| overlayClassName | 包裹的节点类名 | bool |  |
| className | 节点类名 | string |  |  |


