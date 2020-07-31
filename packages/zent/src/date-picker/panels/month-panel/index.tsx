import * as React from 'react';
import { addYears, setYear } from 'date-fns';
import PanelHeader, { Title } from '../../components/PanelHeader';
import MonthPanelBody from './MonthBody';
import YearPanel from '../year-panel';

import PickerContext from '../../context/PickerContext';
import usePanelDate from '../../hooks/usePanelDate';
import { ISinglePanelProps } from '../../types';

const MonthPickerPanel: React.FC<ISinglePanelProps> = props => {
  const { defaultPanelDate, selected, onSelected, disabledPanelDate } = props;
  const { i18n } = React.useContext(PickerContext);
  const { panelDate, setPanelDate } = usePanelDate(defaultPanelDate);
  const [showYear, setShowYear] = React.useState<boolean>(false);

  const MonthPanelNode = (
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
      <MonthPanelBody
        disabledPanelDate={disabledPanelDate}
        defaultPanelDate={panelDate}
        selected={selected}
        onSelected={onSelected}
      />
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

  return <>{!showYear ? MonthPanelNode : YearPanelNode}</>;
};
export default MonthPickerPanel;
