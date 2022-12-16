import { addYears, setYear } from 'date-fns';
import { useCallback, useContext, useState } from 'react';

import PanelHeader, { Title } from '../../components/PanelHeader';
import QuarterPanelBody from './QuarterBody';
import YearPanel from '../year-panel';

import usePanelDate from '../../hooks/usePanelDate';
import PickerContext from '../../context/PickerContext';
import { ISinglePanelProps } from '../../types';

const QuarterPickerPanel: React.FC<
  Omit<ISinglePanelProps, 'rangeDate' | 'hoverRangeDate'>
> = props => {
  const { defaultPanelDate, onChangePanel, ...restProps } = props;
  const { i18n } = useContext(PickerContext);
  const { panelDate, setPanelDate } = usePanelDate(defaultPanelDate);
  const [showYear, setShowYear] = useState<boolean>(false);

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
      <QuarterPanelBody {...restProps} defaultPanelDate={panelDate} />
    </>
  );

  const onClickYear = useCallback(
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
