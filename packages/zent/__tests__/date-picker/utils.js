import {
  getRangeValuesWithValueType,
  dateConfig,
  getSelectedValueWithDate,
  getCallbackValueWithDate,
  getCallbackValueRangeWithDate,
} from 'date-picker/utils';
import { addDays } from 'date-fns';

const today = new Date();
const tomorrow = addDays(today, 1);
const format = 'YYYY-MM-DD';

describe('Utils', () => {
  it('getRangeValuesWithValueType', () => {
    getRangeValuesWithValueType([today, tomorrow], 'number', format);
    getRangeValuesWithValueType([today, tomorrow], 'string', format);
    getRangeValuesWithValueType([today, tomorrow], 'date', format);
    getRangeValuesWithValueType([today], 'number', format);
    getRangeValuesWithValueType([null, today], 'number', format);
  });

  it('getValueInSinglePicker', () => {
    getSelectedValueWithDate(null, dateConfig.week, {
      weekStartsOn: 1,
    });
    getCallbackValueWithDate(null, 'string', format);
    getCallbackValueWithDate(null, 'date', format);
    getCallbackValueRangeWithDate(null, 'string', format, dateConfig.day);
  });
});
