import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from 'button';
import Combine from './comp/combine';

Enzyme.configure({ adapter: new Adapter() });

describe('Combine', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Combine />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('pagination render', () => {
    expect(wrapper.find('.zent-pagination').length).toBe(1);
    expect(
      wrapper.find('.zent-pagination .zent-pagination-page-list--normal').length
    ).toBe(1);
    expect(
      wrapper
        .find(
          '.zent-pagination .zent-pagination-page-list--normal .zent-pagination-arrow-button'
        )
        .first()
        .childAt(0)
        .childAt(0)
        .hasClass('zent-btn-disabled')
    ).toBeTruthy();
    expect(
      wrapper
        .find(
          '.zent-pagination .zent-pagination-page-list--normal .zent-pagination-page-number-button'
        )
        .first()
        .childAt(0)
        .childAt(0)
        .hasClass('zent-btn-primary')
    ).toBeTruthy();
  });

  it('header sort change', () => {
    expect(wrapper.find('Head .sort-col--active .caret-up').length).toBe(1);
    expect(wrapper.find('Head .sort-col--active .caret-down').length).toBe(1);

    wrapper.find('Head .sort-col--active .caret-up').simulate('click');
    expect(
      wrapper.find('Head .sort-col--active .caret-up').hasClass('sort-active')
    ).toBe(true);

    wrapper.find('Head .sort-col--active .caret-down').simulate('click');
    expect(
      wrapper.find('Head .sort-col--active .caret-down').hasClass('sort-active')
    ).toBe(false);

    wrapper.find('Head .sort-col--active .caret-down').simulate('click');
    expect(
      wrapper.find('Head .sort-col--active .caret-down').hasClass('sort-active')
    ).toBe(true);
  });

  it('pagination click change', () => {
    wrapper
      .find(
        '.zent-pagination .zent-pagination-page-list--normal .zent-pagination-page-number-button'
      )
      .at(2)
      .simulate('click');

    expect(
      wrapper
        .find(
          '.zent-pagination .zent-pagination-page-list--normal .zent-pagination-page-number-button'
        )
        .at(2)
        .childAt(0)
        .childAt(0)
        .hasClass('zent-btn-primary')
    ).toBeTruthy();
  });

  it('pagination current change', () => {
    wrapper.setState({ current: 3 });

    expect(
      wrapper
        .find(
          '.zent-pagination .zent-pagination-page-list--normal .zent-pagination-page-number-button'
        )
        .find(Button)
        .at(2)
        .childAt(0)
        .childAt(0)
        .hasClass('zent-btn-primary')
    ).toBeTruthy();
  });

  it('pagination total info', () => {
    wrapper.setState({ total: 1000 });
    expect(
      wrapper
        .find('.zent-pagination-count')
        .at(0)
        .text()
    ).toContain('1000');
  });

  it('selectRows', () => {
    expect(wrapper.find('Checkbox').length).toBe(4);
    wrapper
      .find('Head Checkbox input')
      .simulate('change', { target: { checked: true } });
    wrapper.find('Checkbox').forEach(node => {
      expect(node.prop('checked')).toBe(true);
    });
    wrapper
      .find('Head Checkbox input')
      .simulate('change', { target: { checked: false } });
    wrapper.find('Checkbox').forEach(node => {
      expect(node.prop('checked')).toBe(false);
    });
    wrapper
      .find('Body Checkbox input')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(
      wrapper
        .find('Body Checkbox')
        .at(0)
        .prop('checked')
    ).toBe(true);

    // HACK: branch Table.js onSelectOneRow
    wrapper
      .find('Body Checkbox input')
      .at(0)
      .simulate('change', { target: { checked: true } });
    expect(
      wrapper
        .find('Body Checkbox input')
        .at(0)
        .prop('checked')
    ).toBe(false);
    wrapper
      .find('Body Checkbox input')
      .at(0)
      .simulate('change', { target: { checked: false } });
    expect(
      wrapper
        .find('Body Checkbox')
        .at(0)
        .prop('checked')
    ).toBe(false);
    wrapper
      .find('Body Checkbox input')
      .at(0)
      .simulate('change', { target: { checked: false } });
    expect(
      wrapper
        .find('Body Checkbox')
        .at(0)
        .prop('checked')
    ).toBe(false);
  });
});
