## Affix

The elements fixed in a specific area, generally used for navigation bar.

### Code demo

:::demo Set the offset from top: `offsetTop`
```jsx
import { Affix, Layout, Button } from 'zent';

const { Row, Col } = Layout;
ReactDOM.render(
  <Row style={{ margin: '10px 0' }}>
    <Col span={8}>
      <Button type="primary" size="large">Home</Button>
    </Col>
    <Col span={8} offset={8}>
      <Affix offsetTop={135}>
        <Button type="primary" size="large">Affix</Button>
      </Affix>
    </Col>
  </Row>
  , mountNode
)
```
:::

:::demo Set the callback function
```jsx
import { Affix, Alert } from 'zent';

class App extends React.Component {

  state = {
    text: 'Affix'
  }

  onPin = () => {
    this.setState({ text: 'Fixed' });
  }
  onUnpin = () => {
    this.setState({ text: 'Cancel Fixed!' });
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

:::demo Set the offset from bottom: `offsetBottom`
```jsx
import { Affix, Alert } from 'zent';

ReactDOM.render(
  <div className="demo-bottom">
      <Affix offsetBottom={60}>
        <Alert type="warning"><p>Set the offset from bottom</p></Alert>
      </Affix>
    </div>
  , mountNode
);
```
:::

### API

| Property | Description | Type | Default | Alternative |
|------|------|------|--------|--------|
| offsetTop | Pixels to offset from top when calculating position of scroll | number | 0 | '' |
| offsetBottom | Pixels to offset from bottom when calculating position of scroll | number | null | null |
| onPin | Callback when affix state is changed | function | null | null |
| onUnpin | Callback when affix state is cancelled | function | null | null |
| zIndex | The z-index of Affix | number | 10 | null |
| className | The name of the customized additional class | string | `''` |                                   |
| placeHoldClassName | The class name of container | string | `''` |                                   |
| prefix | The customized prefix | string | `'zent'` |                              |

Use the `offsetBottom` firstly if `offsetTop` and `offsetBottom` are set at the same time.

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
