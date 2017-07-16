## SearchInput 搜索框组件

搜索框

### 使用场景

需要输入搜索内容的场景

### 代码演示

:::demo 基本用法
```jsx
import { SearchInput, Notify } from 'zent';

class SearchInputExample extends Component {
  state = {
    value: ''
  };

  onChange = evt => {
    this.setState({
      value: evt.target.value
    });
  };

  onPressEnter = () => {
    const { value } = this.state;

    if (value) {
      Notify.success(`你输入了: ${value}`);
    } else {
      Notify.error('请输入搜索内容');
    }
  }

  render() {
    const { value } = this.state;
    return (
      <SearchInput
        value={value}
        onChange={this.onChange}
        placeholder="搜索"
        onPressEnter={this.onPressEnter}
      />
    );
  }
}

ReactDOM.render(
  <SearchInputExample />,
  mountNode
);
```
:::

### API

API 和 [Input 组件](input)一致，但是不支持 `type` 参数。
