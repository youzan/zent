import React from 'react';
import Checkbox from 'checkbox';
import includes from 'lodash/includes';

class SelectionCheckbox extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.getCheckState(props)
    };
  }

  subscribe() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe('selectedRowKeys', () => {
      const checked = this.getCheckState(this.props);
      this.setState({ checked });
    });
  }

  getCheckState = props => {
    const { store, rowIndex } = props;
    return includes(store.getState('selectedRowKeys'), rowIndex);
  };

  componentDidMount() {
    this.subscribe();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { onChange } = this.props;
    const { checked } = this.state;
    return <Checkbox onChange={onChange} checked={checked} />;
  }
}

export default SelectionCheckbox;
