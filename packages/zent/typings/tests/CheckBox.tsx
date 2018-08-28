import * as React from 'react';
import { Checkbox } from '../';

const CheckboxGroup = Checkbox.Group;

interface State {
  checked: boolean;
  checkedList: string[];
}

class App extends React.PureComponent<null, State> {
  constructor(props, context) {
    super(props. context);
    this.state = {
      checked: true,
      checkedList: [],
    }
  }

  handleChange = (e) => {
    this.setState({
      checked: e.target.checked
    })
  }

  onChange = (checkedList) => {
    this.setState({ checkedList });
  }

  render() {
    const { checked, checkedList } = this.state
    const checkedAll = !!checkedList.length && (checkedList.length === 7)
    const indeterminate = !!checkedList.length && (checkedList.length !== 7)
    return (
      <div>
        <Checkbox checked={checked} onChange={this.handleChange}>Checkbox</Checkbox>        
        <Checkbox checked disabled />
        <Checkbox disabled />
        <Checkbox
          checked={checkedAll}
          indeterminate={indeterminate}
        >全选</Checkbox>
        <CheckboxGroup value={checkedList} onChange={this.onChange}>
          <Checkbox value="Apple">苹果</Checkbox>
          <Checkbox value="Pear">梨子</Checkbox>
          <Checkbox value="Orange">橘子</Checkbox>
          <Checkbox value="OrangeDisabled" disabled>烂橘子</Checkbox>
        </CheckboxGroup>
      </div>
    )
  }
}

export default App
