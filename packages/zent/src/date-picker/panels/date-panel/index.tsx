import * as React from 'react';
import I18nLocaleContext from '../../context/I18nLocaleContext';

import DatePickerBody from './DateBody';
import DatePickerFooter from './DateFooter';
import PanelHeader, { TitleCommonNode } from '../../components/PanelHeader';
import PanelSubHeader from './PanelSubHeader';
import { ISingleDatePanelProps, IDisabledTimes } from '../../types';
import { addMonths, addYears, setYear, setDate, setMonth } from 'date-fns';
export interface IDatePickerPanelProps extends ISingleDatePanelProps {
  popText?: string;
  hideFooter?: boolean;
  showTime?: boolean;
  disabledTimes?: IDisabledTimes;
}
const DatePickerPanel: React.FC<IDatePickerPanelProps> = props => {
  const {
    selected,
    showTime,
    hideFooter = false,
    defaultPanelDate,
    onSelected,
    onChangePanel,
    ...resetProps
  } = props;
  const [panelDate, setPanelDate] = React.useState<Date>(defaultPanelDate);
  const { i18n } = React.useContext(I18nLocaleContext);

  const titleNode = React.useMemo(
    () => (
      <>
        <TitleCommonNode
          text={defaultPanelDate.getFullYear()}
          unit={i18n.panel.year}
          onClick={() => onChangePanel('year')}
        />
        <TitleCommonNode
          text={i18n.panel.monthNames[defaultPanelDate.getMonth()]}
          onClick={() => onChangePanel('month')}
        />
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [defaultPanelDate]
  );

  // 切换面板更改日期 同时保留时分秒
  const setSelectedDate = (val: Date) => {
    if (!selected) {
      return onSelected(val);
    }
    let selectedDate = selected;
    selectedDate = setYear(selectedDate, val.getFullYear());
    selectedDate = setMonth(selectedDate, val.getMonth());
    selectedDate = setDate(selectedDate, val.getDate());
    onSelected(selectedDate, !showTime);
  };

  const DateBody = (
    <>
      <PanelHeader
        showSuper={true}
        titleNode={titleNode}
        onPrev={() => setPanelDate(addMonths(defaultPanelDate, -1))}
        onNext={() => setPanelDate(addMonths(defaultPanelDate, 1))}
        onSuperPrev={() => setPanelDate(addYears(defaultPanelDate, -1))}
        onSuperNext={() => setPanelDate(addYears(defaultPanelDate, 1))}
      />
      <PanelSubHeader names={i18n.panel.dayNames} />
      <DatePickerBody
        {...resetProps}
        selected={selected}
        onSelected={setSelectedDate}
        defaultPanelDate={panelDate}
      />
    </>
  );

  return (
    <>
      {DateBody}
      {!hideFooter && <DatePickerFooter {...props} />}
    </>
  );
};
export default DatePickerPanel;
