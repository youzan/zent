import React from 'react';
import Td from './Td';

// 需要传入一个组件模板
const Body = React.createClass({
  getInitialState() {
    return {
      expandItems: {}
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

  isExpanded(rowIndex) {
    return this.state.expandItems[rowIndex] || 0;
  },

  render() {
    let { datasets, columns, emptyLabel, rowKey, selection, getRowConf, expandedRowRender, expanded } = this.props;

    let trs = [];
    let dataIterator = (rowData, rowIndex) => {
      let { canSelect = true, rowClass = '' } = getRowConf(rowData, rowIndex);
      let tds = [];
      if (expanded) {
        tds.push(
          <div className="td expanded-item">
            <span className={this.isExpanded(rowIndex) ? 'expandable-btn collapse-btn' : 'expandable-btn expand-btn'} onClick={this.handleExpand(rowIndex)}></span>
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
        <div className={`${rowClass} tr`} key={rowData[rowKey] ? rowData[rowKey] : rowIndex}>
          {tds}
        </div>
      );
    };
    let expandedInterator = (rowData, rowIndex) => {
      trs.push(
        <div className="tr expanded" style={{ display: this.isExpanded(rowIndex) ? 'flex' : 'none' }}>
          <div className="td expanded-item"></div>
          <div className="td">
            {expandedRowRender(rowData)}
          </div>
        </div>
      );
    };

    if (expanded) {
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
