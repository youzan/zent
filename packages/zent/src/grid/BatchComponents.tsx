import * as React from 'react';
import { PureComponent } from 'react';
import classnames from 'classnames';
import { I18nReceiver as Receiver } from '../i18n';
import SelectionCheckboxAll from './SelectionCheckboxAll';
import Store from './Store';
import { IGridBatchRender } from './types';

export interface IBatchComponentsProps<Data = any> {
  batchRender: IGridBatchRender;
  prefix: string;
  onSelect: (type: string, datasets: Data[]) => void;
  store: Store;
  datasets: Data[];
  getDataKey: (data: Data, rowIndex: string | number) => string;
  selectedRows?: Data[];
  disabled?: boolean;
  batchRenderFixed: boolean;
  style?: React.CSSProperties;
}

class BatchComponents<Data> extends PureComponent<IBatchComponentsProps<Data>> {
  static defaultProps = {
    selectedRows: [],
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
      batchRenderFixed,
      batchRender,
    } = this.props;
    const className = classnames(`${prefix}-grid-tfoot-batch`, {
      [`${prefix}-grid-tfoot__batchcomponents--fixed`]: batchRenderFixed,
    });
    return (
      <Receiver componentName="BatchComponents">
        {i18n => (
          <div className={className} style={this.props.style}>
            <SelectionCheckboxAll
              getDataKey={getDataKey}
              onSelect={onSelect}
              store={store}
              disabled={disabled}
              datasets={datasets}
            />
            <div className="batch-component-info">
              <span className="select-rows">
                {i18n.total}
                {selectedRows.length}
                {i18n.items}
              </span>
              <span>{i18n.desc}</span>
            </div>
            {batchRender && batchRender(this.props.selectedRows)}
          </div>
        )}
      </Receiver>
    );
  }
}

export default BatchComponents;
