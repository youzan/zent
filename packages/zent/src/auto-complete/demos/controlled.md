---
order: 2
zh-CN:
	title: 受控组件
	content: 自动补全作为受控组件
en-US:
	title: Controlled Component
	content: AutoComplete As Controlled Component
---

```js
import { AutoComplete } from 'zent';

class ControlledComplete extends Component {
  state = {
    value: 'controlled',
    data: [ 'controlled', 'controlledcontrolled', 'controlledcontrolledcontrolled'],
  }
  
  onSelect = (v) => console.log('onSelect', v)
  onSearch = (v) => {
    this.setState({
      data: v ? [ {
        value: v,
        content: v,
      }, {
        value: v + v,
        content: v + v,
      }, {
        value: v + v + v,
        content: v + v + v,
      }] : [],
    })
  }
  onChange = (v) => {
    console.log('onChange', v)
    this.setState({
      value: v
    });
  }
  
  render() {
    return (
      <AutoComplete 
        value={this.state.value}
        data={this.state.data} 
        onSelect={this.onSelect} 
        onSearch={this.onSearch} 
        onChange={this.onChange}
      />
    );
  }
}

ReactDOM.render(
  <div>
      <ControlledComplete />
  </div>,
  mountNode
);
```
