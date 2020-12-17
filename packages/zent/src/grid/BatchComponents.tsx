import { PureComponent } from 'react';
import classnames from 'classnames';
import SelectionCheckboxAll from './SelectionCheckboxAll';
import Store from './Store';
import { IGridBatchRender, IGridSelection } from './types';
import uniq from '../utils/uniq';

export interface IBatchComponentsProps<Data = any> {
  batchRender: IGridBatchRender;
  prefix: string;
  position: 'header' | 'foot';
  onSelect: (type: string, datasets: ReadonlyArray<Data>) => void;
  store: Store;
  datasets: ReadonlyArray<Data>;
  getDataKey: (data: Data, rowIndex: string | number) => string;
  selection: IGridSelection;
  checkboxPropsCache: {
    [key: string]: {
      disabled?: boolean;
    };
  };
  rowKey: string;
}

interface IState<Data> {
  selectedRows: Data[];
  batchNeedRenderFixed: boolean;
}

class BatchComponents<Data> extends PureComponent<
  IBatchComponentsProps<Data>,
  IState<Data>
> {
  state: IState<Data> = {
    selectedRows: [],
    batchNeedRenderFixed: false,
  };

  unsubscribe: any;

  unsubscribeBatchRenderFixed: any;

  getCheckboxPropsByItem = (data: Data, rowIndex: number | string) => {
    const { selection, checkboxPropsCache } = this.props;

    if (!selection || !selection.getCheckboxProps) {
      return {};
    }

    if (!checkboxPropsCache[rowIndex]) {
      checkboxPropsCache[rowIndex] = selection.getCheckboxProps(data);
    }
    return checkboxPropsCache[rowIndex] || {};
  };

  getData = () => {
    const { datasets, getDataKey, selection } = this.props;
    if (!selection) {
      return datasets;
    }
    return (datasets || []).filter((item, index) => {
      const rowIndex = getDataKey(item, index);

      if (selection.getCheckboxProps) {
        return !this.getCheckboxPropsByItem(item, rowIndex).disabled;
      }
      return true;
    });
  };

  getCheckboxAllDisabled = () => {
    const { getDataKey, datasets } = this.props;
    return datasets.every((item, index) => {
      const rowIndex = getDataKey(item, index);
      return this.getCheckboxPropsByItem(item, rowIndex).disabled;
    });
  };

  getSelectedRows = () => {
    const { store } = this.props;
    const selectedRowKeys = store.getState('selectedRowKeys') || [];
    const prevSelectedRows = store.getState('selectedRows') || [];
    const { datasets, getDataKey, rowKey } = this.props;
    const selectedRows = (
      uniq(datasets.concat(prevSelectedRows), rowKey) || []
    ).filter((row, i) => selectedRowKeys.indexOf(getDataKey(row, i)) > -1);
    store.setState({
      selectedRows,
    });
    return selectedRows;
  };

  subscribe = () => {
    const { store } = this.props;
    this.unsubscribe = store.subscribe('selectedRowKeys', () => {
      store.setState({
        selectedRows: this.getSelectedRows(),
      });
    });

    this.unsubscribeBatchRenderFixed = store.subscribe(
      'batchRenderFixed',
      () => {
        const selectedRows = store.getState('selectedRows') || [];
        this.setState({
          batchNeedRenderFixed:
            store.getState('batchRenderFixed') && selectedRows.length > 0,
        });
      }
    );
  };

  componentDidMount() {
    this.props.store.setState({
      selectedRows: this.getSelectedRows(),
    });
    this.subscribe();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    if (this.unsubscribeBatchRenderFixed) {
      this.unsubscribeBatchRenderFixed();
    }
  }

  render() {
    const {
      prefix,
      onSelect,
      store,
      getDataKey,
      batchRender,
      selection,
      position,
    } = this.props;
    const selectedRows = store.getState('selectedRows') || [];
    const { batchNeedRenderFixed } = this.state;
    const batchRenderFixedStyles = store.getState('batchRenderFixedStyles');
    const className = classnames(
      `${prefix}-grid-batch`,
      `${prefix}-grid-batch__${position}`,
      {
        [`${prefix}-grid-batch--fixed`]:
          batchNeedRenderFixed && position === 'foot',
      }
    );

    const data = this.getData();
    const disabled = this.getCheckboxAllDisabled();
    const styles = batchNeedRenderFixed ? batchRenderFixedStyles : {};
    if (selection && batchRender) {
      return (
        <div className={className} style={styles}>
          <SelectionCheckboxAll
            getDataKey={getDataKey}
            onSelect={onSelect}
            store={store}
            disabled={disabled}
            datasets={data}
          />
          {batchRender && batchRender(selectedRows, position)}
        </div>
      );
    }
    return null;
  }
}

export default BatchComponents;
