import { useContext, useMemo } from 'react';

import PanelCell from '../../components/PanelCell';
import PanelContext from '../../context/PanelContext';
import PickerContext from '../../context/PickerContext';
import getPanelCellsData from '../../utils/getPanelCellsData';

import { dateConfig } from '../../utils/dateUtils';
import { setYear } from 'date-fns';
import { ISingleDateBodyProps } from '../../types';
import { MAX_YEAR } from '../../constants';

const COL_COUNT = 3;
const ROW_COUNT = 4;

interface IYearPickerBodyProps extends ISingleDateBodyProps {
  firstYear: number;
}
const YearPickerBody: React.FC<IYearPickerBodyProps> = ({
  firstYear,
  onSelected,
  selected,
  defaultPanelDate,
  disabledPanelDate,
  row = ROW_COUNT,
  col = COL_COUNT,
}) => {
  const { i18n } = useContext(PickerContext);
  const { onHover } = useContext(PanelContext);

  const YearTexts = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        firstYear + i <= MAX_YEAR ? `${firstYear + i}${i18n.panel.year}` : ''
      ),
    [firstYear, i18n]
  );
  const cells = useMemo(
    () =>
      getPanelCellsData({
        selected,
        disabledPanelDate,
        defaultPanelDate: setYear(defaultPanelDate, firstYear),
        texts: YearTexts,
        row,
        col,
        dateConfig: dateConfig.year,
      }),
    [
      selected,
      row,
      col,
      YearTexts,
      defaultPanelDate,
      firstYear,
      disabledPanelDate,
    ]
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

export default YearPickerBody;
