---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic Usage
---

```jsx
import { Pagination } from 'zent';

class Basic extends Component {
  state = {
    current: 1,
    totalItem: 1000
  }

  render() {
    return (
      <Pagination
        current={this.state.current}
        totalItem={this.state.totalItem}
        onChange={this.onChange}
        maxPageToShow={12}
      />
    );
  }

  onChange = (page) => {
    this.setState({
      current: page
    });
  };
}

ReactDOM.render(
  <Basic />
  , mountNode
);
```
