/* eslint-disable */
import { useState } from 'react';
import DatePicker from './DatePicker';
import { Lunar, HolidayUtil } from 'lunar-typescript';
import * as React from 'react';
import classNames from 'classnames';

export const LunarDatePicker = () => {
  const [date, setDate] = useState();
  const [selectDate, setSelectDate] = React.useState(new Date());
  console.log('selectDate: ', selectDate);

  const handleDateChange = val => {
    console.log(val, 'Date Val');
    setDate(val);
    setSelectDate(val);
  };

  const cellRender: any = (
    date: {
      toDate: () => Date;
      get: (arg0: string) => {};
      isSame: (arg0: number, arg1: string) => any;
    },
    info: {
      type: string;
      originNode: React.DetailedReactHTMLElement<any, HTMLElement>;
    }
  ): any => {
    const d = Lunar.fromDate(date.toDate());
    const lunar = d.getDayInChinese();
    const solarTerm = d.getJieQi();
    const h = HolidayUtil.getHoliday(
      date.get('year') as number,
      (date.get('month') as number) + 1,
      date.get('date') as number
    );
    const displayHoliday =
      h?.getTarget() === h?.getDay() ? h?.getName() : undefined;
    if (info.type === 'date') {
      return React.cloneElement(info.originNode, {
        ...info.originNode.props,
        className: classNames(`zent-datepicker-lunar-dateCell`, {
          // ['zent-datepicker-lunar-dateCell']: selectDate.isSame(date, 'date'),
          ['zent-datepicker-lunar-today']: date.isSame(Date.now(), 'date'),
        }),
        children: (
          <div className={'zent-datepicker-lunar-dateCell'}>
            {date.get('date')}
            {info.type === 'date' && (
              <div className={'zent-datepicker-lunar-lunar'}>
                {displayHoliday || solarTerm || lunar}
              </div>
            )}
          </div>
        ),
      });
    }
    if (info.type === 'month') {
      // Due to the fact that a solar month is part of the lunar month X and part of the lunar month X+1,
      // when rendering a month, always take X as the lunar month of the month
      const d2 = Lunar.fromDate(
        new Date(date.get('year') as number, date.get('month') as number)
      );
      const month = d2.getMonthInChinese();
      return (
        <div
          className={classNames('zent-datepicker-lunar-monthCell', {
            // ['zent-datepicker-lunar-monthCellCurrent']: selectDate.isSame(date, 'month'),
          })}
        >
          {(date.get('month') as number) + 1}月（{month}月）
        </div>
      );
    }

    return null;
  };

  return (
    <DatePicker
      fullCellRender={cellRender as any}
      value={date}
      onChange={handleDateChange}
    />
  );
};

export default LunarDatePicker;
