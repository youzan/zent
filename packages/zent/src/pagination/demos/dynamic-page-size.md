---
order: 2
zh-CN:
	title: 动态 PageSize
en-US:
	title: Dynamic PageSize
---

```jsx
import { Pagination } from 'zent';

class Dynamic extends Component {
  state = {
    current: 1,
    totalItem: 1000
  };

  render() {
    return (
      <Pagination
        current={this.state.current}
        totalItem={this.state.totalItem}
        onChange={this.onChange}
        pageSize={[20, { value: 30, isCurrent: true }]}
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
  <Dynamic />
  , mountNode
);
```
