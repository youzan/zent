import React from 'react';
import { mount } from 'enzyme';
import Pagination from 'pagination';

describe('Pagination', () => {
  it('Paginatio will render a default structure with some custom props', () => {
    const wrapper = mount(
      <Pagination
        totalItem={1000}
        pageSize={10}
        current={1}
        maxPageToshow={100}
      />
    );
    /**
     * .zent-pagination
     *   span.zent-pagination__info
     *     span.total
     *     span.each
     *   .pagination-list // NOTE: should use ul?
     *     div.pager
     *     ...
     *     div.pager.pager--omni
     *     div.pager.pager--jump
     *       input.pager__input
     *       span.pager__suffix
     */
    expect(wrapper.children().length).toBe(2);
    expect(wrapper.find('.zent-pagination__info').length).toBe(1);
    expect(wrapper.find('.zent-pagination__info').children().length).toBe(2);
    expect(
      wrapper
        .find('.zent-pagination__info')
        .childAt(0)
        .type()
    ).toBe('span');
    expect(
      wrapper
        .find('.zent-pagination__info')
        .childAt(1)
        .type()
    ).toBe('span');
    expect(wrapper.find('.pagination-list').length).toBe(1);
    expect(wrapper.find('.pagination-list').children().length).toBe(8);
    expect(
      wrapper
        .find('.pagination-list')
        .children('div')
        .every('.pager')
    ).toBe(true);
  });

  it('Pagination has type check(pageSize) and will throw error handled by react or outside', () => {
    // HACK
    expect(() => {
      mount(
        <Pagination
          totalItem={1000}
          pageSize={-10}
          current={1}
          maxPageToshow={100}
        />
      );
    }).not.toThrow();
    expect(() => {
      mount(
        <Pagination
          totalItem={1000}
          pageSize={'foo'}
          current={1}
          maxPageToshow={100}
        />
      );
    }).toThrow();
    expect(() => {
      mount(
        <Pagination
          totalItem={1000}
          pageSize={[]}
          current={1}
          maxPageToshow={100}
        />
      );
    }).toThrow();
    expect(() => {
      mount(
        <Pagination
          totalItem={1000}
          pageSize={[10, 'foo']}
          current={1}
          maxPageToshow={100}
        />
      );
    }).not.toThrow();
    expect(() => {
      mount(
        <Pagination
          totalItem={1000}
          pageSize={[10, 'foo']}
          current={1}
          maxPageToshow={100}
        />
      );
    }).not.toThrow();

    expect(() => {
      mount(
        <Pagination
          totalItem={1000}
          pageSize={[10, 20, 30]}
          current={1}
          maxPageToshow={100}
        />
      );
    }).not.toThrow();
  });

  it('Pagination will not load omni when item number is not more than 5', () => {
    let wrapper = mount(
      <Pagination totalItem={5} pageSize={2} current={1} maxPageToshow={5} />
    );
    expect(wrapper.find('.pager--omni').length).toBe(0);
    expect(wrapper.find('.pager').length).toBe(5);
    expect(
      wrapper
        .find('.pager')
        .at(2)
        .text()
    ).toBe('2 ');
    wrapper = mount(
      <Pagination totalItem={20} pageSize={10} current={1} maxPageToShow={1} />
    );
    expect(wrapper.find('.pager--omni').length).toBe(0);
    expect(wrapper.find('.pager').length).toBe(3);
    expect(
      wrapper
        .find('.pager')
        .at(1)
        .text()
    ).toBe('1 ');
  });

  it('Pagination has its omni strategy', () => {
    let wrapper = mount(
      <Pagination
        totalItem={100}
        pageSize={10}
        current={1}
        maxPageToshow={100}
      />
    );
    expect(wrapper.find('.pager--omni').length).toBe(1);
    expect(wrapper.find('.pager').length).toBe(8);
    expect(
      wrapper
        .find('.pager')
        .at(1)
        .text()
    ).toBe('1 ');
    wrapper = mount(
      <Pagination
        totalItem={100}
        pageSize={[5, { value: 10, isCurrent: true }]}
        current={10}
        maxPageToshow={100}
      />
    );
    expect(wrapper.find('.pager--omni').length).toBe(1);
    expect(wrapper.find('.pager').length).toBe(8);
    expect(
      wrapper
        .find('.pager')
        .at(2)
        .hasClass('pager--omni')
    ).toBe(true);
    wrapper.setProps({ current: 5 });
    expect(wrapper.find('.pager--omni').length).toBe(2);
    expect(wrapper.find('.pager').length).toBe(10);
    expect(
      wrapper
        .find('.pager')
        .at(1)
        .text()
    ).toBe('1 ');
    expect(
      wrapper
        .find('.pager')
        .at(7)
        .text()
    ).toBe('10 ');

    // HACK: branch
    expect(() => {
      wrapper.getNode().getCurrentPageSize([{ value: 10 }, { value: 20 }]);
    }).toThrow();
  });

  it('Pagination has setPageSize method, and can have custom setPageSize prop', () => {
    let wrapper = mount(
      <Pagination
        totalItem={1000}
        pageSize={[20, { value: 30, isCurrent: true }]}
        current={1}
        maxPageToshow={100}
      />
    );
    expect(wrapper.find('.zent-select').length).toBe(1);
    expect(wrapper.find('.pager').length).toBe(8);
    expect(
      wrapper
        .find('.pager')
        .at(5)
        .text()
    ).toBe('34 ');
    wrapper.setProps({
      pageSize: [{ value: 20, isCurrent: true }, 30]
    });
    expect(wrapper.find('.pager').length).toBe(8);
    expect(
      wrapper
        .find('.pager')
        .at(5)
        .text()
    ).toBe('50 ');

    const onChangeMock = jest.fn().mockImplementation(arg => {
      // simulate outside setState()
      wrapper.setProps({ current: arg });
    });

    wrapper = mount(
      <Pagination
        totalItem={1000}
        pageSize={[20, { value: 30, isCurrent: true }]}
        current={1}
        maxPageToshow={100}
        onChange={onChangeMock}
      />
    );
    expect(wrapper.state('currentPageSize')).toBe(30);
    wrapper.setProps({
      pageSize: [{ value: 20, isCurrent: true }, 30]
    });
    expect(wrapper.prop('current')).toBe(1);
    expect(wrapper.state('currentPageSize')).toBe(20);
    wrapper
      .find('.pager')
      .at(2)
      .simulate('click');
    expect(wrapper.prop('current')).toBe(2);
    expect(wrapper.state('currentPageSize')).toBe(20);

    wrapper.setProps({ pageSize: 10 });
    expect(wrapper.prop('current')).toBe(2);
    expect(wrapper.state('currentPageSize')).toBe(10);

    wrapper.find('Prefix').node.changePageSize(null, { text: '20' });
    expect(wrapper.state('currentPageSize')).toBe(20);
  });

  it('Pagination has its core function, change current page with click on Pager or change on Jumper', () => {
    // with undefined onChange, nothing been done when click happens
    let wrapper = mount(
      <Pagination
        totalItem={100}
        pageSize={[10, 20]}
        current={1}
        maxPageToshow={10}
      />
    );
    wrapper
      .find('.pager')
      .at(1)
      .simulate('click');
    expect(wrapper.prop('current')).toBe(1);
    wrapper
      .find('.pager')
      .at(2)
      .simulate('click');
    expect(wrapper.prop('current')).toBe(1);

    const onChangeMock = jest.fn().mockImplementation(arg => {
      // simulate outside setState()
      wrapper.setProps({ current: arg });
    });

    wrapper = mount(
      <Pagination
        totalItem={100}
        pageSize={[10, 20]}
        current={1}
        maxPageToshow={10}
        onChange={onChangeMock}
      />
    );

    wrapper
      .find('.pager')
      .at(1)
      .simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(0);
    wrapper
      .find('.pager')
      .at(2)
      .simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(onChangeMock.mock.calls[0][0]).toBe(2);
    wrapper
      .find('.pager')
      .at(3)
      .simulate('click');
    expect(onChangeMock.mock.calls.length).toBe(2);
    expect(onChangeMock.mock.calls[1][0]).toBe(3);
    expect(wrapper.prop('current')).toBe(3);

    expect(wrapper.find('.pager__input').length).toBe(1);
    wrapper
      .find('.pager__input')
      .simulate('change', { target: { value: '5' } });
    expect(wrapper.find('.pager__input').props().value).toBe('5');

    // HACK: branch
    wrapper.find('.pager__input').simulate('keyUp', { key: 'notEnter' });

    wrapper.find('.pager__input').simulate('keyUp', { key: 'Enter' });
    expect(onChangeMock.mock.calls.length).toBe(3);
    expect(wrapper.prop('current')).toBe(5);
    // trim()
    wrapper
      .find('.pager__input')
      .simulate('change', { target: { value: '2     ' } });
    wrapper.find('.pager__input').simulate('keyUp', { key: 'Enter' });
    expect(wrapper.prop('current')).toBe(2);
    wrapper
      .find('.pager__input')
      .simulate('change', { target: { value: '-1' } });
    wrapper.find('.pager__input').simulate('keyUp', { key: 'Enter' });
    expect(wrapper.prop('current')).toBe(2);
    wrapper
      .find('.pager__input')
      .simulate('change', { target: { value: '0' } });
    wrapper.find('.pager__input').simulate('keyUp', { key: 'Enter' });
    expect(wrapper.prop('current')).toBe(0);
    expect(
      wrapper
        .find('.pager')
        .at(1)
        .text()
    ).toBe('1 ');
    expect(
      wrapper
        .find('.pager')
        .at(1)
        .hasClass('pager--current')
    ).toBe(true);
    expect(
      wrapper
        .find('.pager')
        .at(0)
        .hasClass('pager--disabled')
    ).toBe(true);
    wrapper
      .find('.pager__input')
      .simulate('change', { target: { value: '10000' } });
    wrapper.find('.pager__input').simulate('keyUp', { key: 'Enter' });
    expect(wrapper.prop('current')).toBe(10);
    expect(
      wrapper
        .find('.pager')
        .at(5)
        .text()
    ).toBe('10 ');
    expect(
      wrapper
        .find('.pager')
        .at(5)
        .hasClass('pager--current')
    ).toBe(true);
    expect(
      wrapper
        .find('.pager')
        .at(6)
        .hasClass('pager--disabled')
    ).toBe(true);
  });
});
