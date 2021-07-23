import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Transfer, { useTransfer } from '../src/transfer';
import { Direction } from '../src/transfer/constants';

Enzyme.configure({ adapter: new Adapter() });

describe('<Transfer />', () => {
  const listCommonProps = {
    dataSource: [
      {
        title: 'a',
      },
      {
        title: 'b',
      },
      {
        title: 'c',
        disabled: true,
      },
    ],
    selectedKeys: ['a'],
    targetKeys: ['b'],
    list: {
      columns: [{ name: 'title' }],
    },
    keyName: 'title',
  };

  it('should move selected keys to right list', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <Transfer {...listCommonProps} onChange={handleChange} />
    );

    wrapper.find('ArrowButton').at(0).simulate('click');

    expect(handleChange).toHaveBeenCalledWith({
      targetKeys: ['a', 'b'],
      direction: Direction.Right,
      transferredKeys: ['a'],
      selectedKeys: [],
    });
  });

  it('should move selected keys to left list', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <Transfer
        {...listCommonProps}
        selectedKeys={['b']}
        onChange={handleChange}
      />
    );

    wrapper.find('ArrowButton').at(1).simulate('click');

    expect(handleChange).toHaveBeenCalledWith({
      targetKeys: [],
      direction: Direction.Left,
      transferredKeys: ['b'],
      selectedKeys: [],
    });
  });

  it('should move selected keys exclude disabled to corresponding list', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <Transfer
        {...listCommonProps}
        selectedKeys={['a', 'c']}
        onChange={handleChange}
      />
    );

    wrapper.find('ArrowButton').at(0).simulate('click');

    expect(handleChange).toHaveBeenCalledWith({
      targetKeys: ['a', 'b'],
      direction: Direction.Right,
      transferredKeys: ['a'],
      selectedKeys: ['c'],
    });
  });

  it('should uncheck checkbox when click on checked item', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mount(
      <Transfer {...listCommonProps} onSelectChange={handleSelectChange} />
    );
    wrapper
      .find('Row')
      .filterWhere(n => n.prop('data').title === 'a')
      .simulate('click');
    expect(handleSelectChange).toHaveBeenLastCalledWith([]);
  });

  it('should check checkbox when click on unchecked item', () => {
    const handleSelectChange = jest.fn();
    const wrapper = mount(
      <Transfer {...listCommonProps} onSelectChange={handleSelectChange} />
    );
    wrapper
      .find('Row')
      .filterWhere(n => n.prop('data').title === 'b')
      .simulate('click');
    expect(handleSelectChange).toHaveBeenLastCalledWith(['b', 'a']);
  });

  it('should call `filterOption` when use input in search box', () => {
    const filterOption = (inputValue, option) => inputValue === option.title;
    const wrapper = mount(
      <Transfer {...listCommonProps} showSearch filterOption={filterOption} />
    );
    wrapper
      .find('Search')
      .at(0)
      .find('Input')
      .simulate('change', { target: { value: 'a' } });
    expect(wrapper.find('TransferItem').at(0).find('Row')).toHaveLength(1);
  });

  it('should display the correct title', () => {
    const wrapper = mount(
      <Transfer {...listCommonProps} titles={['leftTitle', 'rightTitle']} />
    );

    expect(
      wrapper.find('AllCheckBox').at(0).find('Checkbox').prop('children')
    ).toEqual('leftTitle（1/2 项）');

    expect(
      wrapper.find('AllCheckBox').at(1).find('Checkbox').prop('children')
    ).toEqual('rightTitle（1 项）');
  });

  describe('pagination', () => {
    it('boolean', () => {
      const wrapper = mount(<Transfer {...listCommonProps} pagination />);
      expect(wrapper.find('MiniPagination').first().prop('pageSize')).toEqual(
        10
      );
    });

    it('object', () => {
      const wrapper = mount(
        <Transfer {...listCommonProps} pagination={{ pageSize: 1 }} />
      );
      expect(
        wrapper
          .find('TransferItem')
          .first()
          .find('.zent-transfer__item__grid__row')
      ).toHaveLength(1);
      expect(wrapper.find('MiniPagination').first().prop('pageSize')).toEqual(
        1
      );
    });

    it('not exceed max size', () => {
      const wrapper = mount(
        <Transfer {...listCommonProps} pagination={{ pageSize: 1 }} />
      );
      wrapper
        .find('MiniPagination')
        .first()
        .find('ArrowButton')
        .at(1)
        .simulate('click');
      expect(wrapper.find('MiniPagination').first().props()).toEqual(
        expect.objectContaining({
          current: 2,
        })
      );
    });
  });

  it('disabled transfer', () => {
    const wrapper = mount(<Transfer {...listCommonProps} disabled />);
    expect(wrapper.find('.zent-transfer__item--disabled')).toHaveLength(2);
  });

  it('list', () => {
    const dataSource = [
      {
        title: 'a',
        text: '1',
      },
      {
        title: 'b',
        text: '2',
      },
      {
        title: 'c',
        text: '3',
      },
    ];
    const list = [
      {
        columns: [{ name: 'title', title: 'left' }],
      },
      {
        columns: [
          { name: 'title', title: 'right1' },
          { name: 'text', title: 'right2' },
        ],
      },
    ];
    const wrapper = mount(
      <Transfer {...listCommonProps} dataSource={dataSource} list={list} />
    );
    expect(wrapper.find('.zent-transfer')).toHaveLength(1);
  });

  it('all selected', () => {
    const wrapper = mount(<Transfer {...listCommonProps} />);
    wrapper
      .find('AllCheckBox')
      .at(1)
      .find('Checkbox')
      .find('input')
      .simulate('change');
    expect(
      wrapper.find('AllCheckBox').at(1).find('Checkbox').prop('children')
    ).toEqual('Target（1/1 项）');
  });
});

