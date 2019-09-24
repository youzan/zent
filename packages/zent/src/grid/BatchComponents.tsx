import * as React from 'react';
import { PureComponent } from 'react';
import includes from 'lodash-es/includes';
import every from 'lodash-es/every';
import get from 'lodash-es/get';
import SelectionCheckboxAll from './SelectionCheckboxAll';
import { isReactComponent } from './utils';
import Popover from '../popover';
import Icon from '../icon';
import Button from '../button';

interface IBatchComponentsProps {
  batchComponents: any;
  prefix: string;
  onSelect: any;
  store: any;
  datasets: any;
  getDataKey: any;
  selection: any;
  checkboxPropsCache: any;
}

interface IBatchComponentsState {
  selectedRows: any;
}

class BatchComponents extends PureComponent<
  IBatchComponentsProps,
  IBatchComponentsState
> {
  constructor(props) {
    super(props);

    this.state = {
      selectedRows: this.getSelectRows(),
    };
  }

  state: IBatchComponentsState = {
    selectedRows: [],
  };

  getSelectRows = () => {
    const { datasets, getDataKey, store } = this.props;
    const selectedRowKeys = store.getState('selectedRowKeys');
    const selectedRows = (datasets || []).filter((row, i) =>
      includes(selectedRowKeys, getDataKey(row, i))
    );
    return selectedRows;
  };

  unsubscribe: any;

  subscribe = () => {
    const { store } = this.props;
    this.unsubscribe = store.subscribe('selectedRowKeys', () => {
      this.setState({
        selectedRows: this.getSelectRows(),
      });
    });
  };

  componentDidMount() {
    this.subscribe();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  batchComponentWrapper = (comp, index) => {
    const { selectedRows } = this.state;
    let subComponents;
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
    const formattedComponents = batchComponents.map(this.batchComponentWrapper);
    if (batchComponents.length > 2) {
      return [
        ...formattedComponents.slice(0, 2),
        this.renderDropdown(formattedComponents.slice(2)),
      ];
    }
    return formattedComponents;
  };

  renderDropdown(components) {
    return (
      <Popover
        position={Popover.Position.AutoBottomLeft}
        display="inline"
        cushion={5}
      >
        <Popover.Trigger.Click>
          <Button className="batch-component-more">
            更多操作
            <Icon type="caret-down" className="batch-component-icon" />
          </Button>
        </Popover.Trigger.Click>
        <Popover.Content>
          <div className="more-components-wrapper">{components}</div>
        </Popover.Content>
      </Popover>
    );
  }

  getCheckboxPropsByItem = (data, rowIndex) => {
    const { selection, checkboxPropsCache } = this.props;

    if (!selection || !selection.getCheckboxProps) {
      return {};
    }

    if (!checkboxPropsCache[rowIndex]) {
      checkboxPropsCache[rowIndex] = selection.getCheckboxProps(data);
    }
    return checkboxPropsCache[rowIndex];
  };

  getDataAndDisabled = () => {
    const { datasets, getDataKey, selection } = this.props;
    const data = (datasets || []).filter((item, index) => {
      const rowIndex = getDataKey(item, index);

      if (selection.getCheckboxProps) {
        return !get(this.getCheckboxPropsByItem(item, rowIndex), 'disabled');
      }
      return true;
    });

    const checkboxAllDisabled = every(data, (item, index) => {
      const rowIndex = getDataKey(item, index);
      return get(this.getCheckboxPropsByItem(item, rowIndex), 'disabled');
    });
    return {
      data,
      disabled: checkboxAllDisabled,
    };
  };

  render() {
    const { prefix, onSelect, store, getDataKey } = this.props;
    const { selectedRows = [] } = this.state;
    const { data, disabled } = this.getDataAndDisabled();
    return (
      <div className={`${prefix}-grid-tfoot-batch`}>
        <SelectionCheckboxAll
          getDataKey={getDataKey}
          onSelect={onSelect}
          store={store}
          disabled={disabled}
          datasets={data}
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
