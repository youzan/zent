## Affix 固钉

将元素固定在特定区域，一般用于导航栏固钉。

### 代码演示

:::demo 基础用法
```jsx
import { Affix, Button } from 'zent';

ReactDOM.render(
  <Affix>
    <Button type="primary" size="large">固钉</Button>
  </Affix>
  , mountNode
);
```
:::

:::demo 设置距离顶部值: `offsetTop`
```jsx
import { Affix, Layout, Button } from 'zent';

const { Row, Col } = Layout;
ReactDOM.render(
  <Row style={{ margin: '10px 0' }}>
    <Col span={8}>
      <Button type="primary" size="large">首页</Button>
    </Col>
    <Col span={8} offset={8}>
      <Affix offsetTop={50}>
        <Button type="primary" size="large">固钉</Button>
      </Affix>
    </Col>
  </Row>
  , mountNode
)
```
:::


:::demo 设置距离底部值: `offsetBottom`
```jsx
import { Affix, Layout } from 'zent';

const { Row, Col } = Layout;
ReactDOM.render(
  <div className="demo-bottom">
      <Affix offsetBottom={60}>
        <div className="demo-nav">
          <Row>
            <Col span={4}>首页</Col>
            <Col span={3} offset={8}>应用1</Col>
            <Col span={3}>应用2</Col>
            <Col span={3}>应用3</Col>
            <Col span={3}>应用4</Col>
          </Row>
        </div>
      </Affix>
    </div>
  , mountNode
);
```
:::

:::demo 设置回调函数
```jsx
import { Affix, Layout } from 'zent';

const { Row, Col } = Layout;

class App extends React.Component {

  state = {
    text: '首页'
  }

  onFixed = () => {
    this.setState({ text: '首页固钉' });
    console.log('in');
  }
  outFixed = () => {
    console.log('out');
    this.setState({ text: '首页' });
  }

  render() {
    return (
      <Affix offsetTop={50} onFixed={this.onFixed} outFixed={this.outFixed}>
        <div className="demo-nav">
          <Row>
            <Col span={4}>{this.state.text}</Col>
            <Col span={3} offset={8}>应用1</Col>
            <Col span={3}>应用2</Col>
            <Col span={3}>应用3</Col>
            <Col span={3}>应用4</Col>
          </Row>
        </div>
      </Affix>
    )
  }
}

ReactDOM.render(
  <App />
  , mountNode
);
```
:::


### API



| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| offsetTop | 距离窗口顶部指定偏移量后触发 | number | 0 | '' |
| offsetBottom | 距离窗口底部指定偏移量后触发 | number | null | null |
| onFixed | 触发固定后执行的回调函数 | function | null | null |
| outFixed | 固定消失后执行的回调函数 | function | null | null |
| zIndex | 固钉的z-index | number | 10 | null |

如果 `offsetTop` 和 `offsetBottom` 同时设置，优先使用 `offsetBottom`

<style>
.demo-nav {
    width: 100%;
    height: 60px;
    background-color: #ededed;
    line-height: 60px;
    text-align: center;
}
</style>
