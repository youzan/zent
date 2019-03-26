---
order: 3
zh-CN:
	title: 布局 
en-US:
	title: Layout
---

```js
import { Radio, Layout } from 'zent'

const RadioGroup = Radio.Group;
const { Row, Col } = Layout

class App extends React.Component {

	state = {
		value: 'A',
	}

	onChange = (e) => {
		this.setState({ value: e.target.value });
	}

	render() {
		return (
      <RadioGroup onChange={this.onChange} value={this.state.value} style={{ width: '100%' }}>
        <Row>
          <Col span={8}><Radio value="A">A</Radio></Col>
          <Col span={8}><Radio value="B">B</Radio></Col>
          <Col span={8}><Radio value="C">C</Radio></Col>
          <Col span={8}><Radio value="D">D</Radio></Col>
          <Col span={8}><Radio value="E">E</Radio></Col>
          <Col span={8}><Radio value="F">F</Radio></Col>
        </Row>
      </RadioGroup>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
