## Card 卡片

卡片 在卡片容器内展示信息

### 使用指南

-   通过`title`来控制是否显示标题
-   通过`action`来提供交互操作
-   通过`bodyStyle`来自定义内容样式

### 代码演示

:::demo 基础用法
```jsx
import { Card } from 'zent';

ReactDOM.render(
	<Card style={{ width: 400 }}>
        <p>card item</p>
    </Card>
	, mountNode
);
```
:::

:::demo 带标题的卡片
```jsx
import { Card } from 'zent';

ReactDOM.render(
    <Card style={{ width: 400 }} title="card title">
        <p>card item</p>
        <p>card item</p>
    </Card>
    , mountNode
)
```
:::

:::demo 带有交互的卡片
```jsx
import { Card } from 'zent';

ReactDOM.render(
    <Card style={{ width: 400 }} 
        title="card title"
        action={<a target="_blank" href="//youzan.com">有赞</a>}>
        <p>card item</p>
    </Card>
    , mountNode
)
```
:::

:::demo 自定义内容样式
```jsx
import { Card } from 'zent';

ReactDOM.render(
    <Card style={{ width: 400 }} bodyStyle={{ background: '#eee'}}>
        <p>card item</p>
    </Card>
    , mountNode
)
```
:::