import React, { Component } from 'react';
import Checkbox from '../src';
import '../assets/index.scss';

/*
## 部分选中
*/

export default class Simple extends Component {

  state = {
    allChecked: false,
    itemsChecked: [false, false, false]
  }

  onAllChange(e) {
    let checked = e.target.checked;

    this.setState({
      allChecked: checked,
      itemsChecked: [checked, checked, checked]
    });
  }

  onItemsChange(index, e) {
    const checked = e.target.checked;
    const itemsChecked = this.state.itemsChecked;
    itemsChecked[index] = checked;

    this.setState({
      itemsChecked: Array.from(itemsChecked)
    });

    if (this.everyItemsCheckedOrUnchecked()) {
      this.setState({
        allChecked: checked
      });
    }
  }

  // 项目是否全部选中或者全部没有选中
  everyItemsCheckedOrUnchecked() {
    const itemsChecked = this.state.itemsChecked;
    return itemsChecked.every(item => item) || itemsChecked.every(item => !item);
  }

  render() {
    const indeterminate = !this.everyItemsCheckedOrUnchecked();
    return (
      <div>
        <Checkbox
          checked={this.state.allChecked}
          onChange={this.onAllChange.bind(this)}
          indeterminate={indeterminate}
        >
          全选
        </Checkbox>
        <ul>
          <li>
            <Checkbox
              checked={this.state.itemsChecked[0]}
              onChange={this.onItemsChange.bind(this, 0)}
            >
              Item 0
            </Checkbox>
          </li>
          <li>
            <Checkbox
              checked={this.state.itemsChecked[1]}
              onChange={this.onItemsChange.bind(this, 1)}
            >
              Item 1
            </Checkbox>
          </li>
          <li>
            <Checkbox
              checked={this.state.itemsChecked[2]}
              onChange={this.onItemsChange.bind(this, 2)}
            >
              Item 2
            </Checkbox>
          </li>
        </ul>
      </div>
    );
  }
}
