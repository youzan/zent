import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Cascader from 'cascader';

const dispatchWithTimers = (node, event, ...arg) => {
  node.dispatchEvent(event, ...arg);
  jest.runAllTimers();
};

describe('Cascader', () => {
  it('className default to zent-cascader ', () => {
    const wrapper = mount(<Cascader />);
    expect(wrapper.hasClass('zent-cascader')).toBe(true);
  });

  it('can have custom prefix', () => {
    const wrapper = mount(<Cascader prefix="rc" />);
    expect(wrapper.hasClass('rc-cascader')).toBe(true);
  });

  it('can have custom className', () => {
    const wrapper = mount(<Cascader className="rc-cascader-custom" />);
    expect(wrapper.hasClass('rc-cascader-custom')).toBe(true);
  });

  it('can have custom placeholder', () => {
    const wrapper = mount(<Cascader placeholder="hold on" />);
    expect(
      wrapper
        .find('.zent-cascader__select-text')
        .find('span')
        .text()
    ).toBe('hold on');
  });

  it('can have custom popClassName', () => {
    const wrapper = mount(<Cascader popClassName="rc-cascader-popover" />);

    wrapper.find('.zent-cascader__select').simulate('click');
    jest.runAllTimers();
    expect(document.querySelectorAll('.rc-cascader-popover').length).toBe(1);

    dispatchWithTimers(window, new MouseEvent('click'));
    expect(document.querySelectorAll('.rc-cascader-popover').length).toBe(0);
  });

  it('has default value and options', () => {
    const value = [1, 4, 5];
    const options = [
      {
        id: 1,
        title: 'root',
        children: [
          {
            id: 2,
            title: 'son',
            children: [
              {
                id: 3,
                title: 'grandSon'
              }
            ]
          },
          {
            id: 4,
            title: 'anotherSon',
            children: [
              {
                id: 5,
                title: 'anotherGrandSon'
              }
            ]
          }
        ]
      }
    ];
    const title = ['省份', '城市', '县区'];

    const wrapper = mount(
      <Cascader value={value} options={options} title={title} />
    );
    expect(
      wrapper
        .find('.zent-cascader__select-text')
        .find('span')
        .text()
    ).toBe('root / anotherSon / anotherGrandSon');

    wrapper.find('.zent-cascader__select').simulate('click');
    jest.runAllTimers();

    expect(wrapper.hasClass('open')).toBe(true);
    const allTabs = document.querySelectorAll('.zent-tabs-tab');
    expect(allTabs.length).toBe(3);
    expect(allTabs[0].textContent).toBe('省份');
    expect(allTabs[1].textContent).toBe('城市');
    expect(allTabs[2].textContent).toBe('县区');
    expect(allTabs[2].classList.contains('zent-tabs-actived')).toBe(true);

    dispatchWithTimers(window, new MouseEvent('click'));
    expect(wrapper.hasClass('open')).toBe(false);
  });

  it('onChange when click item', () => {
    const value = [];
    const options = [
      {
        id: 1,
        title: 'root',
        children: [
          {
            id: 2,
            title: 'son',
            children: [
              {
                id: 3,
                title: 'grandSon'
              }
            ]
          },
          {
            id: 4,
            title: 'anotherSon',
            children: [
              {
                id: 5,
                title: 'anotherGrandSon'
              }
            ]
          }
        ]
      }
    ];

    const wrapper = mount(<Cascader value={value} options={options} />);

    wrapper.find('.zent-cascader__select').simulate('click');
    jest.runAllTimers();

    const pop = new ReactWrapper(wrapper.instance().cascader, true);
    expect(pop.find('.zent-cascader__list-link').length).toBe(1);
    expect(
      pop
        .find('.zent-cascader__list-link')
        .at(0)
        .text()
    ).toBe('root');

    pop
      .find('.zent-cascader__list-link')
      .at(0)
      .simulate('click');
    jest.runAllTimers();

    dispatchWithTimers(window, new MouseEvent('click'));
  });

  it('changeOnSelect when click item', () => {
    const value = [];
    const options = [
      {
        id: 1,
        title: 'root',
        children: [
          {
            id: 2,
            title: 'son',
            children: [
              {
                id: 3,
                title: 'grandSon'
              }
            ]
          },
          {
            id: 4,
            title: 'anotherSon',
            children: [
              {
                id: 5,
                title: 'anotherGrandSon'
              }
            ]
          }
        ]
      }
    ];

    let wrapper;

    const onChangeMock = jest.fn().mockImplementation(() => {});

    const isChangeOnSelect = true;
    wrapper = mount(
      <Cascader
        value={value}
        options={options}
        onChange={onChangeMock}
        changeOnSelect={isChangeOnSelect}
      />
    );

    wrapper.find('.zent-cascader__select').simulate('click');
    jest.runAllTimers();

    const pop = new ReactWrapper(wrapper.instance().cascader, true);

    pop
      .find('.zent-cascader__list-link')
      .at(0)
      .simulate('click');
    jest.runAllTimers();
    expect(
      wrapper
        .find('.zent-cascader__select-text')
        .find('span')
        .text()
    ).toBe('root');
    expect(onChangeMock.mock.calls.length).toBe(1);

    dispatchWithTimers(window, new MouseEvent('click'));
  });

  it('loadMore when click item', () => {
    const value = [];
    const options = [
      {
        id: 1,
        title: 'root'
      }
    ];

    let wrapper;
    const loadMore = (root, stage) =>
      new Promise(resolve => {
        setTimeout(() => {
          let isLeaf = stage >= 2;
          root.children = [
            {
              id: `66666${stage}`,
              title: `Label${stage}`,
              isLeaf
            }
          ];
          wrapper.setProps({
            options: [...options]
          });
          resolve();
        }, 500);
      });
    wrapper = mount(
      <Cascader value={value} options={options} loadMore={loadMore} />
    );

    wrapper.find('.zent-cascader__select').simulate('click');
    jest.runAllTimers();

    const pop = new ReactWrapper(wrapper.instance().cascader, true);

    pop
      .find('.zent-cascader__list-link')
      .at(0)
      .simulate('click');
    jest.runAllTimers();

    dispatchWithTimers(window, new MouseEvent('click'));
  });
});
