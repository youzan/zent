import React, { PureComponent, Component } from 'react';
import Checkbox from 'checkbox';
import includes from 'lodash/includes';

class SelectionCheckbox extends (PureComponent || Component) {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.getCheckState(props)
    };
  }

  subscribe = () => {
    const { store } = this.props;
    this.unsubscribe = store.subscribe('selectedRowKeys', () => {
      const checked = this.getCheckState(this.props);
      if (this.state.checked !== checked) {
        this.setState({ checked });
      }
    });
  };

  getCheckState = props => {
    const { store, rowIndex } = props;
    return includes(store.getState('selectedRowKeys'), rowIndex);
  };

  componentDidMount() {
    this.subscribe();
  }

  componentWillReceiveProps(nextProps, nextState) {
    const checked = this.getCheckState(nextProps);
    if (checked !== nextState.checked) {
      this.setState({ checked });
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { onChange, disabled } = this.props;
    const { checked } = this.state;
    return (
      <Checkbox onChange={onChange} checked={checked} disabled={disabled} />
    );
  }
}

export default SelectionCheckbox;
