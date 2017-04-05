import React from 'react';
import Td from './Td';

// 需要传入一个组件模板
const Body = React.createClass({

  getInitialState() {
    let { datasets, isExpanded } = this.props;
    let expandItems = {};

    datasets.forEach((rowData, rowIndex) => {
      if (typeof isExpanded === 'function') {
        expandItems[rowIndex] = isExpanded(rowData, rowIndex);
      } else {
        expandItems[rowIndex] = false;
      }
    });

    return {
      expandItems
    };
  },

  handleExpand(rowIndex) {
    return () => {
      let expandItems = Object.assign({}, this.state.expandItems);

      expandItems[rowIndex] = !(expandItems[rowIndex] || 0);

      this.setState({
        expandItems
      });
    };
  },

  isExpanded(rowData, rowIndex) {
    return this.state.expandItems[rowIndex] || 0;
  },

  render() {
    let { datasets, columns, emptyLabel, rowKey, selection, getRowConf, expandRender, needExpand } = this.props;

    let trs = [];
    let dataIterator = (rowData, rowIndex) => {
      let { canSelect = true, rowClass = '' } = getRowConf(rowData, rowIndex);

      let tds = [];
      if (needExpand) {
        tds.push(
          <div key="-1" className="td expanded-item">
            <span
              className={this.isExpanded(rowData, rowIndex) ? 'expandable-btn collapse-btn' : 'expandable-btn expand-btn'}
              onClick={this.handleExpand(rowIndex)}
            >
            </span>
          </div>
        );
      }

      columns.forEach((item, columnIndex) => {
        // 位置信息
        let pos = {
          row: rowIndex,
          column: columnIndex
        };

        let needSelect = false;
        if (selection.needSelect && columnIndex === 0) {
          needSelect = true;
        }

        tds.push(
          <Td
            column={item}
            key={columnIndex}
            data={rowData}
            pos={pos}
            rowKey={rowKey}
            selection={{
              needSelect,
              canSelect,
              selectedRowKeys: selection.selectedRowKeys,
              onSelect: selection.onSelect
            }}
          />
        );
      });

      trs.push(
        <div className={`${rowClass} tr`} key={rowData[rowKey] || rowIndex}>
          {tds}
        </div>
      );
    };

    let expandedInterator = (rowData, rowIndex) => {
      trs.push(
        <div className="tr tr--expanded" key={`${(rowData[rowKey] || rowIndex)}-expand`} style={{ display: this.isExpanded(rowData, rowIndex) ? 'flex' : 'none' }}>
          <div className="td expanded-item"></div>
          <div className="td">
            {expandRender(rowData)}
          </div>
        </div>
      );
    };

    if (needExpand) {
      datasets.forEach((rowData, rowIndex) => {
        dataIterator(rowData, rowIndex);
        expandedInterator(rowData, rowIndex);
      });
    } else {
      datasets.forEach((rowData, rowIndex) => {
        dataIterator(rowData, rowIndex);
      });
    }

    return (
      <div className="tbody">
        {datasets.length !== 0 ?
          trs : (
          <div className="tr">
            <div className="cell empty-data">{emptyLabel}</div>
          </div>
        )}
      </div>
    );
  }
});

export default Body;
