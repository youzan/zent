import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Transfer, { useTransfer } from 'transfer';
import { Direction } from 'transfer/constants';

Enzyme.configure({ adapter: new Adapter() });

describe('<Transfer />', () => {
  const listCommonProps = {
    dataSource: [
      {
        key: 'a',
        title: 'a',
      },
      {
        key: 'b',
        title: 'b',
      },
      {
        key: 'c',
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

    wrapper
      .find('ArrowButton')
      .at(0)
      .simulate('click');

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

    wrapper
      .find('ArrowButton')
      .at(1)
      .simulate('click');

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

    wrapper
      .find('ArrowButton')
      .at(0)
      .simulate('click');

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
      .filterWhere(n => n.prop('data').key === 'a')
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
      .filterWhere(n => n.prop('data').key === 'b')
      .simulate('click');
    expect(handleSelectChange).toHaveBeenLastCalledWith(['b', 'a']);
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

  it('should move selected keys exclude disabled to corresponding list', () => {
    const TransferCpn = () => {
      const { targetKeys, selectedKeys, transferKeys } = useTransfer({
        targetKeys: ['a'],
        selectedKeys: ['b', 'c'],
        disabledKeys: ['b'],
      });
      return (
        <div
          id="res"
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onClick={() => transferKeys(Direction.Right)}
        >
          res
        </div>
      );
    };
    const wrapper = mount(<TransferCpn />);
    wrapper.find('#res').simulate('click');
    expect(wrapper.find('#res').prop('targetKeys')).toEqual(['c', 'a']);
    expect(wrapper.find('#res').prop('selectedKeys')).toEqual(['b']);
  });

  it('change selected keys', () => {
    const TransferCpn = () => {
      const { selectedKeys, changeSelectedKeys } = useTransfer({
        selectedKeys: ['a'],
      });
      return (
        <div
          id="res"
          selectedKeys={selectedKeys}
          onClick={() => changeSelectedKeys(Direction.Right, ['b', 'c'])}
        >
          res
        </div>
      );
    };
    const wrapper = mount(<TransferCpn />);
    wrapper.find('#res').simulate('click');
    expect(wrapper.find('#res').prop('selectedKeys')).toEqual(['b', 'c', 'a']);
  });

  it('reset selected keys', () => {
    const TransferCpn = () => {
      const { selectedKeys, resetSelectedKeys } = useTransfer({
        selectedKeys: ['a'],
      });
      return (
        <div
          id="res"
          selectedKeys={selectedKeys}
          onClick={() => resetSelectedKeys(['b', 'c'])}
        >
          res
        </div>
      );
    };
    const wrapper = mount(<TransferCpn />);
    wrapper.find('#res').simulate('click');
    expect(wrapper.find('#res').prop('selectedKeys')).toEqual(['b', 'c']);
  });

  it('reset target keys', () => {
    const TransferCpn = () => {
      const { targetKeys, resetTargetKeys } = useTransfer({
        targetKeys: ['a'],
      });
      return (
        <div
          id="res"
          targetKeys={targetKeys}
          onClick={() => resetTargetKeys(['b', 'c'])}
        >
          res
        </div>
      );
    };
    const wrapper = mount(<TransferCpn />);
    wrapper.find('#res').simulate('click');
    expect(wrapper.find('#res').prop('targetKeys')).toEqual(['b', 'c']);
  });
});
