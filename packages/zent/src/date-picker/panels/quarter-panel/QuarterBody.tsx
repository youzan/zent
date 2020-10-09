import * as React from 'react';
import PanelContext from '../../context/PanelContext';
import PickerContext from '../../context/PickerContext';
import PanelCell from '../../components/PanelCell';

import getPanelCellsData from '../../utils/getPanelCellsData';
import { dateConfig } from '../../utils/dateUtils';
import { setQuarter } from 'date-fns';
import { ISingleDateBodyProps } from '../../types';

const COL_COUNT = 2;
const ROW_COUNT = 2;

interface IQuarterPickerBodyProps extends ISingleDateBodyProps {}
const QuarterPickerBody: React.FC<IQuarterPickerBodyProps> = ({
  defaultPanelDate,
  onSelected,
  selected,
  disabledPanelDate,
  row = ROW_COUNT,
  col = COL_COUNT,
}) => {
  const { i18n } = React.useContext(PickerContext);
  const { onHover } = React.useContext(PanelContext);

  const cells = React.useMemo(
    () =>
      getPanelCellsData({
        selected,
        disabledPanelDate,
        defaultPanelDate: setQuarter(defaultPanelDate, 1),
        texts: i18n.panel.quarterNames,
        row,
        col,
        dateConfig: dateConfig.quarter,
      }),
    [selected, row, col, defaultPanelDate, i18n, disabledPanelDate]
  );

  return (
    <div className="zent-datepicker-quarter-panel-body">
      <PanelCell
        col={col}
        cells={cells}
        onSelected={onSelected}
        onHover={onHover}
      />
    </div>
  );
};

export default QuarterPickerBody;
