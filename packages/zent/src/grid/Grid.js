import React, { PureComponent, Component } from 'react';
import PropTypes from 'prop-types';
import Loading from 'loading';
import Checkbox from 'checkbox';
import classnames from 'classnames';
import get from 'lodash/get';
import noop from 'lodash/noop';
import cloneDeep from 'lodash/cloneDeep';
import Store from './Store';
import ColGroup from './ColGroup';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import SelectionCheckbox from './SelectionCheckbox';

const defaultPageInfo = {
  current: 1,
  pageSize: 10
};

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
      columns: this.getColumns(props.columns),
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

  getColumns = () => {
    let { columns, selection } = this.props;

    columns = cloneDeep(columns);

    if (selection) {
      const selectionColumn = {
        title: this.renderSelectionCheckboxAll(),
        bodyRender: this.renderSelectionCheckbox(selection.type)
      };

      columns.unshift(selectionColumn);
    }

    return columns;
  };

  getTable() {
    const { prefix, datasets } = this.props;
    const columns = this.store.getState('columns');

    return (
      <table className={`${prefix}-grid-table`}>
        <ColGroup columns={columns} />
        <Header prefix={prefix} columns={columns} />
        <Body prefix={prefix} columns={columns} datasets={datasets} />
      </table>
    );
  }

  handleSelect = (data, key, e) => {
    const checked = e.target.checked;
    let selectedRowKeys = this.store.getState('selectedRowKeys');

    if (checked) {
      selectedRowKeys.push(key);
    } else {
      selectedRowKeys = selectedRowKeys.filter(i => key !== i);
    }

    this.store.setState({ selectedRowKeys });
  };

  renderSelectionCheckbox = () => {
    return (data, { row }) => {
      let key = this.getDataKey(data, row);
      return (
        <span onClick={stopPropagation}>
          <SelectionCheckbox
            rowIndex={key}
            store={this.store}
            onChange={e => this.handleSelect(data, key, e)}
          />
        </span>
      );
    };
  };

  renderSelectionCheckboxAll = () => {
    return <Checkbox />;
  };

  render() {
    const { prefix, loading, pageInfo } = this.props;

    return (
      <div className={classnames(`${prefix}-grid`)}>
        <Loading show={loading}>
          {this.getTable()}
          <Footer
            prefix={prefix}
            pageInfo={pageInfo}
            defaultPageInfo={defaultPageInfo}
            onChange={this.onChange}
            hasPagination={this.hasPagination}
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
