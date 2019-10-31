import * as React from 'react';
import { PureComponent } from 'react';
import classnames from 'classnames';
import { I18nReceiver as Receiver } from '../i18n';
import SelectionCheckboxAll from './SelectionCheckboxAll';
import { isReactComponent } from './utils';
import Store from './Store';
import { IBatchComponentType } from './types';

export interface IBatchComponentsProps<Data = any> {
  batchComponents: IBatchComponentType[];
  prefix: string;
  onSelect: (type: string, datasets: Data[]) => void;
  store: Store;
  datasets: Data[];
  getDataKey: (data: Data, rowIndex: string | number) => string;
  selectedRows?: Data[];
  disabled?: boolean;
  batchComponentsFixed: boolean;
  style?: React.CSSProperties;
}

class BatchComponents<Data> extends PureComponent<IBatchComponentsProps<Data>> {
  static defaultProps = {
    selectedRows: [],
  };

  batchComponentWrapper = (comp: IBatchComponentType, index: number) => {
    const { selectedRows } = this.props;
    let subComponents: React.ReactNode;
    if (isReactComponent(comp)) {
      const Comp = comp;
      subComponents = <Comp data={selectedRows} />;
    } else if (typeof comp === 'function') {
      subComponents = comp(selectedRows);
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
    return batchComponents && batchComponents.map(this.batchComponentWrapper);
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
      batchComponentsFixed,
    } = this.props;
    const className = classnames(`${prefix}-grid-tfoot-batch`, {
      [`${prefix}-grid-tfoot__batchcomponents--fixed`]: batchComponentsFixed,
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
            {this.renderComponents()}
          </div>
        )}
      </Receiver>
    );
  }
}

export default BatchComponents;
