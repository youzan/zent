## Input 输入框

表单的输入组件，对原生input的包装，通过鼠标或键盘输入内容。

### 使用指南

- 在表单输入时使用，可带前缀或后缀。
- 可与其它组件组合使用，如组合成一个搜索输入框

### 代码演示

:::demo 基础用法

```jsx
import { Input } from 'zent';

ReactDOM.render(
    <div>
        <Input placeholder="Please input your name" autoFocus />
        <Input type="password" placeholder="Please input your password" />
    </div>
    , mountNode
);

```
:::

:::demo 带前后缀的输入框

```jsx
import { Input } from 'zent';

ReactDOM.render(
    <div>
        <Input addonBefore="$" />
        <Input addonAfter="%" />
        <Input addonBefore="Buy" addonAfter="Apple" />
    </div>
    , mountNode
);
```
:::

:::demo textarea输入框

```jsx
import { Input } from 'zent';

ReactDOM.render(
    <div>
        <Input type="textarea" />
    </div>
    , mountNode
);
```
:::

:::demo 事件处理

```jsx
import { Input } from 'zent';

class EventTest extends React.Component {
    constructor() {
        super();
        this.state = {
            logs: []
        }
    }
    onPressEnter = (e) => {
        this.addLog('enter pressed');
    }

    onKeyDown = (e) => {
        this.addLog('key down');
    }

    addLog(msg) {
        const { logs } = this.state;
        logs.push(msg)
        this.setState({logs})
    }

    render() {
        return (
            <div>
                <Input onPressEnter={this.onPressEnter} placeholder="press enter"/>
                <Input onKeyDown={this.onKeyDown} placeholder="key down"/>
                <div>{this.state.logs.map((log, index) => <p key={index}>{log}</p>)}</div>
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
| className    | 自定义额外类名         | string        | `''`     |                         | 否    |
| prefix       | 自定义类前缀          | string        | `'zent'` |                         | 否    |
| type         | 自定义类前缀          | string        | `'text'` | `'number'`、`'password'`、`'textarea'` | 否    |
| defaultValue | 默认值             | string        |          |                         | 否    |
| value        | 输入值             | string        |          |                         | 否    |
| readOnly     | 是否只读            | bool          | `false`  |                         | 否    |
| disabled     | 是否禁用            | bool          | `false`  |                         | 否    |
| placeholder  | 原生placeholder文案 | string        | `''`     |                         | 否    |
| addonBefore  | 前置标签            | node          |          |                         | 否    |
| addonAfter   | 后置标签            | node          |          |                         | 否    |
| autoFocus    | 自动focus          | bool          |          |                         | 否    |
| onChange     | change事件        | func(e:Event) |          |                         | 否    |
| onPressEnter | 回车事件            | func(e:Event) |          |                         | 否    |

_除了以上属性外，所有react支持的input属性，Input组件都支持_

#### focus

`focus(): function`

手动聚焦到输入框

<style>
.zent-input-wrapper {
    width: 200px;
    margin-bottom: 20px;
}
</style>
