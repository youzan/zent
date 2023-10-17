import { useState } from 'react';
import DatePicker from './DatePicker';
import { Lunar } from 'lunar-typescript';

export const LunarDatePicker = () => {
  const [date, setDate] = useState();

  const handleDateChange = val => {
    setDate(val);
  };

  const lunarValueFormatter = (dateValue: Date) => {
    const d = Lunar.fromDate(dateValue);
    return `${d.getYear()}年${d.getMonthInChinese()}月${d.getDayInChinese()}(${dateValue.toLocaleDateString()})`;
  };

  return (
    <DatePicker
      showLunarDate={true}
      lunarValueFormatter={lunarValueFormatter}
      value={date}
      onChange={handleDateChange}
    />
  );
};

export default LunarDatePicker;
