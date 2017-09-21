import React, { PureComponent, Component } from 'react';
import Checkbox from 'checkbox';
import size from 'lodash/size';
import every from 'lodash/every';
import some from 'lodash/some';
import includes from 'lodash/includes';

class SelectionCheckboxAll extends (PureComponent || Component) {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.getCheckState(props),
      indeterminate: this.getIndeterminateState(props)
    };
  }

  subscribe = () => {
    const { store } = this.props;
    this.unsubscribe = store.subscribe('selectedRowKeys', () => {
      this.setCheckState(this.props);
    });
  };

  getCheckBoxState = (props, type) => {
    const { datasets, store, getDataKey } = props;
    let state;
    let func = type === 'every' ? every : some;

    if (size(datasets) === 0) {
      state = false;
    } else {
      const selectedRowKeys = store.getState('selectedRowKeys');
      state = func(datasets, (data, index) =>
        includes(selectedRowKeys, getDataKey(data, index))
      );
    }
    return state;
  };

  getCheckState = props => {
    return this.getCheckBoxState(props, 'every');
  };

  getIndeterminateState = props => {
    return this.getCheckBoxState(props, 'some');
  };

  setCheckState = props => {
    const checked = this.getCheckState(props);
    const indeterminate = this.getIndeterminateState(props);

    if (checked !== this.state.checked) {
      this.setState({ checked });
    }
    if (indeterminate !== this.state.indeterminate) {
      this.setState({ indeterminate });
    }
  };

  onChange = e => {
    const { datasets } = this.props;
    let checked = e.target.checked;
    this.props.onSelect(checked ? 'selectAll' : 'removeAll', datasets);
  };

  componentDidMount() {
    this.subscribe();
  }

  componentWillReceiveProps(nextProps) {
    this.setCheckState(nextProps);
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  render() {
    const { checked, indeterminate } = this.state;
    const { disabled } = this.props;

    const props = {
      checked,
      indeterminate: indeterminate && checked ? false : indeterminate
    };

    return <Checkbox {...props} onChange={this.onChange} disabled={disabled} />;
  }
}

export default SelectionCheckboxAll;
