import * as React from 'react';
import { useState, useContext } from 'react';
import PanelHeader, { TitleCommonNode } from '../../components/PanelHeader';

import I18nLocaleContext from '../../context/I18nLocaleContext';
import QuarterPanelBody from './QuarterBody';
import { addYears } from 'date-fns/esm';
import { ISingleDatePanelProps } from '../../types';

const QuarterPickerPanel: React.FC<Omit<
  ISingleDatePanelProps,
  'rangeDate' | 'hoverRangeDate'
>> = props => {
  const { defaultPanelDate, onChangePanel, ...resetProps } = props;
  const { i18n } = useContext(I18nLocaleContext);
  const [panelDate, setPanelDate] = useState<Date>(defaultPanelDate);

  return (
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
      <QuarterPanelBody
        {...resetProps}
        // selected={selected}
        // hoverDate={hoverDate}
        // onSelected={onSelected}
        defaultPanelDate={panelDate}
      />
    </>
  );
};
export default QuarterPickerPanel;
