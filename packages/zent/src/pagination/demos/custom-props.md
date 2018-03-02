---
order: 4
zh-CN:
	title: 动态自定义组件 props
en-US:
	title: Dynamically customize props of the component
---

```jsx
import { Pagination, Input } from 'zent';

class Custom extends Component {
  state = {
    current: 1,
    pageSize: 10,
    totalItem: 1000,
    max: 100
  }

  render() {
    return (
      <div>
        <form className="zent-form zent-form--horizontal">
          <div className="zent-form__control-group zent-pager-control-group">
            <label className="zent-form__control-label">totalItem: </label>
            <Input
							className="zent-pager-input"
							type="text"
							placeholder="数字"
							value={this.state.totalItem}
							onChange={this.onTotalChange} 
						/>
          </div>
          <div className="zent-form__control-group zent-pager-control-group">
            <label className="zent-form__control-label">pageSize:</label>
            <Input
							className="zent-pager-input"
							type="text"
							placeholder="数字"
							value={this.state.pageSize}
							onChange={this.onPageSizeChange}
						/>
          </div>
          <div className="zent-form__control-group zent-pager-control-group">
            <label className="zent-form__control-label">current:</label>
            <Input
							className="zent-pager-input"
							type="text"
							placeholder="数字"
							value={this.state.current}
							onChange={this.onCurrentChange}
						/>
          </div>
          <div className="zent-form__control-group zent-pager-control-group">
            <label className="zent-form__control-label">maxPageToShow:</label>
            <Input
							className="zent-pager-input"
							type="text"
							placeholder="数字"
							value={this.state.max}
							onChange={this.onMaxChange}
						/>
          </div>
        </form>
        <Pagination
          current={this.state.current}
          totalItem={this.state.totalItem}
          pageSize={this.state.pageSize}
          maxPageToShow={this.state.max}
          onChange={this.onChange}
        />
      </div>
    );
  }

  onChange = (page) => {
    this.setState({
      current: page
    });
  };

  onTotalChange = (e) => {
    let str = e.target.value.trim();
    let value;

    if (/^\d+$/.test(str)) {
      value = +str;
    } else {
      value = 0;
    }

    this.setState({
      totalItem: value
    });
  };

  onPageSizeChange = (e) => {
    let str = e.target.value.trim();
    let value;

    if (/^\d+$/.test(str)) {
      value = +str;
    } else {
      value = 0;
    }

    this.setState({
      pageSize: value
    });
  };

  onCurrentChange = (e) => {
    let str = e.target.value.trim();
    let value;

    if (/^\d+$/.test(str)) {
      value = +str;
    } else {
      value = 0;
    }

    this.setState({
      current: value
    });
  }

  onMaxChange = (e) => {
    let str = e.target.value.trim();
    let value;

    if (/^\d+$/.test(str)) {
      value = +str;
    } else {
      value = 0;
    }

    this.setState({
      max: value
    });
  }
}

ReactDOM.render(
  <Custom />
  , mountNode
);
```

<style>
.zent-pager-control-group {
	display: flex;
	
	.zent-pager-input {
		margin-left: 10px;
		width: 200px;
	}
}

</style>
