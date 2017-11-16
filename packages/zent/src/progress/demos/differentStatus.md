---
order: 4
zh-CN:
	title: 支持不同状态
en-US:
	title: Support different status
---
```jsx
import { Progress, Slider } from 'zent';

class App extends Component {
  render() {
    return (
      <div>
        <Progress percent={70} status="success"/>
        <Progress percent={80} status="exception"/>
        <Progress type="circle" percent={70} status="success"/>
        <Progress type="circle" percent={80} status="exception"/>
      </div>
    );
  }
}

ReactDOM.render(
  <App />
  , mountNode
);
```
