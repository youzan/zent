---
order: 3
zh-CN:
	title: 高级菜单项
	content: 高级菜单项配置
en-US:
	title: Advanced Menu Item Configs
	content: Advanced Menu Item Configs
---

```js
import { AutoComplete } from 'zent';

class ControlledComplete extends Component {
  state = {
    value: '',
    data: []
  }
  
  data = [
    { isGroup: true, content: '浙江' },
    { value: 'hz', content: '杭州' },
    '绍兴',
    '温州',
    '金华',
    { isDivider: true },
    { isGroup: true, content: '江苏' },
    '南京',
    '苏州',
    '无锡',
    '常州',
  ]
  
  onSelect = (v) => console.log('onSelect', v)
  onSearch = (v) => console.log('onSearch', v)
  onChange = (v) => {
    console.log('onChange', v)
    this.setState({
      value: v
    });
  }
  
  render() {
    return (
      <AutoComplete 
        placeholder="输入值不受限..."
        value={this.state.value}
        data={this.data} 
        onSelect={this.onSelect} 
        onSearch={this.onSearch} 
        onChange={this.onChange}
      />
    );
  }
}

class SelectComplete extends Component {
  state = {
    value: '',
    data: []
  }
  
  data = [
    { isGroup: true, content: '浙江' },
    { value: 'hz', content: '杭州' },
    { value: '绍兴', content: <div><div>绍!兴!</div><div>这是第二行</div></div> },
    '温州',
    '金华',
    { isDivider: true },
    { isGroup: true, content: '江苏' },
    '南京',
    '苏州',
    '无锡',
    '常州',
  ]
  
  onSelect = (v) => console.log('onSelect', v)
  onSearch = (v) => console.log('onSearch', v)
  onChange = (v) => {
    console.log('onChange', v)
    this.setState({
      value: v
    });
  }
  
  render() {
    return (
      <AutoComplete 
        placeholder="输入值受限..."
        value={this.state.value}
        data={this.data} 
        onSelect={this.onSelect} 
        onSearch={this.onSearch} 
        onChange={this.onChange}
        valueFromOptions
      />
    );
  }
}


ReactDOM.render(
  <div>
    <div>
        <div style={{ display: 'inline-block', margin: '5px 0' }}>输入值不受限：</div>
        <ControlledComplete />
    </div>
    <div style={{ marginTop: '5px' }}>
        <div style={{ display: 'inline-block', margin: '5px 0' }}>输入值必须来自于选项：</div>
        <SelectComplete />
    </div>
  </div>,
  mountNode
);
```
