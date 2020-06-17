import * as React from 'react';
import I18nLocaleContext from '../../context/I18nLocaleContext';
import PanelCell from '../../components/PanelCell';
import useCellsData from '../../hooks/useCellsData';

import { ISingleDatePanelProps } from '../../types';
import { setQuarter } from 'date-fns';

const COL_COUNT = 2;
const ROW_COUNT = 2;

const QuarterPickerBody: React.FC<ISingleDatePanelProps> = ({
  defaultPanelDate,
  onSelected,
  selected,
  disabledPanelDate,
  hoverDate,
}) => {
  const { i18n, onHover } = React.useContext(I18nLocaleContext);

  const cells = useCellsData({
    selected,
    hoverDate,
    disabledPanelDate,
    defaultPanelDate: setQuarter(defaultPanelDate, 1),
    texts: i18n.panel.quarterNames,
    ROW_COUNT,
    COL_COUNT,
    type: 'quarter',
  });

  return (
    <div className="zent-date-picker-quarter-panel-body">
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
export default QuarterPickerBody;
