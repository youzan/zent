import * as React from 'react';
import { addYears, setYear } from 'date-fns';

import PanelHeader, { Title } from '../../components/PanelHeader';
import QuarterPanelBody from './QuarterBody';
import YearPanel from '../year-panel';

import usePanelDate from '../../hooks/usePanelDate';
import PickerContext from '../../context/PickerContext';
import { ISingleDatePanelProps } from '../../types';

const QuarterPickerPanel: React.FC<Omit<
  ISingleDatePanelProps,
  'rangeDate' | 'hoverRangeDate'
>> = props => {
  const { defaultPanelDate, onChangePanel, ...resetProps } = props;
  const { i18n } = React.useContext(PickerContext);
  const { panelDate, setPanelDate } = usePanelDate(defaultPanelDate);
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
    [panelDate, setPanelDate]
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
