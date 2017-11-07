---
order: 3
zh-CN:
	title: 海量页数
en-US:
	title: Great amount of pages
---

```jsx
import { Pagination } from 'zent';

class HugeTotal extends Component {
  state = {
    current: 1321,
    totalItem: 10000000000000,
    pageSize: 10
  }

  render() {
    return (
      <Pagination
        current={this.state.current}
        totalItem={this.state.totalItem}
        pageSize={this.state.pageSize}
        onChange={this.onChange}
      />
    );
  }

  onChange = (page) => {
    this.setState({
      current: page
    });
  }
}

ReactDOM.render(
  <HugeTotal />
  , mountNode
);
```
