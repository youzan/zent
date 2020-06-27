import * as React from 'react';
import { useState, useContext } from 'react';
import PanelHeader, { Title } from '../../components/PanelHeader';

import PickerContext from '../../context/PickerContext';
import QuarterPanelBody from './QuarterBody';
import YearPanel from '../year-panel';

import { addYears, setYear } from 'date-fns';
import { ISingleDatePanelProps } from '../../types';

const QuarterPickerPanel: React.FC<Omit<
  ISingleDatePanelProps,
  'rangeDate' | 'hoverRangeDate'
>> = props => {
  const { defaultPanelDate, onChangePanel, ...resetProps } = props;
  const { i18n } = useContext(PickerContext);
  const [panelDate, setPanelDate] = useState<Date>(defaultPanelDate);
  const [showYear, setShowYear] = React.useState<boolean>(false);

  const QuarterPanelNode = (
    <>
      <PanelHeader
        titleNode={
          <Title
            text={panelDate.getFullYear()}
            unit={i18n.panel.year}
            onClick={() => setShowYear(true)}
          />
        }
        onPrev={() => setPanelDate(addYears(panelDate, -1))}
        onNext={() => setPanelDate(addYears(panelDate, 1))}
      />
      <QuarterPanelBody {...resetProps} defaultPanelDate={panelDate} />
    </>
  );

  const onClickYear = React.useCallback(
    val => {
      setPanelDate(setYear(panelDate, val.getFullYear()));
      setShowYear(false);
    },
    [panelDate]
  );
  const YearPanelNode = (
    <YearPanel
      {...props}
      onSelected={onClickYear}
      defaultPanelDate={panelDate}
    />
  );

  return <>{!showYear ? QuarterPanelNode : YearPanelNode}</>;
};
export default QuarterPickerPanel;
