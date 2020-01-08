import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Cascader from 'cascader';

Enzyme.configure({ adapter: new Adapter() });

const simulateWithTimers = (node, event, ...arg) => {
  node.simulate(event, ...arg);
  jest.runAllTimers();
};

const simulateRawWithTimers = (node, event, ...arg) => {
  Simulate[event](node, ...arg);
  jest.runAllTimers();
};

beforeAll(() => {
  jest.useFakeTimers();
});

describe('Cascader', () => {
  it('className default to zent-cascader ', () => {
    const wrapper = mount(<Cascader />);
    expect(wrapper.find('.zent-cascader').length).toBe(1);
    wrapper.unmount();
  });

  it('can have custom className', () => {
    const wrapper = mount(<Cascader className="rc-cascader-custom" />);
    expect(wrapper.hasClass('rc-cascader-custom')).toBe(true);
    wrapper.unmount();
  });

  it('can have custom placeholder', () => {
    const wrapper = mount(<Cascader placeholder="hold on" />);
    expect(
      wrapper
        .find('.zent-cascader__select-text')
        .find('span')
        .text()
    ).toBe('hold on');
    wrapper.unmount();
  });

  it('can have custom popClassName', () => {
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
                title: 'grandSon',
              },
            ],
          },
          {
            id: 4,
            title: 'anotherSon',
            children: [
              {
                id: 5,
                title: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];

    const wrapper = mount(
      <Cascader
        popClassName="rc-cascader-popover"
        value={value}
        options={options}
      />
    );

    simulateWithTimers(wrapper.find('.zent-cascader__select'), 'click');
    wrapper.update();
    expect(document.querySelectorAll('.rc-cascader-popover').length).toBe(1);

    simulateWithTimers(wrapper.find('.zent-cascader__select'), 'click');
    wrapper.update();
    expect(document.querySelectorAll('.rc-cascader-popover').length).toBe(0);
    wrapper.unmount();
  });

  it('can customize display text', () => {
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
                title: 'grandSon',
              },
            ],
          },
          {
            id: 4,
            title: 'anotherSon',
            children: [
              {
                id: 5,
                title: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];
    const title = ['省份', '城市', '县区'];
    const textFn = val =>
      val && val.length > 0 ? val[val.length - 1].title : '';

    const wrapper = mount(
      <Cascader
        value={value}
        options={options}
        title={title}
        displayText={textFn}
      />
    );

    expect(wrapper.find('.zent-cascader__select-text-content').text()).toBe(
      'anotherGrandSon'
    );
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
                title: 'grandSon',
              },
            ],
          },
          {
            id: 4,
            title: 'anotherSon',
            children: [
              {
                id: 5,
                title: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
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

    expect(wrapper.find('.zent-cascader').hasClass('zent-cascader--open')).toBe(
      true
    );
    const allTabs = document.querySelectorAll('.zent-tabs-tab');
    expect(allTabs.length).toBe(3);
    expect(allTabs[0].textContent).toBe('省份');
    expect(allTabs[1].textContent).toBe('城市');
    expect(allTabs[2].textContent).toBe('县区');
    expect(allTabs[2].classList.contains('zent-tabs-tab__actived')).toBe(true);

    simulateRawWithTimers(document.querySelector('.zent-tabs-tab'), 'click');
    wrapper.update();

    simulateWithTimers(wrapper.find('.zent-cascader__select'), 'click');
    wrapper.update();
    expect(wrapper.hasClass('zent-cascader--open')).toBe(false);
    wrapper.unmount();
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
                title: 'grandSon',
              },
            ],
          },
          {
            id: 4,
            title: 'anotherSon',
            children: [
              {
                id: 5,
                title: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];

    const wrapper = mount(<Cascader value={value} options={options} />);

    wrapper.find('.zent-cascader__select').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-content');
    expect(pop.querySelectorAll('.zent-cascader__list-link').length).toBe(1);
    expect(
      pop.querySelectorAll('.zent-cascader__list-link')[0].textContent
    ).toBe('root');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__list-link')[0],
      'click'
    );

    wrapper.unmount();
  });

  it('can have menu type', () => {
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
                title: 'grandSon',
              },
            ],
          },
          {
            id: 4,
            title: 'anotherSon',
            children: [
              {
                id: 5,
                title: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];

    const wrapper = mount(
      <Cascader type="menu" value={value} options={options} />
    );

    wrapper.find('.zent-cascader__select').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-content');

    expect(pop.querySelectorAll('.zent-cascader__menu-item').length).toBe(1);
    expect(
      pop.querySelectorAll('.zent-cascader__menu-item')[0].textContent
    ).toBe('root');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__menu-item')[0],
      'click'
    );

    wrapper.unmount();
  });

  it('can hover to expand', () => {
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
                title: 'grandSon',
              },
            ],
          },
          {
            id: 4,
            title: 'anotherSon',
            children: [
              {
                id: 5,
                title: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];

    const wrapper = mount(
      <Cascader
        type="menu"
        value={value}
        options={options}
        expandTrigger="hover"
      />
    );

    wrapper.find('.zent-cascader__select').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-content');

    expect(pop.querySelectorAll('.zent-cascader__menu-item').length).toBe(1);
    expect(
      pop.querySelectorAll('.zent-cascader__menu-item')[0].textContent
    ).toBe('root');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__menu-item')[0],
      'mouseEnter'
    );

    expect(pop.querySelectorAll('.zent-cascader__menu').length).toBe(2);

    wrapper.unmount();
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
                title: 'grandSon',
              },
            ],
          },
          {
            id: 4,
            title: 'anotherSon',
            children: [
              {
                id: 5,
                title: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
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

    const pop = document.querySelector('.zent-popover-content');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__list-link')[0],
      'click'
    );
    wrapper.update();

    expect(
      wrapper
        .find('.zent-cascader__select-text')
        .find('span')
        .text()
    ).toBe('root');
    expect(onChangeMock.mock.calls.length).toBe(1);

    wrapper.unmount();
  });

  it('loadMore when click item', () => {
    const value = [];
    const options = [
      {
        id: 1,
        title: 'root',
        isLeaf: false,
      },
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
              isLeaf,
            },
          ];
          wrapper.setProps({
            options: [...options],
          });
          resolve();
        }, 500);
      });
    wrapper = mount(
      <Cascader value={value} options={options} loadMore={loadMore} />
    );

    wrapper.find('.zent-cascader__select').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-content');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__list-link')[0],
      'click'
    );

    wrapper.unmount();
  });

  it('loadMore when click item and menu type', () => {
    const value = [];
    const options = [
      {
        id: 1,
        title: 'root',
        isLeaf: false,
      },
    ];

    let wrapper;
    const loadMore = (root, stage) =>
      new Promise(resolve => {
        setTimeout(() => {
          root.children = [
            {
              id: `66666${stage}`,
              title: `Label${stage}`,
              isLeaf: true,
            },
          ];
          wrapper.setProps({
            options: [...options],
          });
          resolve();
        }, 500);
      });
    wrapper = mount(
      <Cascader
        type="menu"
        value={value}
        options={options}
        loadMore={loadMore}
      />
    );

    wrapper.find('.zent-cascader__select').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-content');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__menu-item')[0],
      'click'
    );

    wrapper.unmount();
  });

  it('is disabled', () => {
    const wrapper = mount(<Cascader disabled />);
    expect(
      wrapper.find('.zent-cascader').hasClass('zent-cascader--disabled')
    ).toBe(true);
    wrapper.unmount();
  });

  it('pass raw value when onChange emitted', done => {
    const value = [];
    const options = [
      {
        id: 1,
        title: 'root',
        extra: 'root',
        children: [
          {
            id: 2,
            title: 'son',
            extra: 'son',
            children: [
              {
                id: 3,
                title: 'grandSon',
                extra: 'grandSon',
              },
            ],
          },
          {
            id: 4,
            title: 'anotherSon',
            extra: 'anotherSon',
            children: [
              {
                id: 5,
                title: 'anotherGrandSon',
                extra: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];
    const onChange = data => {
      expect(data.every(item => item.extra)).toBe(true);
      done();
    };

    const wrapper = mount(
      <Cascader
        changeOnSelect
        value={value}
        options={options}
        onChange={onChange}
      />
    );

    wrapper.find('.zent-cascader__select').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-content');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__list-link')[0],
      'click'
    );
    wrapper.update();

    wrapper.unmount();
  });
});
