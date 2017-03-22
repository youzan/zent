# zent-select

这是一个 select 组件

### 设计

组件分层：主要分成 Select, Popup, Trigger 三个模块

##### 1. Select

核心控制器，主要职责是格式化数据，负责 Popup 和 Trigger 间的数据传输

##### 2. Popup

选项列表弹出层，主要负责展示选项，数据过滤控制

##### 3. Trigger

  - 触发器，暴露给使用者，可以通过 trigger 属性进行配置
  - 核心的 trigger 有 SelectTrigger 和 InputTrigger
  - TagsTrigger 是基于 InputTrigger 扩展出来的拥有多选功能的 trigger
  - 使用者可以自行扩展或开发 trigger

##### 使用方式
```html
<Select>
     <Option value="1">选项一</Option>
     <Option value="2">选项二</Option>
     <Option value="3">选项三</Option>
</Select>
```

```html

const data = ['选项一', '选项二', '选项三']

<Select data={data}></Select>
```

```html

const data = [
     {value: 1, text: '选项一'},
     {value: 2, text: '选项二'},
     {value: 3, text: '选项三'}
]

<Select data={data}></Select>
```

注意：如果 data 和 children 两种方式同时使用，data 会将 children 覆盖，主要是为了可以接收异步数据直接改变 data 属性来改变选项。

##### 输出
```js
{ value: 1, text: '选项一' }
```

## 组件API

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
|------|------|------|--------|--------|
| className | 自定义额外类名 | string | '' | 否 |
| prefix | 自定义前缀 | string | 'zent' | 否 |
| data | 选项数据 | array | [] | 否 |
| placeholder | 默认提示文案 | string | '请选择' | 否 |
| searchPlaceholder | 搜索框默认文案 | string | '' | 否 |
| emptyText | 空列表提示文案 | string | '没有找到匹配项' | 否 |
| trigger | 自定义触发器 | function | Select.SelectTrigger | 否 |
| onChange | 选择变更后回调函数 | function | noop | 否 |
| filter | 过滤条件 | function | null | 否 |
| onAsyncFilter | 过滤条件 | function | null | 否 |
| onEmptySelected | 选中过滤条件为空时的回调 | function | noop | 否 |
| onOpen | 展开时的回调 | function | noop | 否 |
| optionText | 自定义选项显示文案对应的key, 如{ id: 1, name: '文案' }, 设置optionText="name" | string | "text" | 否 |
| optionValue | 自定义选项的值对应的key, 如{ id: 1, name: '文案' }, 设置optionValue="id" | string | "value" | 否 |

## Trigger开发API

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
|------|------|------|--------|--------|
| selectedItems | 已选择的条目 | array | [] | 否 |
| extraFilter | 是否自带过滤功能 | boolean | false | 否 |
| open | 是否打开Popup | boolean | false | 否 |

Trigger 可以通过调用 this.props.onChange({...}) 通过改变 Popup 的 props 实现参数传递。

## ChangeLog

###v0.1.53

onFilter开始弃用，改成filter
