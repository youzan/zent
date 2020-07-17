import {
  getRangeValuesWithValueType,
  generateDateConfig,
  getSelectedValueWithDate,
  getCallbackValueWithDate,
  getCallbackValueRangeWithDate,
  leftPad,
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
    getSelectedValueWithDate(null, generateDateConfig.week, {
      weekStartsOn: 1,
    });
    getCallbackValueWithDate(null, 'string', format);
    getCallbackValueWithDate(null, 'date', format);
    getCallbackValueRangeWithDate(
      null,
      'string',
      format,
      generateDateConfig.day
    );
  });

  it('handler', () => {
    expect(leftPad('1', 2, '1')).toBe('11');
    expect(leftPad('1')).toBe('01');
  });
});
