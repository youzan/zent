---
order: 0
zh-CN: '通过 offsetTop 设置到顶部距离'
en-US: 'offsetTop'
---


```js
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
