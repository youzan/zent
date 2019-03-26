import * as React from 'react';
import { PureComponent } from 'react';
import size from 'lodash-es/size';
import every from 'lodash-es/every';
import some from 'lodash-es/some';
import includes from 'lodash-es/includes';
import Checkbox from '../checkbox';

class SelectionCheckboxAll extends PureComponent<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      checked: this.getCheckState(props),
      indeterminate: this.getIndeterminateState(props),
    };
  }

  unsubscribe: any;

  subscribe = () => {
    const { store } = this.props;
    this.unsubscribe = store.subscribe('selectedRowKeys', () => {
      this.setCheckState(this.props);
    });
  };

  getCheckBoxState = (props, type) => {
    const { datasets, store, getDataKey } = props;
    let state;
    const func = type === 'every' ? every : some;

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

    this.setState({
      checked,
      indeterminate,
    });
  };

  onChange = e => {
    const { datasets } = this.props;
    const checked = e.target.checked;
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
      indeterminate: indeterminate && checked ? false : indeterminate,
    };

    return <Checkbox {...props} onChange={this.onChange} disabled={disabled} />;
  }
}

export default SelectionCheckboxAll;
