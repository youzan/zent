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
    log: ''
  };

  onChange(ev) {
    this.setState({ log: ev.target.value });
  }

  setToThree= (ev) => {
    this.setState({ log: 3 });
  }

  render() {
    return (
      <div>
        <NumberInput
          showStepper
          value={this.state.log}
          onChange={this.onChange.bind(this)} 
          onPressEnter={() => console.log('pressed enter')}/>
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
