import DatePanel from './date-panel';
import WeekPanel from './week-panel';
import MonthPanel from './month-panel';
import QuarterPanel from './quarter-panel';
import YearPanel from './year-panel';
const SinglePanelMap = {
  date: DatePanel,
  week: WeekPanel,
  month: MonthPanel,
  quarter: QuarterPanel,
  year: YearPanel,
};
export default SinglePanelMap;
