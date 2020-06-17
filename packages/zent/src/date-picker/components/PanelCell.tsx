import * as React from 'react';
import cx from 'classnames';
import Tooltip from '../../tooltip';
import { IDateCellBase } from '../types';

const prefixCls = 'zent-date-picker-panel-body-cells';
// 获取单元格样式类
const getCellClassName = ({
  isInView,
  isCurrent,
  isSelected,
  isDisabled,
  isHover,
  isInRange,
  isInHoverRange,
}: Omit<IDateCellBase, 'value' | 'text'>) => {
  return cx(`${prefixCls}_item`, {
    [`${prefixCls}_over`]: !isInView,
    [`${prefixCls}_hover`]: !isSelected && !isDisabled && isHover,
    [`${prefixCls}_disabled`]: isDisabled,
    [`${prefixCls}_current`]: isInView && isCurrent,
    [`${prefixCls}_selected`]: !isDisabled && isInView && isSelected,
    [`${prefixCls}_in_range`]: !isDisabled && (isInRange || isInHoverRange),
  });
};

interface IPanelCellProps {
  cells: IDateCellBase[];
  col: number;
  row: number;
  onSelected: (val: any) => any;
  onHover?: (val: Date) => any;
  popText?: string;
}
const PanelCell: React.FC<IPanelCellProps> = ({
  cells,
  onSelected,
  row,
  col = 2,
  popText,
  onHover,
}) => {
  const rows = React.useMemo(
    () => {
      const uls = [];
      for (let rowNum = 0; rowNum < row; rowNum++) {
        const rowCells = cells
          .splice(0, col)
          .map(({ value, text, ...classNameProps }, index) => {
            const { isSelected, isDisabled } = classNameProps;
            const cellNode = (
              <li
                key={index}
                className={getCellClassName(classNameProps)}
                onClick={() => {
                  !isDisabled && onSelected && onSelected(value);
                }}
              >
                <div
                  className="zent-date-picker-cell-inner"
                  onMouseEnter={() => {
                    !isDisabled && onHover && onHover(value);
                  }}
                  onMouseLeave={() => {
                    !isDisabled && onHover && onHover(null);
                  }}
                >
                  {text}
                </div>
              </li>
            );
            // 单元格支持Tooltip
            return popText && isSelected ? (
              <Tooltip key={index} visible={true} title={popText}>
                {cellNode}
              </Tooltip>
            ) : (
              cellNode
            );
          });

        uls.push(
          <ul key={cells.length} className={`${prefixCls}_row`}>
            {rowCells}
          </ul>
        );
      }
      return uls;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cells]
  );

  return <ul className={prefixCls}>{rows}</ul>;
};
export default PanelCell;
