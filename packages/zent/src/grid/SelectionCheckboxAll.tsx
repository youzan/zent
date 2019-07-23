import * as React from 'react';
import { PureComponent } from 'react';
import size from 'lodash-es/size';
import every from 'lodash-es/every';
import some from 'lodash-es/some';
import includes from 'lodash-es/includes';
import Checkbox, { ICheckboxProps } from '../checkbox';
import Store from './Store';

export interface IGridSelctionAllCheckboxProps<Data> {
  store: Store;
  datasets: Data[];
  getDataKey: (data: Data, rowIndex: number | string) => string;
  disabled: boolean;
  onSelect: (type: 'selectAll' | 'removeAll', datasets: Data[]) => void;
}

interface IGridSelctionAllCheckboxState {
  checked: boolean;
  indeterminate: boolean;
}

class SelectionCheckboxAll<Data> extends PureComponent<
  IGridSelctionAllCheckboxProps<Data>,
  IGridSelctionAllCheckboxState
> {
  constructor(props: IGridSelctionAllCheckboxProps<Data>) {
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

  getCheckBoxState = (props: IGridSelctionAllCheckboxProps<Data>, type) => {
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

  getCheckState = (props: IGridSelctionAllCheckboxProps<Data>) => {
    return this.getCheckBoxState(props, 'every');
  };

  getIndeterminateState = (props: IGridSelctionAllCheckboxProps<Data>) => {
    return this.getCheckBoxState(props, 'some');
  };

  setCheckState = (props: IGridSelctionAllCheckboxProps<Data>) => {
    const checked = this.getCheckState(props);
    const indeterminate = this.getIndeterminateState(props);

    this.setState({
      checked,
      indeterminate,
    });
  };

  onChange: ICheckboxProps<unknown>['onChange'] = e => {
    const { datasets } = this.props;
    const checked = e.target.checked;
    this.props.onSelect(checked ? 'selectAll' : 'removeAll', datasets);
  };

  componentDidMount() {
    this.subscribe();
  }

  componentWillReceiveProps(nextProps: IGridSelctionAllCheckboxProps<Data>) {
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
