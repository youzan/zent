import React from 'react';
import { mount } from 'enzyme';

import ZentForm from '../src';
import Option from '@youzan/zent-select';

describe('GetControlGroup', () => {
  const { Form, createForm, Field, getControlGroup } = ZentForm;
  const FormCreated = createForm()(Form);
  const context = mount(
    <FormCreated>
      <Field name="bar" component={props => (<div {...props} />)} />
    </FormCreated>
  ).find(Field).getNode().context;

  it('will render default structure with example usage(as component prop of Field)', () => {
    const addtionInput = getControlGroup(props => (<input type="text" {...props} />));
    const wrapper = mount(<Field name="foo" component={addtionInput} />, { context });
    /**
     * .zent-form__control-group
     *   label.zent-form__control-label
     *   .zent-form__controls
     *     Control(component)
     */
    expect(wrapper.find('.zent-form__control-group').length).toBe(1);
    expect(wrapper.find('.zent-form__control-label').length).toBe(1);
    expect(wrapper.find('.zent-form__controls').length).toBe(1);
    expect(wrapper.find('input').length).toBe(1);
  });

  it('controlGroup have three render switch: required, helpDesc and showError', () => {
    const addtionInput = getControlGroup(props => (<input type="text" {...props} />));
    const wrapper = mount(<Field name="foo" component={addtionInput} required helpDesc={'foo'} validations={{ isEmail: true }} validationErrors={{ isEmail: '必须输入有效的Email地址' }} />, { context });
    expect(wrapper.find('.zent-form__required').length).toBe(1);
    expect(wrapper.find('.zent-form__required').text()).toBe('*');
    expect(wrapper.find('.zent-form__help-desc').length).toBe(1);
    expect(wrapper.find('.zent-form__help-desc').text()).toBe('foo');
    wrapper.getNode().setValue('foo');
    expect(wrapper.find('.zent-form__help-block').length).toBe(1);
    expect(wrapper.find('.zent-form__help-block').text()).toBe('必须输入有效的Email地址');
  });

  it('CheckboxField', () => {
    const { CheckboxField } = ZentForm;
    const wrapper = mount(<Field name="foo" component={CheckboxField} />, { context });
    expect(wrapper.find('Checkbox').length).toBe(1);
    expect('checked' in wrapper.find('Checkbox').props()).toBe(true);
  });

  it('CheckboxGroupField', () => {
    const { CheckboxGroupField } = ZentForm;
    const wrapper = mount(<Field name="foo" component={CheckboxGroupField} />, { context });
    expect(wrapper.find('Group').length).toBe(1);
  });

  it('InputField', () => {
    const { InputField } = ZentForm;
    const wrapper = mount(<Field name="foo" component={InputField} />, { context });
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').prop('type')).toBe('text');
  });

  it('RadioGroupField', () => {
    const { RadioGroupField } = ZentForm;
    const wrapper = mount(<Field name="foo" component={RadioGroupField} />, { context });
    expect(wrapper.find('Group').length).toBe(1);
  });

  it('SelectField', () => {
    const { SelectField } = ZentForm;
    const wrapper = mount(<Field name="foo" component={SelectField}>
      <Option className="zent-select-option" value="1">选项一</Option>
      <Option className="zent-select-option" value="2">选项二</Option>
      <Option className="zent-select-option" value="3">选项三</Option>
    </Field>, { context });
    expect(wrapper.find('Select').length).toBe(1);

    // HACK: select is hard to test the onChange
    wrapper.find('Select').prop('onChange')({ target: { value: 'foo' } }, { value: '选项hack' });
  });
});
