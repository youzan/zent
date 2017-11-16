---
order: 1
zh-CN:
	title: 基础用法
	place: 搜索
	suc: 您输入了
	err: 请输入搜索内容
en-US:
	title: Basic Usage
	place: Search
	suc: Your enter content
	err: Please input search content
---

```js
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
      Notify.success(`{i18n.suc}: ${value}`);
    } else {
      Notify.error('{i18n.err}');
    }
  }

  render() {
    const { value } = this.state;
    return (
      <SearchInput
        value={value}
        onChange={this.onChange}
        placeholder="{i18n.place}"
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
