import * as React from 'react';
import { PureComponent } from 'react';
import classnames from 'classnames';
import SelectionCheckboxAll from './SelectionCheckboxAll';
import Store from './Store';
import uniqBy from 'lodash-es/uniqBy';
import { IGridBatchRender, IGridSelection } from './types';

export interface IBatchComponentsProps<Data = any> {
  batchRender: IGridBatchRender;
  prefix: string;
  position: 'header' | 'foot';
  onSelect: (type: string, datasets: Data[]) => void;
  store: Store;
  datasets: Data[];
  getDataKey: (data: Data, rowIndex: string | number) => string;
  batchRenderFixed: boolean;
  style?: React.CSSProperties;
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
}

class BatchComponents<Data> extends PureComponent<
  IBatchComponentsProps<Data>,
  IState<Data>
> {
  state: IState<Data> = {
    selectedRows: [],
  };

  unsubscribe: any;

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
      uniqBy(datasets.concat(prevSelectedRows), rowKey) || []
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
  }

  render() {
    const {
      prefix,
      onSelect,
      store,
      getDataKey,
      batchRenderFixed,
      batchRender,
      selection,
      position,
    } = this.props;
    const selectedRows = store.getState('selectedRows');
    const className = classnames(
      `${prefix}-grid-batch`,
      `${prefix}-grid-batch__${position}`,
      {
        [`${prefix}-grid-batch--fixed`]:
          batchRenderFixed && position === 'foot',
      }
    );

    const data = this.getData();
    const disabled = this.getCheckboxAllDisabled();
    const styles = this.props.batchRenderFixed ? this.props.style : {};
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
          {batchRender && batchRender(selectedRows)}
        </div>
      );
    }
    return null;
  }
}

export default BatchComponents;
