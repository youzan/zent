import React from 'react';
import { Simulate } from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MenuCascader from 'cascader/MenuCascader';
import TabsCascader from 'cascader/TabsCascader';

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

beforeEach(() => {
  jest
    .spyOn(window, 'requestAnimationFrame')
    .mockImplementation(cb => setTimeout(cb, 0));
});

afterEach(() => {
  window.requestAnimationFrame.mockRestore();
});

describe('Cascader', () => {
  it('basic menu cascader', done => {
    let value = [];
    let options = [];

    const onChange = (newValue, selectedOptions) => {
      expect(selectedOptions.every(item => item.extra)).toBe(true);
      done();
    };

    const wrapper = mount(
      <MenuCascader
        changeOnSelect
        value={value}
        options={options}
        onChange={onChange}
        className="rc-cascader-custom"
        placeholder="hold on"
        popupClassName="rc-cascader-popover"
      />
    );

    expect(wrapper.find('.zent-cascader').length).toBe(1);
    expect(wrapper.hasClass('rc-cascader-custom')).toBe(true);
    expect(wrapper.find('.zent-cascader--placeholder').text()).toBe('hold on');

    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();
    expect(document.querySelectorAll('.rc-cascader-popover').length).toBe(1);

    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();
    expect(document.querySelectorAll('.rc-cascader-popover').length).toBe(0);

    value = [1, 2, 3];
    options = [
      {
        value: 1,
        label: 'root',
        extra: 'root',
        children: [
          {
            value: 2,
            label: 'son',
            extra: 'son',
            children: [
              {
                value: 3,
                label: 'grandSon',
                extra: 'grandSon',
              },
            ],
          },
          {
            value: 4,
            label: 'anotherSon',
            extra: 'anotherSon',
            children: [
              {
                value: 5,
                label: 'anotherGrandSon',
                extra: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];
    wrapper.setProps({
      value,
      options,
    });
    wrapper.update();
    expect(wrapper.find('.zent-cascader--text').text()).toBe(
      'root / son / grandSon'
    );

    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__menu-item')[0],
      'click'
    );
    wrapper.update();

    wrapper.unmount();
  });

  it('basic tabs cascader', () => {
    const value = [];
    const options = [
      {
        value: 1,
        label: 'root',
        children: [
          {
            value: 2,
            label: 'son',
            children: [
              {
                value: 3,
                label: 'grandSon',
              },
            ],
          },
          {
            value: 4,
            label: 'anotherSon',
            children: [
              {
                value: 5,
                label: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];
    const title = ['省份', '城市', '县区'];

    const wrapper = mount(
      <TabsCascader
        value={value}
        options={options}
        className="rc-cascader-custom"
        placeholder="hold on"
        popupClassName="rc-cascader-popover"
        title={title}
      />
    );

    expect(wrapper.find('.zent-cascader').length).toBe(1);
    expect(wrapper.hasClass('rc-cascader-custom')).toBe(true);
    expect(wrapper.find('.zent-cascader--placeholder').text()).toBe('hold on');

    simulateWithTimers(wrapper.find('.zent-cascader'), 'click');
    wrapper.update();
    expect(document.querySelectorAll('.rc-cascader-popover').length).toBe(1);

    simulateWithTimers(wrapper.find('.zent-cascader'), 'click');
    wrapper.update();
    expect(document.querySelectorAll('.rc-cascader-popover').length).toBe(0);

    simulateWithTimers(wrapper.find('.zent-cascader'), 'click');
    wrapper.update();
    const pop = document.querySelector('.zent-popover');

    expect(pop.querySelectorAll('.zent-cascader__list-item').length).toBe(1);
    expect(
      pop.querySelectorAll('.zent-cascader__list-item')[0].textContent
    ).toBe('root');

    const allTabs = document.querySelectorAll('.zent-tabs-tab');
    expect(allTabs.length).toBe(1);
    expect(allTabs[0].textContent).toBe('省份');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__list-item')[0],
      'click'
    );

    wrapper.unmount();
  });

  it('tabs cascader has customize display text', () => {
    const value = [1, 4, 5];
    const options = [
      {
        value: 1,
        label: 'root',
        children: [
          {
            value: 2,
            label: 'son',
            children: [
              {
                value: 3,
                label: 'grandSon',
              },
            ],
          },
          {
            value: 4,
            label: 'anotherSon',
            children: [
              {
                value: 5,
                label: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];
    const textFn = val =>
      val && val.length > 0 ? val[val.length - 1].label : '';

    const wrapper = mount(
      <TabsCascader value={value} options={options} renderValue={textFn} />
    );

    expect(wrapper.find('.zent-cascader--text').text()).toBe('anotherGrandSon');
  });

  it('tabs cascader has default value and options', () => {
    const value = [1, 4, 5];
    const options = [
      {
        value: 1,
        label: 'root',
        children: [
          {
            value: 2,
            label: 'son',
            children: [
              {
                value: 3,
                label: 'grandSon',
              },
            ],
          },
          {
            value: 4,
            label: 'anotherSon',
            children: [
              {
                value: 5,
                label: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];

    const wrapper = mount(<TabsCascader value={value} options={options} />);
    expect(wrapper.find('.zent-cascader--text').text()).toBe(
      'root / anotherSon / anotherGrandSon'
    );

    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();

    expect(
      wrapper.find('.zent-cascader').hasClass('zent-cascader--visible')
    ).toBe(true);
    expect(
      wrapper.find('.zent-cascader').hasClass('zent-cascader--active')
    ).toBe(true);
    const allTabs = document.querySelectorAll('.zent-tabs-tab');
    expect(allTabs.length).toBe(3);
    expect(allTabs[0].textContent).toBe('root');
    expect(allTabs[1].textContent).toBe('anotherSon');
    expect(allTabs[2].textContent).toBe('anotherGrandSon');
    expect(allTabs[2].classList.contains('zent-tabs-tab__actived')).toBe(true);

    simulateRawWithTimers(document.querySelector('.zent-tabs-tab'), 'click');
    wrapper.update();

    simulateWithTimers(wrapper.find('.zent-cascader'), 'click');
    wrapper.update();
    expect(wrapper.hasClass('zent-cascader--visible')).toBe(false);
    expect(wrapper.hasClass('zent-cascader--active')).toBe(false);
    wrapper.unmount();
  });

  it('menu cascader onChange', () => {
    const value = [];
    const options = [
      {
        value: 1,
        label: 'root',
        children: [
          {
            value: 2,
            label: 'son',
            children: [
              {
                value: 3,
                label: 'grandSon',
              },
            ],
          },
          {
            value: 4,
            label: 'anotherSon',
            children: [
              {
                value: 5,
                label: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];

    const wrapper = mount(<MenuCascader value={value} options={options} />);

    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover');

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

  it('menu cascader can hover to expand', () => {
    const value = [];
    const options = [
      {
        value: 1,
        label: 'root',
        children: [
          {
            value: 2,
            label: 'son',
            children: [
              {
                value: 3,
                label: 'grandSon',
              },
            ],
          },
          {
            value: 4,
            label: 'anotherSon',
            children: [
              {
                value: 5,
                label: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];

    const wrapper = mount(
      <MenuCascader value={value} options={options} expandTrigger="hover" />
    );

    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover');

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

  it('menu cascader changeOnSelect when click item', () => {
    const value = [];
    const options = [
      {
        value: 1,
        label: 'root',
        children: [
          {
            value: 2,
            label: 'son',
            children: [
              {
                value: 3,
                label: 'grandSon',
              },
            ],
          },
          {
            value: 4,
            label: 'anotherSon',
            disabled: true,
            children: [
              {
                value: 5,
                label: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];

    let wrapper;

    const onChangeMock = jest.fn().mockImplementation(newValue => {
      wrapper.setProps({
        value: newValue,
      });
    });

    const isChangeOnSelect = true;
    wrapper = mount(
      <MenuCascader
        value={value}
        options={options}
        onChange={onChangeMock}
        changeOnSelect={isChangeOnSelect}
      />
    );

    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__menu-item')[0],
      'click'
    );
    wrapper.update();
    expect(wrapper.find('.zent-cascader--text').text()).toBe('root');
    expect(onChangeMock.mock.calls.length).toBe(1);

    // disabled
    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__menu-item')[2],
      'click'
    );
    wrapper.update();
    expect(wrapper.find('.zent-cascader--text').text()).toBe('root');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__menu-item')[1],
      'click'
    );
    wrapper.update();
    expect(wrapper.find('.zent-cascader--text').text()).toBe('root / son');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__menu-item')[3],
      'click'
    );
    wrapper.update();
    expect(wrapper.find('.zent-cascader--text').text()).toBe(
      'root / son / grandSon'
    );
    expect(document.querySelectorAll('.zent-cascader__popup').length).toBe(0);

    wrapper.unmount();
  });

  it('tabs cascader changeOnSelect when click item', () => {
    const value = [];
    const options = [
      {
        value: 1,
        label: 'root',
        children: [
          {
            value: 2,
            label: 'son',
            children: [
              {
                value: 3,
                label: 'grandSon',
              },
            ],
          },
          {
            value: 4,
            label: 'anotherSon',
            children: [
              {
                value: 5,
                label: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];

    let wrapper;

    const onChangeMock = jest.fn().mockImplementation(newValue => {
      wrapper.setProps({
        value: newValue,
      });
    });

    wrapper = mount(
      <TabsCascader
        value={value}
        options={options}
        onChange={onChangeMock}
        changeOnSelect
        clearable
      />
    );

    expect(wrapper.find('.zent-cascader--text').text()).toBe('请选择');
    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__list-link')[0],
      'click'
    );
    wrapper.update();

    expect(wrapper.find('.zent-cascader--text').text()).toBe('root');
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(pop.querySelectorAll('.zent-tabs-tab').length).toBe(2);

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__list-link')[1],
      'click'
    );
    wrapper.update();
    expect(pop.querySelectorAll('.zent-tabs-tab').length).toBe(3);

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__list-link')[3],
      'click'
    );
    wrapper.update();
    expect(wrapper.find('.zent-cascader--text').text()).toBe(
      'root / son / grandSon'
    );
    expect(document.querySelectorAll('.zent-cascader__popup').length).toBe(0);

    simulateWithTimers(wrapper.find('.zent-cascader'), 'mouseEnter');
    expect(wrapper.find('.zenticon-close-circle').length).toBe(1);
    simulateWithTimers(wrapper.find('.zent-cascader'), 'mouseLeave');
    expect(wrapper.find('.zenticon-close-circle').length).toBe(0);
    simulateWithTimers(wrapper.find('.zent-cascader'), 'mouseEnter');
    simulateWithTimers(wrapper.find('.zenticon-close-circle'), 'click');
    expect(wrapper.find('.zent-cascader--placeholder').text()).toBe('请选择');

    wrapper.unmount();
  });

  it('tabs cascader loadOptions when click item', () => {
    const value = [];
    const options = [
      {
        value: 1,
        label: 'root',
        isLeaf: false,
      },
    ];

    let wrapper;
    const loadOptions = selectedOptions =>
      new Promise(resolve => {
        setTimeout(() => {
          const stage = selectedOptions.length - 1;
          const targetOption = selectedOptions[stage];
          const isLeaf = selectedOptions.length >= 2;
          targetOption.children = [
            {
              value: `66666${stage}`,
              label: `Label${stage}`,
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
      <TabsCascader value={value} options={options} loadOptions={loadOptions} />
    );

    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__list-link')[0],
      'click'
    );

    expect(pop.querySelectorAll('.zent-cascader__loading-icon').length).toBe(1);
    wrapper.unmount();
  });

  it('menu cascader loadOptions when click item', () => {
    const value = [];
    const options = [
      {
        value: 1,
        label: 'root',
        isLeaf: false,
      },
    ];

    let wrapper;
    const loadOptions = selectedOptions =>
      new Promise(resolve => {
        setTimeout(() => {
          const targetOption = selectedOptions[selectedOptions.length - 1];
          targetOption.children = [
            {
              value: `66666${targetOption.value}`,
              label: `Label${targetOption.label}`,
              isLeaf: selectedOptions.length >= 2,
            },
          ];
          wrapper.setProps({
            options: [...options],
          });
          resolve();
        }, 500);
      });
    wrapper = mount(
      <MenuCascader value={value} options={options} loadOptions={loadOptions} />
    );

    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader__menu-item')[0],
      'click'
    );

    wrapper.unmount();
  });

  it('menu cascader is disabled', () => {
    const wrapper = mount(
      <MenuCascader disabled clearable multiple searchable />
    );
    expect(
      wrapper.find('.zent-cascader').hasClass('zent-cascader--disabled')
    ).toBe(true);

    simulateWithTimers(wrapper.find('.zent-cascader'), 'mouseEnter');
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.zenticon-close-circle').length).toBe(0);

    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();
    wrapper.update();
    expect(document.querySelectorAll('.zent-cascader__popup').length).toBe(0);

    wrapper.unmount();
  });

  it('tabs cascader is disabled', () => {
    const wrapper = mount(<TabsCascader disabled />);
    expect(
      wrapper.find('.zent-cascader').hasClass('zent-cascader--disabled')
    ).toBe(true);
    wrapper.unmount();
  });

  it('multiple menu cascader', () => {
    const value = [
      [1, 2, 3],
      [1, 4, 5],
    ];
    const options = [
      {
        value: 1,
        label: 'root',
        children: [
          {
            value: 2,
            label: 'son',
            children: [
              {
                value: 3,
                label: 'grandSon',
              },
            ],
          },
          {
            value: 4,
            label: 'anotherSon',
            children: [
              {
                value: 5,
                label: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];

    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(newValue => {
      wrapper.setProps({
        value: newValue,
      });
    });

    wrapper = mount(
      <MenuCascader
        value={value}
        options={options}
        expandTrigger="hover"
        multiple
        onChange={onChangeMock}
        clearable
      />
    );

    expect(wrapper.find('.zent-cascader--tag').length).toBe(2);
    wrapper
      .find('.zenticon-close')
      .at(0)
      .simulate('click');
    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.find('.zent-cascader--tag').length).toBe(1);
    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();
    wrapper.update();

    const pop = document.querySelector('.zent-popover');
    expect(pop.querySelectorAll('.zent-cascader__menu').length).toBe(3);

    wrapper
      .find('.zent-checkbox input')
      .at(0)
      .simulate('change', { target: { checked: true } });

    simulateWithTimers(wrapper.find('.zent-cascader'), 'mouseEnter');
    expect(wrapper.find('.zenticon-close-circle').length).toBe(1);
    simulateWithTimers(wrapper.find('.zenticon-close-circle'), 'click');
    expect(wrapper.find('.zent-cascader--placeholder').text()).toBe('请选择');

    wrapper.unmount();
  });

  it('searchable menu cascader', () => {
    const value = [1, 2, 3];
    const options = [
      {
        value: 1,
        label: 'root',
        children: [
          {
            value: 2,
            label: 'son',
            children: [
              {
                value: 3,
                label: 'grandSon',
              },
            ],
          },
          {
            value: 4,
            label: 'anotherSon',
            children: [
              {
                value: 5,
                label: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];

    let wrapper;
    const onChangeMock = jest.fn().mockImplementation(newValue => {
      wrapper.setProps({
        value: newValue,
      });
    });

    wrapper = mount(
      <MenuCascader
        value={value}
        options={options}
        searchable
        clearable
        onChange={onChangeMock}
        limit={10}
      />
    );

    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();

    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').hasClass('zent-cascader--search')).toBe(true);
    wrapper
      .find('input')
      .simulate('change', { target: { value: 'anotherGrandSon' } });

    const pop = document.querySelector('.zent-popover');
    expect(pop.querySelector('.zent-cascader--search-empty').textContent).toBe(
      '无搜索结果'
    );

    simulateWithTimers(wrapper.find('.zent-cascader'), 'mouseEnter');
    expect(wrapper.find('.zenticon-close-circle').length).toBe(1);
    simulateWithTimers(wrapper.find('.zenticon-close-circle'), 'click');
    expect(wrapper.find('.zent-cascader--search').props().value).toBe('');

    wrapper
      .find('input')
      .simulate('change', { target: { value: 'anotherGrandSon' } });

    setTimeout(() => {
      expect(pop.querySelectorAll('.zent-cascader--search-item').length).toBe(
        1
      );
      expect(pop.querySelectorAll('.zent-cascader--highlight').length).toBe(1);
      simulateRawWithTimers(
        pop.querySelectorAll('.zent-cascader--search-item')[0],
        'click'
      );
      expect(wrapper.find('.zent-cascader--text').text()).toBe(
        'root / anotherSon / anotherGrandSon'
      );

      simulateWithTimers(wrapper.find('.zent-cascader'), 'mouseEnter');
      expect(wrapper.find('.zenticon-close-circle').length).toBe(1);
      simulateWithTimers(wrapper.find('.zenticon-close-circle'), 'click');
      expect(wrapper.find('.zent-cascader--placeholder').text()).toBe(
        '请选择或输入搜索'
      );

      wrapper.unmount();
    }, 1000);
  });

  it('async searchable menu cascader', () => {
    const value = [];
    let options = [];

    let wrapper;
    const loadOptions = (_, meta) =>
      new Promise(resolve => {
        setTimeout(() => {
          const { keyword } = meta;
          const searchList = [
            {
              items: [
                { value: '340000', label: '浙江省' },
                { value: '340100', label: '杭州市' },
                { value: '340106', label: `${keyword}-1` },
              ],
              display: <span>浙江省 / 杭州市 / {keyword}-1</span>,
            },
            {
              items: [
                { value: '340000', label: '浙江省' },
                { value: '340200', label: '温州市' },
                { value: '340206', label: `${keyword}-2` },
              ],
              display: <span>浙江省 / 温州市 / {keyword}-2</span>,
            },
          ];

          resolve(searchList);
        }, 50);
      });

    const onChangeMock = jest.fn().mockImplementation(newValue => {
      wrapper.setProps({
        value: newValue,
      });
    });

    wrapper = mount(
      <MenuCascader
        value={value}
        options={options}
        loadOptions={loadOptions}
        onChange={onChangeMock}
        clearable
        searchable
        async
      />
    );

    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();

    wrapper
      .find('.zent-cascader--search')
      .simulate('change', { target: { value: 'keyword' } });

    jest.useFakeTimers();
    jest.runAllTimers();
    wrapper.update();

    setTimeout(() => {
      const pop = document.querySelector('.zent-popover');
      expect(pop.querySelectorAll('.zent-cascader--search-item').length).toBe(
        2
      );

      simulateRawWithTimers(
        pop.querySelectorAll('.zent-cascader--search-item')[0],
        'click'
      );
      wrapper.update();

      expect(pop.querySelectorAll('.zent-cascader--search-item').length).toBe(
        0
      );

      wrapper.unmount();
    }, 1000);
  });

  it('async searchable multiple menu cascader', () => {
    const value = [];
    let options = [];

    let wrapper;
    const loadOptions = (_, meta) =>
      new Promise(resolve => {
        setTimeout(() => {
          const { keyword } = meta;
          const searchList = [
            {
              items: [
                { value: '340000', label: '浙江省' },
                { value: '340100', label: '杭州市' },
                { value: '340106', label: `${keyword}-1` },
              ],
              display: <span>浙江省 / 杭州市 / {keyword}-1</span>,
            },
            {
              items: [
                { value: '340000', label: '浙江省' },
                { value: '340200', label: '温州市' },
                { value: '340206', label: `${keyword}-2` },
              ],
              display: <span>浙江省 / 温州市 / {keyword}-2</span>,
            },
          ];

          resolve(searchList);
        }, 50);
      });

    const onChangeMock = jest.fn().mockImplementation(newValue => {
      wrapper.setProps({
        value: newValue,
      });
    });

    wrapper = mount(
      <MenuCascader
        value={value}
        options={options}
        loadOptions={loadOptions}
        onChange={onChangeMock}
        clearable
        searchable
        multiple
        async
      />
    );

    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();

    wrapper
      .find('.zent-cascader--search')
      .simulate('change', { target: { value: 'keyword' } });

    jest.useFakeTimers();
    jest.runAllTimers();
    wrapper.update();

    setTimeout(() => {
      const pop = document.querySelector('.zent-popover');
      expect(pop.querySelectorAll('.zent-cascader--search-item').length).toBe(
        2
      );
      expect(pop.querySelectorAll('.zent-checkbox').length).toBe(2);

      simulateRawWithTimers(
        pop.querySelectorAll('.zent-cascader--search-item')[0],
        'click'
      );
      wrapper.update();

      expect(pop.querySelectorAll('.zent-cascader--search-item').length).toBe(
        2
      );

      wrapper
        .find('.zent-checkbox input')
        .at(0)
        .simulate('change', { target: { checked: true } });
      wrapper.update();

      wrapper.unmount();
    }, 1000);
  });

  it('multiple searchable menu cascader', () => {
    const value = [];
    let options = [];

    const wrapper = mount(
      <MenuCascader value={value} options={options} searchable multiple />
    );

    options = [
      {
        value: 1,
        label: 'root',
        children: [
          {
            value: 2,
            label: 'son',
            children: [
              {
                value: 3,
                label: 'grandSon',
              },
            ],
          },
          {
            value: 4,
            label: 'anotherSon',
            children: [
              {
                value: 5,
                label: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];
    wrapper.setProps({
      options: [...options],
    });

    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.find('.zent-cascader--search').length).toBe(1);
    wrapper
      .find('.zent-cascader--search')
      .simulate('change', { target: { value: 'anotherGrandSon' } });

    const pop = document.querySelector('.zent-popover');

    setTimeout(() => {
      expect(pop.querySelectorAll('.zent-cascader--search-item').length).toBe(
        1
      );
      expect(pop.querySelectorAll('.zent-checkbox').length).toBe(1);

      simulateRawWithTimers(
        pop.querySelectorAll('.zent-cascader--search-item')[0],
        'click'
      );
      wrapper.update();
      expect(pop.querySelectorAll('.zent-cascader--search-item').length).toBe(
        1
      );

      wrapper.unmount();
    }, 1000);
  });

  it('scrollable menu cascader', () => {
    const value = [];
    let options = [
      {
        value: 1,
        label: 'root',
        hasMore: false,
        children: [
          {
            value: 2,
            label: 'son',
            children: [
              {
                value: 3,
                label: 'grandSon',
              },
            ],
          },
          {
            value: 4,
            label: 'anotherSon',
            children: [
              {
                value: 5,
                label: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];

    let optionId = 0;
    let wrapper;
    const loadOptions = selectedOptions =>
      new Promise(resolve => {
        setTimeout(() => {
          const isLeaf = selectedOptions.length >= 2;
          const targetOption = selectedOptions[selectedOptions.length - 1];

          const res = Array(10)
            .fill(null)
            .map(() => {
              optionId++;
              return {
                value: `Value ${optionId}`,
                label: `Scroll ${optionId}`,
                isLeaf,
              };
            });

          // 非第一级
          if (targetOption) {
            targetOption.children = (targetOption.children || []).concat(res);
          } else {
            options = options.concat(res);
          }
          wrapper.setProps({
            options: [...options],
          });

          resolve(false);
        }, 500);
      });

    wrapper = mount(
      <MenuCascader
        value={value}
        options={options}
        clearable
        loadOptions={loadOptions}
        scrollable
      />
    );

    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();
    wrapper.update();

    const pop = document.querySelector('.zent-popover');
    expect(pop.querySelectorAll('.zent-loading').length).toBe(1);

    setTimeout(() => {
      simulateRawWithTimers(
        pop.querySelectorAll('.zent-cascader__menu-item')[0],
        'click'
      );
      jest.runAllTimers();
      wrapper.update();
      expect(pop.querySelectorAll('.zent-loading').length).toBe(0);
      wrapper.unmount();
    }, 1000);
  });

  it('menu cascader empty', () => {
    const value = [];
    const options = [];

    const wrapper = mount(<MenuCascader value={value} options={options} />);

    wrapper.find('.zent-cascader').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover');

    expect(pop.querySelectorAll('.zent-cascader__menu-item').length).toBe(0);
    expect(
      pop.querySelectorAll('.zent-cascader__menu-empty')[0].textContent
    ).toBe('无数据');

    wrapper.unmount();
  });
});
