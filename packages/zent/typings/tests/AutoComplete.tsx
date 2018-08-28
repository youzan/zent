import * as React from 'react';
import { AutoComplete } from '../';

interface State {
  value: string
}

class ControlledComplete extends React.Component<null, State> {
    state = {
      value: '',
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
    ] as zent.IMenuItem[]
  
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
  
  class SelectComplete extends React.Component<null, State> {
    state = {
      value: '',
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
    ] as zent.IMenuItem[]
  
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
