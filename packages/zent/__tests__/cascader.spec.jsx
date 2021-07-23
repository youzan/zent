import { Simulate } from 'react-dom/test-utils';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import MenuCascader from '../src/cascader/MenuCascader';
import TabsCascader from '../src/cascader/TabsCascader';
import {
  clone,
  getNode,
  insertPath,
  merge,
} from '../src/cascader/public-options-fns';

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

    expect(wrapper.find('.zent-cascader-v2').length).toBe(1);
    expect(wrapper.hasClass('rc-cascader-custom')).toBe(true);
    expect(wrapper.find('.zent-cascader-v2--placeholder').text()).toBe(
      'hold on'
    );

    wrapper.find('.zent-cascader-v2').simulate('click');
    jest.runAllTimers();
    expect(document.querySelectorAll('.rc-cascader-popover').length).toBe(1);

    wrapper.find('.zent-cascader-v2').simulate('click');
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
    expect(wrapper.find('.zent-cascader-v2--text').text()).toBe(
      'root / son / grandSon'
    );

    wrapper.find('.zent-cascader-v2').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-v2');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2__menu-item')[0],
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

    expect(wrapper.find('.zent-cascader-v2').length).toBe(1);
    expect(wrapper.hasClass('rc-cascader-custom')).toBe(true);
    expect(wrapper.find('.zent-cascader-v2--placeholder').text()).toBe(
      'hold on'
    );

    simulateWithTimers(wrapper.find('.zent-cascader-v2'), 'click');
    wrapper.update();
    expect(document.querySelectorAll('.rc-cascader-popover').length).toBe(1);

    simulateWithTimers(wrapper.find('.zent-cascader-v2'), 'click');
    wrapper.update();
    expect(document.querySelectorAll('.rc-cascader-popover').length).toBe(0);

    simulateWithTimers(wrapper.find('.zent-cascader-v2'), 'click');
    wrapper.update();
    const pop = document.querySelector('.zent-popover-v2');

    expect(pop.querySelectorAll('.zent-cascader-v2__list-item').length).toBe(1);
    expect(
      pop.querySelectorAll('.zent-cascader-v2__list-item')[0].textContent
    ).toBe('root');

    const allTabs = document.querySelectorAll('.zent-tabs-tab');
    expect(allTabs.length).toBe(1);
    expect(allTabs[0].textContent).toBe('省份');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2__list-item')[0],
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

    expect(wrapper.find('.zent-cascader-v2--text').text()).toBe(
      'anotherGrandSon'
    );
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
    expect(wrapper.find('.zent-cascader-v2--text').text()).toBe(
      'root / anotherSon / anotherGrandSon'
    );

    wrapper.find('.zent-cascader-v2').simulate('click');
    jest.runAllTimers();

    expect(
      wrapper.find('.zent-cascader-v2').hasClass('zent-cascader-v2--visible')
    ).toBe(true);
    expect(
      wrapper.find('.zent-cascader-v2').hasClass('zent-cascader-v2--active')
    ).toBe(true);
    const allTabs = document.querySelectorAll('.zent-tabs-tab');
    expect(allTabs.length).toBe(3);
    expect(allTabs[0].textContent).toBe('root');
    expect(allTabs[1].textContent).toBe('anotherSon');
    expect(allTabs[2].textContent).toBe('anotherGrandSon');
    expect(allTabs[2].classList.contains('zent-tabs-tab__actived')).toBe(true);

    simulateRawWithTimers(document.querySelector('.zent-tabs-tab'), 'click');
    wrapper.update();

    simulateWithTimers(wrapper.find('.zent-cascader-v2'), 'click');
    wrapper.update();
    expect(wrapper.hasClass('zent-cascader-v2--visible')).toBe(false);
    expect(wrapper.hasClass('zent-cascader-v2--active')).toBe(false);
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

    wrapper.find('.zent-cascader-v2').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-v2');

    expect(pop.querySelectorAll('.zent-cascader-v2__menu-item').length).toBe(1);
    expect(
      pop.querySelectorAll('.zent-cascader-v2__menu-item')[0].textContent
    ).toBe('root');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2__menu-item')[0],
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

    wrapper.find('.zent-cascader-v2').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-v2');

    expect(pop.querySelectorAll('.zent-cascader-v2__menu-item').length).toBe(1);
    expect(
      pop.querySelectorAll('.zent-cascader-v2__menu-item')[0].textContent
    ).toBe('root');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2__menu-item')[0],
      'mouseEnter'
    );

    expect(pop.querySelectorAll('.zent-cascader-v2__menu').length).toBe(2);

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

    // eslint-disable-next-line prefer-const
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

    wrapper.find('.zent-cascader-v2').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-v2');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2__menu-item')[0],
      'click'
    );
    wrapper.update();
    expect(wrapper.find('.zent-cascader-v2--text').text()).toBe('root');
    expect(onChangeMock.mock.calls.length).toBe(1);

    // disabled
    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2__menu-item')[2],
      'click'
    );
    wrapper.update();
    expect(wrapper.find('.zent-cascader-v2--text').text()).toBe('root');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2__menu-item')[1],
      'click'
    );
    wrapper.update();
    expect(wrapper.find('.zent-cascader-v2--text').text()).toBe('root / son');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2__menu-item')[3],
      'click'
    );
    wrapper.update();
    expect(wrapper.find('.zent-cascader-v2--text').text()).toBe(
      'root / son / grandSon'
    );
    expect(document.querySelectorAll('.zent-cascader-v2__popup').length).toBe(
      0
    );

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

    // eslint-disable-next-line prefer-const
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

    expect(wrapper.find('.zent-cascader-v2--text').text()).toBe('请选择');
    wrapper.find('.zent-cascader-v2').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-v2');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2__list-link')[0],
      'click'
    );
    wrapper.update();

    expect(wrapper.find('.zent-cascader-v2--text').text()).toBe('root');
    expect(onChangeMock.mock.calls.length).toBe(1);
    expect(pop.querySelectorAll('.zent-tabs-tab').length).toBe(2);

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2__list-link')[1],
      'click'
    );
    wrapper.update();
    expect(pop.querySelectorAll('.zent-tabs-tab').length).toBe(3);

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2__list-link')[3],
      'click'
    );
    wrapper.update();
    expect(wrapper.find('.zent-cascader-v2--text').text()).toBe(
      'root / son / grandSon'
    );
    expect(document.querySelectorAll('.zent-cascader-v2__popup').length).toBe(
      0
    );

    simulateWithTimers(wrapper.find('.zent-cascader-v2'), 'mouseEnter');
    expect(wrapper.find('.zenticon-close-circle').length).toBe(1);
    simulateWithTimers(wrapper.find('.zent-cascader-v2'), 'mouseLeave');
    expect(wrapper.find('.zenticon-close-circle').length).toBe(0);
    simulateWithTimers(wrapper.find('.zent-cascader-v2'), 'mouseEnter');
    simulateWithTimers(wrapper.find('.zenticon-close-circle'), 'click');
    expect(wrapper.find('.zent-cascader-v2--placeholder').text()).toBe(
      '请选择'
    );

    wrapper.unmount();
  });

  it('tabs cascader loadOptions when click item', () => {
    let value = [];
    const options = [
      {
        value: 1,
        label: 'root',
        loadChildrenOnExpand: true,
      },
    ];

    // eslint-disable-next-line prefer-const
    let wrapper;
    const loadOptions = selectedOptions =>
      new Promise(resolve => {
        const stage = selectedOptions.length - 1;
        const nonLeaf = selectedOptions.length < 2;

        const newOptions = clone(options);
        const node = getNode(newOptions, selectedOptions);
        node.children = [
          {
            value: `66666${stage}`,
            label: `Label${stage}`,
            loadChildrenOnExpand: nonLeaf,
          },
        ];
        wrapper.setProps({
          options: newOptions,
        });
        resolve();
      });
    wrapper = mount(
      <TabsCascader
        value={value}
        options={options}
        onChange={val => {
          value = val;
        }}
        loadOptions={loadOptions}
      />
    );

    wrapper.find('.zent-cascader-v2').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-v2');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2__list-link')[0],
      'click'
    );

    expect(pop.querySelectorAll('.zent-cascader-v2__loading-icon').length).toBe(
      1
    );
    wrapper.unmount();
  });

  it('menu cascader loadOptions when click item', () => {
    let value = [];
    const options = [
      {
        value: 1,
        label: 'root',
        loadChildrenOnExpand: true,
      },
    ];

    // eslint-disable-next-line prefer-const
    let wrapper;
    const loadOptions = selectedOptions =>
      new Promise(resolve => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.children = [
          {
            value: `66666${targetOption.value}`,
            label: `Label${targetOption.label}`,
            loadChildrenOnExpand: selectedOptions.length < 2,
          },
        ];
        wrapper.setProps({
          options: [...options],
        });
        resolve();
      });
    wrapper = mount(
      <MenuCascader
        value={value}
        options={options}
        onChange={val => {
          value = val;
        }}
        loadOptions={loadOptions}
      />
    );

    wrapper.find('.zent-cascader-v2').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-v2');

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2__menu-item')[0],
      'click'
    );

    wrapper.unmount();
  });

  it('menu cascader is disabled', () => {
    const wrapper = mount(
      <MenuCascader disabled clearable multiple searchable />
    );
    expect(
      wrapper.find('.zent-cascader-v2').hasClass('zent-cascader-v2--disabled')
    ).toBe(true);

    simulateWithTimers(wrapper.find('.zent-cascader-v2'), 'mouseEnter');
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('.zenticon-close-circle').length).toBe(0);

    wrapper.find('.zent-cascader-v2').simulate('click');
    jest.runAllTimers();
    wrapper.update();
    expect(document.querySelectorAll('.zent-cascader-v2__popup').length).toBe(
      0
    );

    wrapper.unmount();
  });

  it('tabs cascader is disabled', () => {
    const wrapper = mount(<TabsCascader disabled />);
    expect(
      wrapper.find('.zent-cascader-v2').hasClass('zent-cascader-v2--disabled')
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

    // eslint-disable-next-line prefer-const
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

    expect(wrapper.find('.zent-cascader-v2--tag').length).toBe(2);
    wrapper.find('.zenticon-close').at(0).simulate('click');
    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.find('.zent-cascader-v2--tag').length).toBe(1);
    wrapper.find('.zent-cascader-v2').simulate('click');
    jest.runAllTimers();
    wrapper.update();

    const pop = document.querySelector('.zent-popover-v2');
    expect(pop.querySelectorAll('.zent-cascader-v2__menu').length).toBe(3);

    wrapper
      .find('.zent-checkbox input')
      .at(0)
      .simulate('change', { target: { checked: true } });

    simulateWithTimers(wrapper.find('.zent-cascader-v2'), 'mouseEnter');
    expect(wrapper.find('.zenticon-close-circle').length).toBe(1);
    simulateWithTimers(wrapper.find('.zenticon-close-circle'), 'click');
    expect(wrapper.find('.zent-cascader-v2--placeholder').text()).toBe(
      '请选择'
    );

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

    // eslint-disable-next-line prefer-const
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

    wrapper.find('.zent-cascader-v2').simulate('click');
    jest.runAllTimers();

    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').hasClass('zent-cascader-v2--search')).toBe(
      true
    );
    wrapper
      .find('input')
      .simulate('change', { target: { value: 'anotherGrandSon' } });

    const pop = document.querySelector('.zent-popover-v2');
    expect(
      pop.querySelector('.zent-cascader-v2--search-empty').textContent
    ).toBe('无搜索结果');

    simulateWithTimers(wrapper.find('.zent-cascader-v2'), 'mouseEnter');
    expect(wrapper.find('.zenticon-close-circle').length).toBe(1);
    simulateWithTimers(wrapper.find('.zenticon-close-circle'), 'click');
    expect(wrapper.find('.zent-cascader-v2--search').props().value).toBe('');

    wrapper
      .find('input')
      .simulate('change', { target: { value: 'anotherGrandSon' } });

    expect(pop.querySelectorAll('.zent-cascader-v2--search-item').length).toBe(
      1
    );
    expect(pop.querySelectorAll('.zent-cascader-v2--highlight').length).toBe(1);
    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2--search-item')[0],
      'click'
    );
    expect(wrapper.find('.zent-cascader-v2--text').text()).toBe(
      'root / anotherSon / anotherGrandSon'
    );

    simulateWithTimers(wrapper.find('.zent-cascader-v2'), 'mouseEnter');
    expect(wrapper.find('.zenticon-close-circle').length).toBe(1);
    simulateWithTimers(wrapper.find('.zenticon-close-circle'), 'click');
    expect(wrapper.find('.zent-cascader-v2--placeholder').text()).toBe(
      '请选择或输入搜索'
    );

    wrapper.unmount();
  });

  it('async searchable menu cascader', () => {
    const value = [];
    const options = [];

    // eslint-disable-next-line prefer-const
    let wrapper;
    const asyncFilter = keyword =>
      new Promise(resolve => {
        const searchList = [
          [
            { value: '340000', label: '浙江省' },
            { value: '340100', label: '杭州市' },
            { value: '340106', label: `${keyword}-1` },
          ],
          [
            { value: '340000', label: '浙江省' },
            { value: '340200', label: '温州市' },
            { value: '340206', label: `${keyword}-2` },
          ],
        ];

        const newOptions = clone(options);
        searchList.forEach(path => insertPath(newOptions, path));

        wrapper.setProps({
          options: newOptions,
        });

        wrapper.setState({
          isSearching: false,
          searchResultList: searchList,
        });

        resolve(searchList);
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
        asyncFilter={asyncFilter}
        onChange={onChangeMock}
        clearable
        searchable
        async
      />
    );

    wrapper.find('.zent-cascader-v2').simulate('click');
    jest.runAllTimers();

    wrapper
      .find('.zent-cascader-v2--search')
      .simulate('change', { target: { value: 'keyword' } });

    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-v2');
    expect(pop.querySelectorAll('.zent-cascader-v2--search-item').length).toBe(
      2
    );

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2--search-item')[0],
      'click'
    );
    wrapper.update();

    expect(pop.querySelectorAll('.zent-cascader-v2--search-item').length).toBe(
      0
    );

    wrapper.unmount();
  });

  it('async searchable multiple menu cascader', () => {
    const value = [];
    const options = [];

    // eslint-disable-next-line prefer-const
    let wrapper;
    const asyncFilter = keyword =>
      new Promise(resolve => {
        const searchList = [
          [
            { value: '340000', label: '浙江省' },
            { value: '340100', label: '杭州市' },
            { value: '340106', label: `${keyword}-1` },
          ],
          [
            { value: '340000', label: '浙江省' },
            { value: '340200', label: '温州市' },
            { value: '340206', label: `${keyword}-2` },
          ],
        ];

        const newOptions = clone(options);
        searchList.forEach(path => insertPath(newOptions, path));

        wrapper.setState({
          isSearching: false,
          searchResultList: searchList,
        });

        wrapper.setProps({
          options: newOptions,
        });

        resolve(searchList);
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
        asyncFilter={asyncFilter}
        onChange={onChangeMock}
        clearable
        searchable
        multiple
        async
      />
    );

    asyncFilter('keyword');
    wrapper.setState({
      keyword: 'keyword',
      visible: true,
    });
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-v2');
    expect(pop.querySelectorAll('.zent-cascader-v2--search-item').length).toBe(
      2
    );
    expect(pop.querySelectorAll('.zent-checkbox').length).toBe(2);

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2--search-item')[0],
      'click'
    );
    wrapper.update();

    expect(pop.querySelectorAll('.zent-cascader-v2--search-item').length).toBe(
      2
    );

    wrapper
      .find('.zent-checkbox input')
      .at(0)
      .simulate('change', { target: { checked: true } });
    wrapper.update();

    wrapper.unmount();
  });

  it('multiple searchable menu cascader', () => {
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
      <MenuCascader value={value} options={options} searchable multiple />
    );

    wrapper.find('.zent-cascader-v2').simulate('click');
    jest.runAllTimers();
    wrapper.update();

    expect(wrapper.find('.zent-cascader-v2--search').length).toBe(1);
    wrapper
      .find('.zent-cascader-v2--search')
      .simulate('change', { target: { value: 'anotherGrandSon' } });

    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-v2');
    expect(pop.querySelectorAll('.zent-cascader-v2--search-item').length).toBe(
      1
    );
    expect(pop.querySelectorAll('.zent-checkbox').length).toBe(1);

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2--search-item')[0],
      'click'
    );
    wrapper.update();
    expect(pop.querySelectorAll('.zent-cascader-v2--search-item').length).toBe(
      1
    );

    wrapper.unmount();
  });

  it('scrollable menu cascader', () => {
    const value = [];
    let options = [
      {
        value: 1,
        label: 'root',
        loadChildrenOnScroll: false,
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
    // eslint-disable-next-line prefer-const
    let wrapper;
    const loadOptions = selectedOptions =>
      new Promise(resolve => {
        const nonLeaf = selectedOptions.length < 2;
        const targetOption = selectedOptions[selectedOptions.length - 1];

        const res = Array(10)
          .fill(null)
          .map(() => {
            optionId++;
            return {
              value: `Value ${optionId}`,
              label: `Scroll ${optionId}`,
              loadChildrenOnExpand: nonLeaf,
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

    wrapper.setState({
      visible: true,
    });

    const pop = document.querySelector('.zent-popover-v2');
    expect(pop.querySelectorAll('.zent-loading').length).toBe(0);

    simulateRawWithTimers(
      pop.querySelectorAll('.zent-cascader-v2__menu-item')[0],
      'click'
    );
    jest.runAllTimers();
    wrapper.update();
    expect(pop.querySelectorAll('.zent-loading').length).toBe(0);
    wrapper.unmount();
  });

  it('menu cascader empty', () => {
    const value = [];
    const options = [];

    const wrapper = mount(<MenuCascader value={value} options={options} />);

    wrapper.find('.zent-cascader-v2').simulate('click');
    jest.runAllTimers();

    const pop = document.querySelector('.zent-popover-v2');

    expect(pop.querySelectorAll('.zent-cascader-v2__menu-item').length).toBe(0);
    expect(
      pop.querySelectorAll('.zent-cascader-v2__menu-empty')[0].textContent
    ).toBe('无数据');

    wrapper.unmount();
  });

  it('public options fns', () => {
    const options = [
      {
        value: 1,
        label: 'root',
        loadChildrenOnScroll: false,
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
    const anotherOptions = [
      {
        value: 1,
        label: 'root',
        children: [
          {
            value: 3,
            label: '3',
            children: [],
          },
          {
            value: 2,
            label: 'son',
            children: [
              {
                value: 4,
                label: '4',
              },
            ],
          },
        ],
      },
    ];

    const ret = merge(options, anotherOptions);
    expect(ret).toEqual([
      {
        value: 1,
        label: 'root',
        loadChildrenOnScroll: false,
        children: [
          {
            value: 2,
            label: 'son',
            children: [
              {
                value: 3,
                label: 'grandSon',
              },
              {
                value: 4,
                label: '4',
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
          {
            value: 3,
            label: '3',
            children: [],
          },
        ],
      },
    ]);

    expect(getNode(options, [{ value: 1 }, { value: 2 }, { value: 33 }])).toBe(
      null
    );
  });

  it('simplify selection', () => {
    const value = [
      [1, 2, 3],
      [1, 2, 5],
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
              {
                value: 5,
                label: 'anotherGrandSon',
              },
            ],
          },
        ],
      },
    ];

    // eslint-disable-next-line prefer-const
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
        simplifySelection
        onChange={onChangeMock}
        clearable
      />
    );

    expect(wrapper.find('.zent-cascader-v2--tag').length).toBe(1);

    wrapper.unmount();
  });
});
