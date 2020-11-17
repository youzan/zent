import * as React from 'react';
import cx from 'classnames';
import Tooltip from '../../tooltip';
import { IDateCellBase } from '../types';

const prefixCls = 'zent-datepicker-panel-body-cells';
// 获取单元格样式类
const getCellClassName = ({
  isInView,
  isCurrent,
  isSelected,
  isDisabled,
  isInRange,
  isInHoverRange,
}: Omit<IDateCellBase, 'value' | 'text'>) => {
  return cx(`${prefixCls}_item`, {
    [`${prefixCls}_over`]: !isInView,
    [`${prefixCls}_disabled`]: isDisabled,
    [`${prefixCls}_available`]: !isSelected && !isDisabled,
    [`${prefixCls}_current`]: isInView && isCurrent,
    [`${prefixCls}_selected`]: isSelected,
    [`${prefixCls}_in_range`]: !isDisabled && (isInRange || isInHoverRange),
  });
};

interface IPanelCellProps {
  cells: IDateCellBase[];
  col: number;
  onSelected: (val: Date) => void;
  onHover?: (val: Date) => void;
  popText?: string;
}
const PanelCell: React.FC<IPanelCellProps> = ({
  cells,
  onSelected,
  col,
  popText,
  onHover,
}) => {
  const onCellClick = React.useCallback(
    ({ isDisabled, value }) => {
      if (isDisabled) return;
      onSelected(value);
    },
    [onSelected]
  );

  const onCellMouseOver = React.useCallback(
    ({ isDisabled, value }) => {
      if (isDisabled) return;
      onHover?.(value);
    },
    [onHover]
  );

  const rows = React.useMemo(() => {
    const uls: React.ReactNode[] = [];
    let rowCells: React.ReactNode[] = [];
    cells.map(({ value, text, ...classNameProps }, index) => {
      const { isSelected, isDisabled } = classNameProps;
      const cellNode = (
        <li
          key={value.getTime()}
          className={getCellClassName(classNameProps)}
          onClick={() => onCellClick({ isDisabled, value })}
        >
          <div
            className="zent-datepicker-cell-inner"
            onMouseEnter={() => onCellMouseOver({ isDisabled, value })}
            onMouseLeave={() => onCellMouseOver({ isDisabled, value: null })}
          >
            {text}
          </div>
        </li>
      );
      // 单元格支持Tooltip
      const cell =
        popText && isSelected ? (
          <Tooltip key={value.getTime()} visible={true} title={popText}>
            {cellNode}
          </Tooltip>
        ) : (
          cellNode
        );

      rowCells.push(cell);
      // 换行
      if (index % col === col - 1) {
        uls.push(
          <ul key={value.getTime()} className={`${prefixCls}_row`}>
            {rowCells}
          </ul>
        );
        rowCells = [];
      }
    });
    return uls;
  }, [cells, col, popText, onCellClick, onCellMouseOver]);

  return <ul className={prefixCls}>{rows}</ul>;
};
export default PanelCell;
