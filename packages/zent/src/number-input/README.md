## NumberInput 数值输入框

数字输入组件，通过鼠标或键盘输入内容。

### 使用指南

- 输入内容仅为数字时，使用数字输入框比普通文本输入框更方便。

### 代码演示

:::demo 基础用法

```jsx
import { NumberInput } from 'zent';

ReactDOM.render(
  <div>
  	<NumberInput placeholder="Please input your number"/>
    <NumberInput type="count" placeholder="Please input your number"/>
  </div>
  , mountNode
);

```
:::

:::demo 带小数点精度

```jsx
import { NumberInput } from 'zent';

ReactDOM.render(
  <div>
    <NumberInput decimal="2" placeholder="Please input your number"/>
    <NumberInput type="count" decimal="2" placeholder="Please input your number"/>
  </div>
  , mountNode
);
```
:::

:::demo 带数字最大最小范围

```jsx
import { NumberInput } from 'zent';

ReactDOM.render(
  <div>
    <NumberInput min="2" max="6" decimal="2" placeholder="Please input your number"/>
    <NumberInput type="count" min="2" max="6" decimal="2" placeholder="Please input your number"/>
  </div>
  , mountNode
);
```
:::

:::demo 事件处理

```jsx
import { NumberInput } from 'zent';

class EventTest extends React.Component {
  constructor() {
    super();
    this.state = {
        log: ''
    }
    this.onChange = this.onChange.bind(this);
  }
  onChange(value) {
  	this.setState({ log: value });
  }
  render() {
    return (
      <div>
        <NumberInput onChange={this.onChange} decimal="2" placeholder="Please input your number"/>
        <div><p>{this.state.log}</p></div>
      </div>
    );
  }
}

ReactDOM.render(
  <EventTest />
  , mountNode
);
```
:::


### API

| 参数           | 说明              | 类型            | 默认值      | 备选值                     | 是否必填 |
| ------------ | --------------- | ------------- | -------- | ----------------------- | ---- |
| type         | 自定义类前缀         | string        | `'number'` | `'number'`、`'count'`| 否    |
| value        | 输入值             | string        |          |                         | 否    |
| disabled     | 是否禁用            | bool          | `false`  |                         | 否    |
| placeholder  | 原生placeholder文案 | string        | `''`     |                         | 否    |
| decimal      | 数值精度            | number        |          |                         | 否    |
| min      | 数值范围最小值            | number        |          |                         | 否    |
| max      | 数值范围最大值            | number        |          |                         | 否    |
| onChange     | change事件        | func(e:Event) |          |                         | 否    |
| className    | 自定义额外类名        | string        | `''`     |                         | 否    |
| prefix       | 自定义类前缀         | string        | `'zent'` |                         | 否    |

<style>
.zent-number-input-wrapper {
  width: 200px;
  margin-bottom: 20px;
}
</style>
