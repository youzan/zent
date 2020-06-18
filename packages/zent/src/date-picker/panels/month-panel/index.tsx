import * as React from 'react';
import { useState, useContext } from 'react';
import PanelHeader, { TitleCommonNode } from '../../components/PanelHeader';

import I18nLocaleContext from '../../context/I18nLocaleContext';
import MonthPanelBody from './MonthBody';
import { addYears } from 'date-fns';
import { ISingleDatePanelProps } from '../../types';

const MonthPickerPanel: React.FC<ISingleDatePanelProps> = props => {
  const {
    defaultPanelDate,
    selected,
    onSelected,
    onChangePanel,
    hoverDate,
  } = props;
  const { i18n } = useContext(I18nLocaleContext);
  const [panelDate, setPanelDate] = useState<Date>(defaultPanelDate);

  const MonthPanelNode = (
    <>
      <PanelHeader
        titleNode={
          <TitleCommonNode
            text={panelDate.getFullYear()}
            unit={i18n.panel.year}
            onClick={() => onChangePanel('year')}
          />
        }
        onPrev={() => setPanelDate(addYears(panelDate, -1))}
        onNext={() => setPanelDate(addYears(panelDate, 1))}
      />
      <MonthPanelBody
        defaultPanelDate={panelDate}
        selected={selected}
        hoverDate={hoverDate}
        onSelected={onSelected}
      />
    </>
  );

  return MonthPanelNode;
};
export default MonthPickerPanel;
