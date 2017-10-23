import React from 'react';
import { mount } from 'enzyme';

import Simple from './comp/simple';

describe('Simple', () => {
  const wrapper = mount(<Simple />);

  it('table render', () => {
    expect(wrapper.find('.zent-table-container').length).toBe(1);
  });

  it('table Head render', () => {
    expect(wrapper.find('.zent-table-container Head').length).toBe(1);
    expect(wrapper.find('.zent-table-container Head .cell').length).toBe(4);
    expect(
      wrapper
        .find('.zent-table-container Head .cell')
        .first()
        .hasClass('cell')
    ).toBe(true);
    expect(
      wrapper
        .find('.zent-table-container Head .cell')
        .first()
        .text()
    ).toBe('商品');
    expect(
      wrapper
        .find('.zent-table-container Head .cell')
        .last()
        .text()
    ).toBe('总销量');
  });

  it('table Body render', () => {
    expect(wrapper.find('.zent-table-container Body').length).toBe(1);
    expect(wrapper.find('.zent-table-container Body .tr').length).toBe(3);
    expect(
      wrapper
        .find('.zent-table-container Body .tr')
        .first()
        .find('Td').length
    ).toBe(4);
    expect(
      wrapper
        .find('.zent-table-container Body .tr Td')
        .first()
        .text()
    ).toBe('5024278');
    expect(
      wrapper
        .find('.zent-table-container Body .tr Td')
        .last()
        .text()
    ).toBe('0');
  });

  // HACK: branch line unused onChange simple.js line 46
  it('table onChange', () => {
    wrapper.find('Table').prop('onChange')({ current: 1 });
  });

  it('table unmount', () => {
    wrapper.unmount();
    expect(wrapper.find('.zent-table-container').length).toBe(0);
  });
});
