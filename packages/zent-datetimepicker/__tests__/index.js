/* eslint-disable */

import React from 'react';
import { mount } from 'enzyme';

import DatePicker, { MonthPicker, DateRangePicker } from '../src';

describe('DateTimePicker', () => {
  it('DatePicker has disable prop', () => {
    const wrapper = mount(<DatePicker format="yyyy-mm-dd" disabledTime={val => val.getMonth() < 6 } disabled onChange={() => { return undefined }} />)
  });
});
