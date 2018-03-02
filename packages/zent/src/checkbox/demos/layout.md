---
order: 4
zh-CN:
	title: 布局
	apple: 苹果
	pear: 梨子
	orange: 橘子
	rottenOrange: 烂橘子
en-US:
	title: Checkbox group
	apple: apple
	pear: pear
	orange: orange
	rottenOrange: rotten orange
---

```jsx
import { Checkbox, Layout } from 'zent';
const CheckboxGroup = Checkbox.Group;
const { Row, Col } = Layout

class App extends React.Component {

	state = {
		checkedList: []
	}

	onChange = (checkedList) => {
		this.setState({ checkedList });
	}

	render() {
		const { checkedList } = this.state;

		return (
			<div>
        <CheckboxGroup value={checkedList} onChange={this.onChange}>
          <Row>
            <Col span={8}>
              <Checkbox value="A">A</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="B">B</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="C">C</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="D">D</Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox value="E">E</Checkbox>
            </Col>
          </Row>
				</CheckboxGroup>
			</div>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
