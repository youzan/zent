import React from 'react';
import Td from './Td';

// 需要传入一个组件模板
const Body = React.createClass({
  render() {
    let { datasets, columns, emptyLabel, rowKey, selection, getRowConf } = this.props;

    return (
      <tbody>
        {datasets.length !== 0 ?
          datasets.map((rowData, rowIndex) => {
            let { canSelect = true, rowClass = '' } = getRowConf(rowData, rowIndex);

            return (
              <tr className={rowClass} key={rowData[rowKey] ? rowData[rowKey] : rowIndex}>
                {columns.map((item, columnIndex) => {
                  // 位置信息
                  let pos = {
                    row: rowIndex,
                    column: columnIndex
                  };

                  let needSelect = false;
                  if (selection.needSelect && columnIndex === 0) {
                    needSelect = true;
                  }

                  return (
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
                })}
              </tr>
            );
          }) : (
          <tr>
            <td className="empty-data" colSpan={columns.length}>{emptyLabel}</td>
          </tr>
        )}
      </tbody>
    );
  }
});

export default Body;
