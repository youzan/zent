---
order: 5
zh-CN:
	title: 事件处理
en-US:
	title: Event handler
---

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
        <Input onPressEnter={this.onPressEnter} placeholder="Press Enter"/>
        <Input onKeyDown={this.onKeyDown} placeholder="Key down"/>
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
