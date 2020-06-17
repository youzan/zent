import * as React from 'react';
import PanelCell from '../../components/PanelCell';
import I18nLocaleContext from '../../context/I18nLocaleContext';
import useCellsData from '../../hooks/useCellsData';

import { ISingleDatePanelProps } from '../../types';
import { setYear } from 'date-fns/esm';

const COL_COUNT = 3;
const ROW_COUNT = 4;

interface IYearPickerBodyProps extends ISingleDatePanelProps {
  firstYear: number;
}
const YearPickerBody: React.FC<IYearPickerBodyProps> = ({
  firstYear,
  onSelected,
  selected,
  hoverDate,
  defaultPanelDate,
  disabledPanelDate,
}) => {
  const { i18n, onHover } = React.useContext(I18nLocaleContext);

  const YearTexts = Array.from(
    { length: 12 },
    (_, i) => `${firstYear + i}${i18n.panel.year}`
  );
  const cells = useCellsData({
    selected,
    hoverDate,
    disabledPanelDate,
    defaultPanelDate: setYear(defaultPanelDate, firstYear),
    texts: YearTexts,
    ROW_COUNT,
    COL_COUNT,
    type: 'year',
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
export default YearPickerBody;
