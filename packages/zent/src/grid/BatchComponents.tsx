import * as React from 'react';
import { PureComponent } from 'react';
import SelectionCheckboxAll from './SelectionCheckboxAll';
import { isReactComponent } from './utils';
import Store from './Store';

export interface IBatchComponentsProps<Data = any> {
  batchComponents: React.ReactNode[];
  prefix: string;
  onSelect: (type: string, datasets: Data[]) => void;
  store: Store;
  datasets: Data[];
  getDataKey: (data: Data, rowIndex: string | number) => string;
  selectedRows?: Data[];
  disabled?: boolean;
}

class BatchComponents<Data> extends PureComponent<IBatchComponentsProps<Data>> {
  static defaultProps = {
    selectedRows: [],
  };

  batchComponentWrapper = (
    comp: React.ElementType | React.FC,
    index: number
  ) => {
    const { selectedRows } = this.props;
    let subComponents: React.ReactNode;
    if (isReactComponent(comp) || typeof comp === 'function') {
      const Comp = comp;
      subComponents = <Comp data={selectedRows} />;
    } else {
      subComponents = comp;
    }
    return (
      <div className="batch-component" key={index}>
        {subComponents}
      </div>
    );
  };

  renderComponents = () => {
    const { batchComponents } = this.props;
    return batchComponents.map(this.batchComponentWrapper);
  };

  render() {
    const {
      prefix,
      onSelect,
      store,
      getDataKey,
      selectedRows,
      datasets,
      disabled,
    } = this.props;
    return (
      <div className={`${prefix}-grid-tfoot-batch`}>
        <SelectionCheckboxAll
          getDataKey={getDataKey}
          onSelect={onSelect}
          store={store}
          disabled={disabled}
          datasets={datasets}
        />
        <div className="batch-component-info">
          <span className="select-rows">共{selectedRows.length}项</span>
          <span>批量操作</span>
        </div>
        {this.renderComponents()}
      </div>
    );
  }
}

export default BatchComponents;