describe('useTransfer', () => {
  it('default value', () => {
    const TransferCpn = () => {
      const { targetKeys, selectedKeys } = useTransfer({
        targetKeys: ['a', 'b', 'c'],
        selectedKeys: ['a'],
      });
      expect(targetKeys).toEqual(['a', 'b', 'c']);
      expect(selectedKeys).toEqual(['a']);
      return null;
    };
    mount(<TransferCpn />);
  });

  it('should move selected keys exclude disabled to right list', () => {
    const TransferCpn = () => {
      const { targetKeys, selectedKeys, transferKeys } = useTransfer({
        targetKeys: ['a'],
        selectedKeys: ['b', 'c'],
        disabledKeys: ['b'],
      });
      return (
        <div
          id="res"
          target={targetKeys}
          selected={selectedKeys}
          onClick={() => transferKeys(Direction.Right)}
        >
          res
        </div>
      );
    };
    const wrapper = mount(<TransferCpn />);
    wrapper.find('#res').simulate('click');
    expect(wrapper.find('#res').prop('target')).toEqual(['c', 'a']);
    expect(wrapper.find('#res').prop('selected')).toEqual(['b']);
  });

  it('should move selected keys exclude disabled to left list', () => {
    const TransferCpn = () => {
      const { targetKeys, selectedKeys, transferKeys } = useTransfer({
        targetKeys: ['a', 'b'],
        selectedKeys: ['a', 'b'],
        disabledKeys: ['a'],
      });
      return (
        <div
          id="res"
          target={targetKeys}
          selected={selectedKeys}
          onClick={() => transferKeys(Direction.Left)}
        >
          res
        </div>
      );
    };
    const wrapper = mount(<TransferCpn />);
    wrapper.find('#res').simulate('click');
    expect(wrapper.find('#res').prop('target')).toEqual(['a']);
    expect(wrapper.find('#res').prop('selected')).toEqual(['a']);
  });

  it('change right selected keys', () => {
    const TransferCpn = () => {
      const { selectedKeys, changeSelectedKeys } = useTransfer({
        selectedKeys: ['a'],
      });
      return (
        <div
          id="res"
          selected={selectedKeys}
          onClick={() => changeSelectedKeys(Direction.Right, ['b', 'c'])}
        >
          res
        </div>
      );
    };
    const wrapper = mount(<TransferCpn />);
    wrapper.find('#res').simulate('click');
    expect(wrapper.find('#res').prop('selected')).toEqual(['b', 'c', 'a']);
  });

  it('change left selected keys', () => {
    const TransferCpn = () => {
      const { selectedKeys, changeSelectedKeys } = useTransfer({
        selectedKeys: ['a'],
      });
      return (
        <div
          id="res"
          selected={selectedKeys}
          onClick={() => changeSelectedKeys(Direction.Left, ['b', 'c'])}
        >
          res
        </div>
      );
    };
    const wrapper = mount(<TransferCpn />);
    wrapper.find('#res').simulate('click');
    expect(wrapper.find('#res').prop('selected')).toEqual(['b', 'c']);
  });

  it('reset selected keys', () => {
    const TransferCpn = () => {
      const { selectedKeys, resetSelectedKeys } = useTransfer({
        selectedKeys: ['a'],
      });
      return (
        <div
          id="res"
          selected={selectedKeys}
          onClick={() => resetSelectedKeys(['b', 'c'])}
        >
          res
        </div>
      );
    };
    const wrapper = mount(<TransferCpn />);
    wrapper.find('#res').simulate('click');
    expect(wrapper.find('#res').prop('selected')).toEqual(['b', 'c']);
  });

  it('reset target keys', () => {
    const TransferCpn = () => {
      const { targetKeys, resetTargetKeys } = useTransfer({
        targetKeys: ['a'],
      });
      return (
        <div
          id="res"
          target={targetKeys}
          onClick={() => resetTargetKeys(['b', 'c'])}
        >
          res
        </div>
      );
    };
    const wrapper = mount(<TransferCpn />);
    wrapper.find('#res').simulate('click');
    expect(wrapper.find('#res').prop('target')).toEqual(['b', 'c']);
  });
});
