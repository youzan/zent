## Select 选择器

选择器，提供多种选择器功能。

### 使用指南

组件分层：主要分成 Select, Popup, Trigger 三个模块

#### 1. Select

核心控制器，主要职责是格式化数据，负责 Popup 和 Trigger 间的数据传输

#### 2. Popup

选项列表弹出层，主要负责展示选项，数据过滤控制

#### 3. Trigger

  - 触发器，暴露给使用者，可以通过 trigger 属性进行配置
  - 核心的 trigger 有 SelectTrigger 和 InputTrigger
  - TagsTrigger 是基于 InputTrigger 扩展出来的拥有多选功能的 trigger
  - 使用者可以自行扩展或开发 trigger

### 代码演示

:::demo 基础用法
```jsx
import { Select } from 'zent';

const Option = Select.Option;

ReactDOM.render(
  <Select>
    <Option value="1">选项一</Option>
    <Option value="2">选项二</Option>
    <Option value="3">选项三</Option>
  </Select>
  , mountNode
);
```
:::

:::demo 支持默认选项
```jsx
import { Select } from 'zent';

const Option = Select.Option;

ReactDOM.render(
  <Select value="1">
    <Option value="1">选项一</Option>
    <Option value="2">选项二</Option>
    <Option value="3">选项三</Option>
  </Select>
  , mountNode
);
```
:::

:::demo 支持数组类型选项
```jsx
import { Select } from 'zent';

const data = ['选项一', '选项二', '选项三'];

ReactDOM.render(
  <Select data={data} />
  , mountNode
);
```
:::

:::demo 支持对象形式的选项文案与选项值
```jsx
import { Select } from 'zent';

const data = [
     {value: 1, text: '选项一'},
     {value: 2, text: '选项二'},
     {value: 3, text: '选项三'}
];

ReactDOM.render(
  <Select data={data} />
  , mountNode
);
```
:::

:::demo 支持自定义文案与值对应的key
```jsx
import { Select } from 'zent';

const data = [
     {id: 1, name: '选项一'},
     {id: 2, name: '选项二'},
     {id: 3, name: '选项三'}
];

ReactDOM.render(
  <Select
    data={data}
    optionValue="id"
    optionText="name"
  />
  , mountNode
);
```
:::

:::demo 支持键盘上下方向键选择选项
```jsx
import { Select } from 'zent';

const data = [
     {id: 1, name: '选项一'},
     {id: 2, name: '选项二'},
     {id: 3, name: '选项三'}
];

ReactDOM.render(
  <Select
    data={data}
    optionValue="id"
    optionText="name"
  />
  , mountNode
);
```
:::

:::demo 支持选项改变后的回调
```jsx
import { Select, Dialog } from 'zent';

const data = [
     {id: 1, name: '选项一'},
     {id: 2, name: '选项二'},
     {id: 3, name: '选项三'}
];

function showOption(ev, data) {
  Dialog.openDialog({
    children: `你选择了${data.name}, 值是${data.id}`
  });
}

ReactDOM.render(
  <Select
    data={data}
    optionValue="id"
    optionText="name"
    onChange={showOption}
  />
  , mountNode
);
```
:::

:::demo 支持禁用选项组件
```jsx
import { Select } from 'zent';

const data = [
     {id: 1, name: '选项一'},
     {id: 2, name: '选项二'},
     {id: 3, name: '选项三'}
];

ReactDOM.render(
  <Select
    data={data}
    optionValue="id"
    optionText="name"
    disabled
  />
  , mountNode
);
```
:::

:::demo 支持过滤功能
```jsx
import { Select } from 'zent';

const data = [
     {id: 1, name: '选项一'},
     {id: 2, name: '选项二'},
     {id: 3, name: '选项三'}
];

ReactDOM.render(
  <Select
    data={data}
    optionValue="id"
    optionText="name"
    filter={(item, keyword) => item.name.indexOf(keyword) > -1}
  />
  , mountNode
);
```
:::

