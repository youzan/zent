import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import Loading from 'loading';
import classnames from 'classnames';
import has from 'lodash/has';
import get from 'lodash/get';
import indexOf from 'lodash/indexOf';
import forEach from 'lodash/forEach';
import noop from 'lodash/noop';
import isFunction from 'lodash/isFunction';
import filter from 'lodash/filter';
import cloneDeep from 'lodash/cloneDeep';
import includes from 'lodash/includes';
import Store from './Store';
import ColGroup from './ColGroup';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import SelectionCheckbox from './SelectionCheckbox';
import SelectionCheckboxAll from './SelectionCheckboxAll';

function stopPropagation(e) {
  e.stopPropagation();
  if (e.nativeEvent.stopImmediatePropagation) {
    e.nativeEvent.stopImmediatePropagation();
  }
}

class Grid extends (PureComponent || Component) {
  constructor(props) {
    super(props);
    this.store = new Store(props);
    this.store.setState({
      columns: this.getColumns(props, props.columns),
      selectedRowKeys: get(props, 'selection.selectedRowKeys')
    });
  }

  onChange = conf => {
    this.props.onChange(conf);
  };

  getDataKey = (data, rowIndex) => {
    const { rowKey } = this.props;

    return rowKey ? get(data, rowKey) : rowIndex;
  };

  getColumns = (props, columns) => {
    let { selection, datasets } = props || this.props;
    columns = cloneDeep(columns || this.store.getState('columns'));

    if (selection) {
      const selectionColumn = {
        key: 'selection-column',
        bodyRender: this.renderSelectionCheckbox(selection.type)
      };

      selectionColumn.title = (
        <SelectionCheckboxAll
          store={this.store}
          datasets={datasets}
          getDataKey={this.getDataKey}
          onSelect={this.handleBatchSelect}
        />
      );

      if (columns[0] && columns[0].key === 'selection-column') {
        columns[0] = selectionColumn;
      } else {
        columns.unshift(selectionColumn);
      }
    }

    return columns;
  };

  getTable() {
    const { prefix, datasets } = this.props;
    const columns = this.store.getState('columns');

    return (
      <table className={`${prefix}-grid-table`}>
        <ColGroup columns={columns} />
        <Header prefix={prefix} columns={columns} store={this.store} />
        <Body prefix={prefix} columns={columns} datasets={datasets} />
      </table>
    );
  }

  onSelectChange = (selectedRowKeys, data) => {
    const { datasets, selection } = this.props;
    const onSelect = get(selection, 'onSelect');

    if (isFunction(onSelect)) {
      const selectedRows = filter(datasets, (row, i) =>
        includes(selectedRowKeys, this.getDataKey(row, i))
      );
      onSelect(selectedRowKeys, selectedRows, data);
    }
  };

  handleSelect = (data, rowIndex, e) => {
    const checked = e.target.checked;

    let selectedRowKeys = this.store.getState('selectedRowKeys');

    if (checked) {
      selectedRowKeys.push(rowIndex);
    } else {
      selectedRowKeys = filter(selectedRowKeys, i => rowIndex !== i);
    }

    this.store.setState({ selectedRowKeys });

    this.onSelectChange(selectedRowKeys, data);
  };

  handleBatchSelect = type => {
    const { datasets } = this.props;
    let selectedRowKeys = cloneDeep(this.store.getState('selectedRowKeys'));

    let changeRowKeys = [];

    switch (type) {
      case 'selectAll':
        forEach(datasets, (key, index) => {
          const rowIndex = this.getDataKey(key, index);
          if (!includes(selectedRowKeys, rowIndex)) {
            selectedRowKeys.push(rowIndex);
            changeRowKeys.push(rowIndex);
          }
        });
        break;
      case 'removeAll':
        forEach(datasets, (key, index) => {
          const rowIndex = this.getDataKey(key, index);
          if (includes(selectedRowKeys, rowIndex)) {
            selectedRowKeys.splice(indexOf(selectedRowKeys, rowIndex), 1);
            changeRowKeys.push(key);
          }
        });
        break;
      default:
        break;
    }

    this.store.setState({ selectedRowKeys });

    const changeRow = filter(datasets, (row, i) =>
      includes(changeRowKeys, this.getDataKey(row, i))
    );

    this.onSelectChange(selectedRowKeys, changeRow);
  };

  renderSelectionCheckbox = () => {
    return (data, { row }) => {
      const rowIndex = this.getDataKey(data, row);
      return (
        <span onClick={stopPropagation}>
          <SelectionCheckbox
            rowIndex={rowIndex}
            store={this.store}
            onChange={e =>
              this.handleSelect(data, this.getDataKey(data, row), e)}
          />
        </span>
      );
    };
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selection && has(nextProps.selection, 'selectedRowKeys')) {
      this.store.setState({
        selectedRowKeys: nextProps.selection.selectedRowKeys || [],
        columns: this.getColumns(nextProps)
      });
    }
  }

  render() {
    const { prefix, loading, pageInfo } = this.props;

    return (
      <div className={classnames(`${prefix}-grid`)}>
        <Loading show={loading}>
          {this.getTable()}
          <Footer
            prefix={prefix}
            pageInfo={pageInfo}
            onChange={this.onChange}
          />
        </Loading>
      </div>
    );
  }
}

Grid.propTypes = {
  className: PropTypes.string,
  prefix: PropTypes.string,
  datasets: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  pageInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onChange: PropTypes.func,
  selection: PropTypes.object,
  rowKey: PropTypes.string
};

Grid.defaultProps = {
  className: '',
  prefix: 'zent',
  datasets: [],
  columns: [],
  loading: false,
  pageInfo: false,
  onChange: noop,
  selection: null
};

export default Grid;
