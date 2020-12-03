import { PureComponent } from 'react';
import Checkbox, { ICheckboxProps } from '../checkbox';
import Store from './Store';

export interface IGridSelectionAllCheckboxProps<Data> {
  store: Store;
  datasets: ReadonlyArray<Data>;
  getDataKey: (data: Data, rowIndex: number | string) => string;
  disabled: boolean;
  onSelect: (
    type: 'selectAll' | 'removeAll',
    datasets: ReadonlyArray<Data>
  ) => void;
}

interface IGridSelectionAllCheckboxState {
  checked: boolean;
  indeterminate: boolean;
}

class SelectionCheckboxAll<Data> extends PureComponent<
  IGridSelectionAllCheckboxProps<Data>,
  IGridSelectionAllCheckboxState
> {
  constructor(props: IGridSelectionAllCheckboxProps<Data>) {
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

  getCheckBoxState = (props: IGridSelectionAllCheckboxProps<Data>, type) => {
    const { datasets, store, getDataKey } = props;
    let state;

    if (!datasets || datasets.length === 0) {
      state = false;
    } else {
      const selectedRowKeys = store.getState('selectedRowKeys') ?? [];
      if (type === 'every') {
        state = datasets.every(
          (data, index) =>
            selectedRowKeys.indexOf(getDataKey(data, index)) !== -1
        );
      } else {
        state = datasets.some(
          (data, index) =>
            selectedRowKeys.indexOf(getDataKey(data, index)) !== -1
        );
      }
    }
    return state;
  };

  getCheckState = (props: IGridSelectionAllCheckboxProps<Data>) => {
    return this.getCheckBoxState(props, 'every');
  };

  getIndeterminateState = (props: IGridSelectionAllCheckboxProps<Data>) => {
    return this.getCheckBoxState(props, 'some');
  };

  setCheckState = (props: IGridSelectionAllCheckboxProps<Data>) => {
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

  // 等重构再删了吧，改不动
  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps: IGridSelectionAllCheckboxProps<Data>) {
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
