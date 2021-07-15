import { useMemo, FC, useContext } from 'react';
import PanelContext from '../../context/PanelContext';
import PickerContext from '../../context/PickerContext';
import PanelCell from '../../components/PanelCell';

import getPanelCellsData from '../../utils/getPanelCellsData';
import { dateConfig } from '../../utils/dateUtils';
import { setMonth } from 'date-fns';
import { ISingleDateBodyProps } from '../../types';

const COL_COUNT = 3;
const ROW_COUNT = 4;

type IMonthPickerBodyProps = ISingleDateBodyProps;
const MonthPickerBody: FC<IMonthPickerBodyProps> = ({
  defaultPanelDate,
  onSelected,
  selected,
  disabledPanelDate,
  row = ROW_COUNT,
  col = COL_COUNT,
}) => {
  const { i18n } = useContext(PickerContext);
  const { onHover } = useContext(PanelContext);

  const cells = useMemo(
    () =>
      getPanelCellsData({
        selected,
        disabledPanelDate,
        defaultPanelDate: setMonth(defaultPanelDate, 0),
        texts: i18n.panel.monthNames,
        row,
        col,
        dateConfig: dateConfig.month,
      }),
    [selected, row, col, defaultPanelDate, i18n, disabledPanelDate]
  );

  return (
    <div className="zent-datepicker-ym-panel-body">
      <PanelCell
        col={col}
        cells={cells}
        onSelected={onSelected}
        onHover={onHover}
      />
    </div>
  );
};

export default MonthPickerBody;
