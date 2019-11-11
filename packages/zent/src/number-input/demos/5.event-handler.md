---
order: 5
zh-CN:
  title: 事件处理
  msg: 设置值为 3
en-US:
  title: Event handler
  msg: Set value to 3
---

```jsx
import { NumberInput, Button } from 'zent';

class EventTest extends React.Component {
  state = {
    value: ''
  };

  onChange = (value) => {
		console.log('onChange');
    this.setState({ value });
  }

  setToThree = () => {
		this.forceUpdate();
    // this.setState({ value: 3 });
	}
	
	onPressEnter = () => {
		console.log('pressed enter')
	}

  render() {
    return (
      <div>
        <NumberInput
          showStepper
          // value={this.state.value}
          onChange={this.onChange} 
          onPressEnter={this.onPressEnter}/>
        <Button onClick={this.setToThree}>{i18n.msg}</Button>
      </div>
    );
  }
}

ReactDOM.render(
  <EventTest />
  , mountNode
);
```
