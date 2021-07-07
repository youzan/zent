import { addDays } from 'date-fns';

import {
  getRangeValuesWithValueType,
  dateConfig,
  getSelectedValueWithDate,
  getCallbackValueWithDate,
  getCallbackValueRangeWithDate,
} from '../../src/date-picker/utils';

const today = new Date();
const tomorrow = addDays(today, 1);
const format = 'YYYY-MM-DD';

describe('Utils', () => {
  it('getRangeValuesWithValueType', () => {
    getRangeValuesWithValueType('number', format, [today, tomorrow]);
    getRangeValuesWithValueType('string', format, [today, tomorrow]);
    getRangeValuesWithValueType('date', format, [today, tomorrow]);
    getRangeValuesWithValueType('number', format, [today]);
    getRangeValuesWithValueType('number', format, [null, today]);
  });

  it('getValueInSinglePicker', () => {
    getSelectedValueWithDate(null, dateConfig.week, {
      weekStartsOn: 1,
    });
    getCallbackValueWithDate(null, 'string', format);
    getCallbackValueWithDate(null, 'date', format);
    getCallbackValueRangeWithDate(today, 'string', format, dateConfig.date);
  });
});
