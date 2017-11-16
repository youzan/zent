import React from 'react';
import { mount } from 'enzyme';
import omit from 'lodash/omit';
import ZentForm from 'form';
import Option from 'select';

describe('GetControlGroup and Component_Fields', () => {
  const { Form, createForm, Field, getControlGroup, unknownProps } = ZentForm;
  const FormCreated = createForm()(Form);
  const DivComponent = props => {
    const passableProps = omit(props, unknownProps);
    return <div {...passableProps} />;
  };
  const context = mount(
    <FormCreated>
      <Field name="bar" component={DivComponent} />
    </FormCreated>
  )
    .find(Field)
    .getNode().context;

  it('will render default structure with example usage(as component prop of Field)', () => {
    class Input extends React.Component {
      render() {
        const passableProps = omit(this.props, unknownProps);
        return <input type="text" {...passableProps} />;
      }
    }
    const addtionInput = getControlGroup(Input);
    const wrapper = mount(
      <Field name="foo" ref="field" component={addtionInput} />,
      { context }
    );
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
    expect(
      wrapper
        .get(0)
        .getWrappedComponent()
        .getControlInstance() instanceof Input
    ).toBe(true);
  });

  it('will render without ref when the wrapped component is functionial', () => {
    function Input(props) {
      const passableProps = omit(props, unknownProps);
      return <input {...passableProps} />;
    }
    const addtionInput = getControlGroup(Input);
    const wrapper = mount(
      <Field name="foo" ref="field" component={addtionInput} />,
      { context }
    );
    expect(
      wrapper
        .get(0)
        .getWrappedComponent()
        .getControlInstance()
    ).toBe(undefined);
  });

  it('ControlGroup have three render switch: required, helpDesc, notice and showError', () => {
    const Input = props => {
      const passableProps = omit(props, unknownProps);
      return <input type="text" {...passableProps} />;
    };
    const addtionInput = getControlGroup(Input);
    const wrapper = mount(
      <Field
        name="foo"
        component={addtionInput}
        required
        helpDesc={'foo'}
        notice={'bar'}
        validations={{ isEmail: true }}
        validationErrors={{ isEmail: '必须输入有效的Email地址' }}
      />,
      { context }
    );
    expect(wrapper.find('.zent-form__required').length).toBe(1);
    expect(wrapper.find('.zent-form__required').text()).toBe('*');
    expect(wrapper.find('.zent-form__help-desc').length).toBe(1);
    expect(wrapper.find('.zent-form__help-desc').text()).toBe('foo');
    expect(wrapper.find('.zent-form__notice-desc').length).toBe(1);
    expect(wrapper.find('.zent-form__notice-desc').text()).toBe('bar');

    // HACK: console.error
    // wrapper.getNode().setValue('foo');
    // expect(wrapper.find('.zent-form__help-block').length).toBe(1);
    // expect(wrapper.find('.zent-form__help-block').text()).toBe('必须输入有效的Email地址');
  });

  it('CheckboxField', () => {
    const { CheckboxField } = ZentForm;
    const wrapper = mount(<Field name="foo" component={CheckboxField} />, {
      context
    });
    expect(wrapper.find('Checkbox').length).toBe(1);
    expect('checked' in wrapper.find('Checkbox').props()).toBe(true);
  });

  it('CheckboxGroupField', () => {
    const { CheckboxGroupField } = ZentForm;
    const wrapper = mount(
      <Field name="foo" component={CheckboxGroupField} value={[]} />,
      {
        context
      }
    );
    expect(wrapper.find('Group').length).toBe(1);
  });

  it('InputField', () => {
    const { InputField } = ZentForm;
    const wrapper = mount(<Field name="foo" component={InputField} />, {
      context
    });
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').prop('type')).toBe('text');
  });

  it('RadioGroupField', () => {
    const { RadioGroupField } = ZentForm;
    const wrapper = mount(<Field name="foo" component={RadioGroupField} />, {
      context
    });
    expect(wrapper.find('Group').length).toBe(1);
  });

  it('SelectField', () => {
    const { SelectField } = ZentForm;
    const wrapper = mount(
      <Field name="foo" component={SelectField}>
        <Option className="zent-select-option" value="1">
          选项一
        </Option>
        <Option className="zent-select-option" value="2">
          选项二
        </Option>
        <Option className="zent-select-option" value="3">
          选项三
        </Option>
      </Field>,
      { context }
    );
    expect(wrapper.find('Select').length).toBe(1);

    // HACK: select is hard to test the onChange
    // NOTE: it will pass onChange event.
    wrapper.find('Select').prop('onChange')(
      { target: { value: 'foo' } },
      { value: '选项hack' }
    );
  });

  it('NumberInputField', () => {
    const { NumberInputField } = ZentForm;
    const wrapper = mount(<Field name="foo" component={NumberInputField} />, {
      context
    });
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').prop('type')).toBe('text');
    expect(wrapper.find('.zent-number-input-wrapper').length).toBe(1);
  });

  it('ColorPickerField', () => {
    const { ColorPickerField } = ZentForm;
    const wrapper = mount(<Field name="foo" component={ColorPickerField} />, {
      context
    });
    expect(wrapper.find('.zent-color-picker').length).toBe(1);
  });

  it('DateRangePickerField', () => {
    const { DateRangePickerField } = ZentForm;
    const wrapper = mount(
      <Field name="foo" component={DateRangePickerField} type="split" />,
      {
        context
      }
    );
    expect(wrapper.find('.zent-datetime-picker').length).toBe(3);
    expect(wrapper.find('input').length).toBe(2);
  });

  it('SwitchField', () => {
    const { SwitchField } = ZentForm;
    const wrapper = mount(
      <Field name="foo" value={false} component={SwitchField} />,
      {
        context
      }
    );
    expect(wrapper.find('.zent-switch').length).toBe(1);
  });

  it('FormCheckboxField', () => {
    const { FormCheckboxField } = ZentForm;
    const wrapper = mount(
      <FormCreated>
        <FormCheckboxField name="foo" />
      </FormCreated>
    );
    expect(wrapper.find('Checkbox').length).toBe(1);
    expect('checked' in wrapper.find('Checkbox').props()).toBe(true);
  });

  it('FormCheckboxGroupField', () => {
    const { FormCheckboxGroupField } = ZentForm;
    const wrapper = mount(
      <FormCreated>
        <FormCheckboxGroupField name="foo" value={[]} />
      </FormCreated>
    );
    expect(wrapper.find('Group').length).toBe(1);
  });

  it('FormInputField', () => {
    const { FormInputField } = ZentForm;
    const wrapper = mount(
      <FormCreated>
        <FormInputField name="foo" />
      </FormCreated>
    );
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').prop('type')).toBe('text');
  });

  it('FormRadioGroupField', () => {
    const { FormRadioGroupField } = ZentForm;
    const wrapper = mount(
      <FormCreated>
        <FormRadioGroupField name="foo" />
      </FormCreated>
    );
    expect(wrapper.find('Group').length).toBe(1);
  });

  it('FormSelectField', () => {
    const { FormSelectField } = ZentForm;
    const wrapper = mount(
      <FormCreated>
        <FormSelectField name="foo">
          <Option className="zent-select-option" value="1">
            选项一
          </Option>
          <Option className="zent-select-option" value="2">
            选项二
          </Option>
          <Option className="zent-select-option" value="3">
            选项三
          </Option>
        </FormSelectField>
      </FormCreated>
    );
    expect(wrapper.find('Select').length).toBe(1);

    // HACK: select is hard to test the onChange
    // NOTE: it will pass onChange event.
    wrapper.find('Select').prop('onChange')(
      { target: { value: 'foo' } },
      { value: '选项hack' }
    );
  });

  it('FormNumberInputField', () => {
    const { FormNumberInputField } = ZentForm;
    const wrapper = mount(
      <FormCreated>
        <FormNumberInputField name="foo" />
      </FormCreated>
    );
    expect(wrapper.find('input').length).toBe(1);
    expect(wrapper.find('input').prop('type')).toBe('text');
    expect(wrapper.find('.zent-number-input-wrapper').length).toBe(1);
  });

  it('FormColorPickerField', () => {
    const { FormColorPickerField } = ZentForm;
    const wrapper = mount(
      <FormCreated>
        <FormColorPickerField name="foo" />
      </FormCreated>
    );
    expect(wrapper.find('.zent-color-picker').length).toBe(1);
  });

  it('FormDateRangePickerField', () => {
    const { FormDateRangePickerField } = ZentForm;
    const wrapper = mount(
      <FormCreated>
        <FormDateRangePickerField name="foo" type="split" />
      </FormCreated>
    );
    expect(wrapper.find('.zent-datetime-picker').length).toBe(3);
    expect(wrapper.find('input').length).toBe(2);
  });

  it('FormSwitchField', () => {
    const { FormSwitchField } = ZentForm;
    const wrapper = mount(
      <FormCreated>
        <FormSwitchField value={false} name="foo" />
      </FormCreated>
    );
    expect(wrapper.find('.zent-switch').length).toBe(1);
  });
});
