import React from 'react';
import Select, { Option } from '../src/index';
import { mount } from 'enzyme';

describe('<Select />', () => {
    test('data的传参方式有效', () => {
        const wrapper = mount(
            <Select data={[1, 2, 3]} />
        );
        expect(wrapper.find('Select').length).toBe(1);
        expect(wrapper.find('Option').length).toBe(3);
    });

    test('Option的传参方式有效', () => {
        const wrapper = mount(
            <Select>
                <Option value="1">选项一</Option>    
                <Option value="2">选项二</Option>    
            </Select>
        );
        expect(wrapper.find('Select').length).toBe(1);
        expect(wrapper.find('Option').length).toBe(2);
    });

    test('测试默认属性', () => {
        const wrapper = mount(
            <Select />
        );
        expect(wrapper.prop('open')).toBe(false);
        expect(wrapper.prop('disabled')).toBe(false);
        expect(wrapper.prop('optionText')).toBe('text');
        expect(wrapper.prop('optionValue')).toBe('value');
        expect(wrapper.prop('prefix')).toBe('zent');
        expect(wrapper.prop('onFilter')).toBe(undefined);
        expect(wrapper.prop('selectedItem').value).toBe('');
        expect(wrapper.prop('selectedItem').text).toBe('');
    });

    test('选择某个选项', () => {
        const wrapper = mount(
            <Select data={[1, 2, 3]} />
        );
        wrapper.find('SelectTrigger').simulate('click');
        wrapper.find('Option').at(1).simulate('click');
        expect(wrapper.state('selectedItem').value).toBe(2);
    });

    test('搜索某个关键字', () => {
        const wrapper = mount(
            <Select data={[1, 2, 3]} search onFilter={(item, keyword) => {
                return `${item.value}` === `${keyword}`;
            }} />
        );
        expect(wrapper.find('InputTrigger').length).toBe(1);
        wrapper.find('input').simulate('change', {
            target: { value: 2 }
        });
        expect(wrapper.find('Option').length).toBe(1);
    });

    test('多标签测试', () => {
        const wrapper = mount(
            <Select data={[1, 2, 3]} tags />
        );
        expect(wrapper.find('TagsTrigger').length).toBe(1);
        wrapper.find('TagsTrigger').simulate('click');
        wrapper.find('Option').at(1).simulate('click');
        wrapper.find('TagsTrigger').simulate('click');
        wrapper.find('Option').at(2).simulate('click');
        expect(wrapper.state('selectedItems').length).toBe(2);
        wrapper.find('Tag').at(0).find('i').simulate('click');
        expect(wrapper.state('selectedItems').length).toBe(1);
    });
});
