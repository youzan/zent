import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import Row from './Row';
import ColGroup from './ColGroup';

class Body extends PureComponent {
  getRows() {
    const {
      prefix,
      datasets,
      columns,
      rowKey,
      rowClassName,
      onRowClick,
      onRowMoverOver,
      mouseOverRowIndex,
      fixed,
      scroll,
      expandRowKeys,
      expandRender,
      fixedColumnsBodyRowsHeight,
      fixedColumnsBodyExpandRowsHeight,
    } = this.props;
    const row = [];

    forEach(datasets, (data, index) => {
      row.push(
        <Row
          data={data}
          columns={columns}
          index={index}
          rowIndex={index}
          prefix={prefix}
          key={rowKey ? get(data, rowKey) : index}
          rowClassName={rowClassName}
          mouseOverRowIndex={mouseOverRowIndex}
          onRowClick={onRowClick}
          onRowMoverOver={onRowMoverOver}
          fixed={fixed}
          scroll={scroll}
          fixedColumnsBodyRowsHeight={fixedColumnsBodyRowsHeight}
        />
      );
      if (expandRender && expandRowKeys.length > 0) {
        const height =
          fixed && fixedColumnsBodyExpandRowsHeight[index]
            ? fixedColumnsBodyExpandRowsHeight[index]
            : null;
        const trProps = {
          key: `${index}-expand`,
          className: `${prefix}-grid-tr__expanded`,
          style: { display: expandRowKeys[index] ? '' : 'none', height },
        };
        if (fixed !== 'right') {
          row.push(
            <tr {...trProps}>
              <td />
              <td colSpan={columns.length - 1}>{expandRender(data)}</td>
            </tr>
          );
        } else {
          row.push(
            <tr {...trProps}>
              <td colSpan={columns.length} />
            </tr>
          );
        }
      }
    });

    return row;
  }

  renderTbody() {
    const { prefix, onRowMoverOver, scroll } = this.props;

    return (
      <tbody
        onMouseLeave={() => scroll && scroll.x && onRowMoverOver(-1)}
        className={`${prefix}-grid-tbody`}
      >
        {this.getRows()}
      </tbody>
    );
  }

  render() {
    const { scroll, fixed, prefix, columns } = this.props;
    const bodyStyle = {};
    if (!fixed && scroll.x) {
      bodyStyle.width = scroll.x;
    }
    return scroll.y ? (
      <table className={`${prefix}-grid-table`} style={bodyStyle}>
        <ColGroup columns={columns} />
        {this.renderTbody()}
      </table>
    ) : (
      this.renderTbody()
    );
  }
}

Body.propTypes = {
  prefix: PropTypes.string,
  columns: PropTypes.array,
};

export default Body;
