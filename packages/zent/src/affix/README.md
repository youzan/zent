## Affix 固钉

将元素固定在特定区域，一般用于导航栏固钉。

### 代码演示

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
      <Affix offsetTop={135}>
        <Button type="primary" size="large">固钉</Button>
      </Affix>
    </Col>
  </Row>
  , mountNode
)
```
:::


:::demo 设置回调函数
```jsx
import { Affix, Alert } from 'zent';

class App extends React.Component {

  state = {
    text: '固钉'
  }

  onPin = () => {
    this.setState({ text: '已经固定啦' });
  }
  onUnpin = () => {
    this.setState({ text: '取消固定啦' });
  }

  render() {
    return (
      <Affix offsetTop={200} onPin={this.onPin} onUnpin={this.onUnpin}>
          <Alert type="warning">{this.state.text}</Alert>
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


:::demo 设置距离底部值: `offsetBottom`
```jsx
import { Affix, Alert } from 'zent';

ReactDOM.render(
  <div className="demo-bottom">
      <Affix offsetBottom={60}>
        <Alert type="warning"><p>设置距离底部值</p></Alert>
      </Affix>
    </div>
  , mountNode
);
```
:::

### API



| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| offsetTop | 距离窗口顶部指定偏移量后触发 | number | 0 | '' |
| offsetBottom | 距离窗口底部指定偏移量后触发 | number | null | null |
| onPin | 触发固定后执行的回调函数 | function | null | null |
| onUnpin | 固定消失后执行的回调函数 | function | null | null |
| zIndex | 固钉的z-index | number | 10 | null |
| className | 自定义额外类名  | string | `''`       |                                   |
| placeHoldClassName | 占位容器的类名  | string | `''`       |                                   |
| prefix    | 自定义前缀    | string | `'zent'`   |                                   |

如果 `offsetTop` 和 `offsetBottom` 同时设置，优先使用 `offsetBottom`

<style>
.demo-nav {
    width: 100%;
    height: 60px;
    background-color: #ededed;
    line-height: 60px;
    text-align: center;
    border: 1px solid #2B90ED;
}

.demo-bottom {
	opacity: 0.8;
}
</style>
