import { PureComponent } from 'react';
import Checkbox, { ICheckboxProps } from '../checkbox';
import Store from './Store';

export interface IGridSelectionAllCheckboxProps<Data> {
  store: Store;
  /**
   * Only includes non-disabled rows
   */
  datasets: ReadonlyArray<Data>;

  /**
   * Only includes disabled rows.
   *
   * These are split into two arrays because of historical reasons.
   * It only affects non-disabled rows when select-all checkbox is checked/unchecked.
   */
  disabledDatasets: ReadonlyArray<Data>;

  getDataKey: (data: Data, rowIndex: number | string) => string;
  disabled: boolean;
  onSelect: (
    type: 'selectAll' | 'removeAll',
    /**
     * Only includes non-disabled rows because we cannot toggle disabled rows.
     */
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

  getCheckBoxState = (
    props: IGridSelectionAllCheckboxProps<Data>,
    type: 'every' | 'some'
  ) => {
    const { datasets, disabledDatasets, store, getDataKey } = props;
    // Use `datasets` if it's non empty, otherwise use `disabledDatasets`
    const activeDatasets = datasets?.length ? datasets : disabledDatasets;
    const selectedRowKeys = store.getState('selectedRowKeys') ?? [];

    if (selectedRowKeys.length === 0) return false;

    if (type === 'every') {
      return activeDatasets.every(
        (data, index) => selectedRowKeys.indexOf(getDataKey(data, index)) !== -1
      );
    }

    return activeDatasets.some(
      (data, index) => selectedRowKeys.indexOf(getDataKey(data, index)) !== -1
    );
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
