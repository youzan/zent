import * as React from 'react';
import { FC, useContext } from 'react';
import I18nLocaleContext from '../../context/I18nLocaleContext';
import PanelCell from '../../components/PanelCell';
import useCellsData from '../../hooks/useCellsData';
import { ISingleDateBodyProps } from '../../types';
import { setMonth } from 'date-fns';

const COL_COUNT = 3;
const ROW_COUNT = 4;

interface IMonthPickerBodyProps extends ISingleDateBodyProps {}
const MonthPickerBody: FC<IMonthPickerBodyProps> = ({
  defaultPanelDate,
  onSelected,
  selected,
  disabledPanelDate,
  hoverDate,
}) => {
  const { i18n, onHover } = useContext(I18nLocaleContext);

  const cells = useCellsData({
    selected,
    hoverDate,
    disabledPanelDate,
    defaultPanelDate: setMonth(defaultPanelDate, 0),
    texts: i18n.panel.monthNames,
    ROW_COUNT,
    COL_COUNT,
    type: 'month',
  });

  return (
    <div className="zent-date-picker-ym-panel-body">
      <PanelCell
        col={COL_COUNT}
        row={ROW_COUNT}
        cells={cells}
        onSelected={onSelected}
        onHover={onHover}
      />
    </div>
  );
};
export default MonthPickerBody;