:::demo 支持自定义搜索框文案
```jsx
import { Select } from 'zent';

const data = [
     {id: 1, name: '选项一'},
     {id: 2, name: '选项二'},
     {id: 3, name: '选项三'}
];

ReactDOM.render(
  <Select
    data={data}
    optionValue="id"
    optionText="name"
    searchPlaceholder="Search"
    filter={(item, keyword) => item.name.indexOf(keyword) > -1}
  />
  , mountNode
);
```
:::

:::demo 支持自定义无选项文案
```jsx
import { Select } from 'zent';

const data = [
     {id: 1, name: '选项一'},
     {id: 2, name: '选项二'},
     {id: 3, name: '选项三'}
];

ReactDOM.render(
  <Select
    data={data}
    optionValue="id"
    optionText="name"
    emptyText="No Result"
    filter={(item, keyword) => item.name.indexOf(keyword) > -1}
  />
  , mountNode
);
```
:::

:::demo 支持输入搜索
```jsx
import { Select } from 'zent';

const data = [1, 2, 3];

ReactDOM.render(
  <Select
    data={[1, 2, 3]}
    search
    filter={(item, keyword) => {
      return `${item.value}` === `${keyword}`;
    }}
  />
  , mountNode
);
```
:::

:::demo 支持多选标签
```jsx
import { Select } from 'zent';

const data = [
     {id: 1, name: '选项一'},
     {id: 2, name: '选项二'},
     {id: 3, name: '选项三'}
];

ReactDOM.render(
  <Select
    data={data}
    optionValue="id"
    optionText="name"
    tags
    filter={(item, keyword) => item.name.indexOf(keyword) > -1}
  />
  , mountNode
);
```
:::

:::demo 支持多选默认选项
```jsx
import { Select } from 'zent';

const data = [
     {id: 1, name: '选项一'},
     {id: 2, name: '选项二'},
     {id: 3, name: '选项三'}
];

ReactDOM.render(
  <Select value={[1, 2]}
    data={data}
    optionValue="id"
    optionText="name"
    tags
    filter={(item, keyword) => item.name.indexOf(keyword) > -1}
  />
  , mountNode
);
```
:::

### API

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
|------|------|------|--------|--------|
| data | 选项数据 | array | `[]` | 是 |
| value | 默认选中的值，当为tags类型时，可以传入数组 | any | `''` | 否 |
| index | 选中索引 | any | `''` | 否 |
| disabled | 禁用组件 | bool | `false` | 否 |
| placeholder | 默认提示文案 | string | `'请选择'` | 否 |
| searchPlaceholder | 搜索框默认文案 | string | `''` | 否 |
| emptyText | 空列表提示文案 | string | `'没有找到匹配项'` | 否 |
| trigger | 自定义触发器 | function | `Select.SelectTrigger` | 否 |
| optionText | 自定义选项显示文案对应的key, 如{ id: 1, name: '文案' }, 设置optionText="name" | string | `'text'` | 否 |
| optionValue | 自定义选项的值对应的key, 如{ id: 1, name: '文案' }, 设置optionValue="id" | string | `'value'` | 否 |
| onChange | 选择变更后的回调函数 | function | `noop` | 否 |
| onDelete | 删除标签后的回调函数 | function | `noop` | 否 |
| filter | 过滤条件，设置以后才会开启过滤功能 | function | `null` | 否 |
| onAsyncFilter | 异步设置过滤后的数据 | function | `null` | 否 |
| onEmptySelected | 选中过滤条件为空时的回调 | function | `noop` | 否 |
| onOpen | 展开时的回调 | function | `noop` | 否 |
| className | 自定义额外类名 | string | `''` | 否 |
| prefix | 自定义前缀 | string | `'zent'` | 否 |

`如果 data 和 children 两种方式同时使用，data 会将 children 覆盖，主要是为了可以接收异步数据直接改变 data 属性来改变选项。`

### Trigger开发API

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
|------|------|------|--------|--------|
| selectedItems | 已选择的条目 | array | `[]` | 否 |
| extraFilter | 是否自带过滤功能 | boolean | `false` | 否 |
| open | 是否打开Popup | boolean | `false` | 否 |

`Trigger 可以通过调用 this.props.onChange({...}) 通过改变 Popup 的 props 实现参数传递。`
