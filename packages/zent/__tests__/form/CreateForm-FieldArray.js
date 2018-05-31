/* eslint-disable no-underscore-dangle */

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ZentForm from 'form';

Enzyme.configure({ adapter: new Adapter() });

describe('CreateForm and FieldArray', () => {
  const { Form, createForm, Field, FieldArray, InputField } = ZentForm;
  const returnedFunction = createForm();
  const FormCreated = returnedFunction(Form);
  const fieldComponent = props => {
    const { fields } = props;
    return (
      <ul>
        <div onClick={() => fields.push({})}>添加</div>
        {fields.map((member, index) => {
          return (
            <li key={index}>
              <div
                className="member-title"
                onClick={() => fields.remove(index)}
              >
                删除
              </div>
              <Field
                name={`${member}.name`}
                type="text"
                component={InputField}
                label="名字："
                required
                validations={{ required: true }}
                validationErrors={{ required: '请填写成员名字' }}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  const context = mount(
    <FormCreated>
      <FieldArray name="members" component={fieldComponent} />
    </FormCreated>
  )
    .find(FieldArray)
    .instance().context;

  it('While render, Field will load default state and contextObj from created zent-form', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );
    expect(wrapper.find(Field).length).toBe(0);
    expect(typeof wrapper.find(FieldArray).instance().context.zentForm).toBe(
      'object'
    );
    expect(wrapper.find(FieldArray).instance()._name).toBe('members');
  });

  it('FieldArray must be in Form Component', () => {
    expect(() => {
      mount(<FieldArray name="members" component={fieldComponent} />);
    }).toThrow();
  });

  it('FieldArray must have props name', () => {
    expect(() => {
      mount(<FieldArray component={fieldComponent} />, { context });
    }).toThrow();
  });

  it('FieldArray has componentWillRecieveProps method', () => {
    const wrapper = mount(
      <FieldArray name="members" component={fieldComponent} />,
      { context }
    );
    wrapper.setProps({ name: 'test' });
    expect(wrapper.find(FieldArray).instance()._name).toBe('test');
  });

  it('FieldArray has push method', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );
    const push = wrapper.find(FieldArray).instance().pushFields;
    push({});
    wrapper.update();
    expect(wrapper.find('Field').length).toBe(1);
    const fieldZentform = wrapper.find(Field).instance().context.zentForm;
    expect(typeof fieldZentform).toBe('object');
    expect(fieldZentform.prefix).toBe('members');
    expect(typeof fieldZentform.onChangeFieldArray).toBe('function');
    expect(
      wrapper
        .find(Field)
        .instance()
        .getName()
    ).toBe('members[0].name');
    expect(wrapper.find(Field).instance().state._value).toBe('');
    expect(wrapper.find(Field).instance().state._isValid).toBe(false);
    expect(wrapper.find(Field).instance().state._isDirty).toBe(false);
    expect(wrapper.find(Field).instance().state._isValidating).toBe(false);
    expect(wrapper.find(Field).instance().state._initialValue).toBe('');
    expect(wrapper.find(Field).instance().state._validationError.length).toBe(
      1
    );
    expect(wrapper.find(Field).instance().state._externalError).toBe(null);
  });

  it('FieldArray has forEachFields method', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );
    const push = wrapper.find(FieldArray).instance().pushFields;
    push({});
    push({});
    wrapper.update();
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'foo' } });
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'bar' } });
    const values = [];
    const forEachFields = wrapper.find(FieldArray).instance().forEachFields;
    forEachFields((name, index, key, value) => {
      values.push(`${name}=${value.name}`);
    });
    expect(values.length).toBe(2);
    expect(values[0]).toBe('[0]=foo');
    expect(values[1]).toBe('[1]=bar');
  });

  it('FieldArray has getField method', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );
    const push = wrapper.find(FieldArray).instance().pushFields;
    push({});
    push({});
    wrapper.update();
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'foo' } });
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'bar' } });
    const getField = wrapper.find(FieldArray).instance().getField;
    expect(() => getField(10)).toThrow();
    const fieldValue = getField(1);
    expect(typeof fieldValue).toBe('object');
    expect(Object.keys(fieldValue).length).toBe(1);
    expect(Object.keys(fieldValue)[0]).toBe('name');
    expect(fieldValue.name).toBe('bar');
  });

  it('FieldArray has getAllFields method', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );
    const push = wrapper.find(FieldArray).instance().pushFields;
    push({});
    push({});
    wrapper.update();
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'foo' } });
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'bar' } });
    const getAllFields = wrapper.find(FieldArray).instance().getAllFields;
    const fieldValue = getAllFields();
    expect(typeof fieldValue).toBe('object');
    expect(fieldValue.length).toBe(2);
    expect(typeof fieldValue[0]).toBe('object');
    expect(Object.keys(fieldValue[0]).length).toBe(1);
    expect(Object.keys(fieldValue[0])[0]).toBe('name');
    expect(fieldValue[0].name).toBe('foo');
    expect(typeof fieldValue[1]).toBe('object');
    expect(Object.keys(fieldValue[1]).length).toBe(1);
    expect(Object.keys(fieldValue[1])[0]).toBe('name');
    expect(fieldValue[1].name).toBe('bar');
  });

  it('FieldArray has mapFields method', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );
    const push = wrapper.find(FieldArray).instance().pushFields;
    push({});
    push({});
    wrapper.update();
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'foo' } });
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'bar' } });
    const mapFields = wrapper.find(FieldArray).instance().mapFields;
    const result = mapFields((name, key, index, value) => {
      return `${name}=${value.name}`;
    });
    expect(result.length).toBe(2);
    expect(result[0]).toBe('[0]=foo');
    expect(result[1]).toBe('[1]=bar');
  });

  it('FieldArray has moveFields method', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );
    const push = wrapper.find(FieldArray).instance().pushFields;
    push({});
    push({});
    push({});
    wrapper.update();
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'foo' } });
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'bar' } });
    wrapper
      .find('input')
      .at(2)
      .simulate('change', { target: { value: 'test' } });
    const moveFields = wrapper.find(FieldArray).instance().moveFields;
    moveFields(0, 2);
    wrapper.update();
    const fields = wrapper.find(FieldArray).instance().state.fieldArray;
    expect(fields.length).toBe(3);
    expect(fields[0]._fieldInternalValue.name).toBe('bar');
    expect(fields[1]._fieldInternalValue.name).toBe('test');
    expect(fields[2]._fieldInternalValue.name).toBe('foo');
    expect(() => moveFields(0, 4)).toThrow();
  });

  it('FieldArray has popFields and pushFields method', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );
    const push = wrapper.find(FieldArray).instance().pushFields;
    push({});
    push({});
    push({});
    wrapper.update();
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'foo' } });
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'bar' } });
    wrapper
      .find('input')
      .at(2)
      .simulate('change', { target: { value: 'test' } });
    let fields = wrapper.find(FieldArray).instance().state.fieldArray;
    expect(fields.length).toBe(3);
    expect(fields[0]._fieldInternalValue.name).toBe('foo');
    expect(fields[1]._fieldInternalValue.name).toBe('bar');
    expect(fields[2]._fieldInternalValue.name).toBe('test');
    const pop = wrapper.find(FieldArray).instance().popFields;
    pop();
    fields = wrapper.find(FieldArray).instance().state.fieldArray;
    expect(fields.length).toBe(2);
    expect(fields[0]._fieldInternalValue.name).toBe('foo');
    expect(fields[1]._fieldInternalValue.name).toBe('bar');
  });

  it('FieldArray has removeFields method', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );
    const push = wrapper.find(FieldArray).instance().pushFields;
    push({});
    push({});
    push({});
    wrapper.update();
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'foo' } });
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'bar' } });
    wrapper
      .find('input')
      .at(2)
      .simulate('change', { target: { value: 'test' } });
    const removeFields = wrapper.find(FieldArray).instance().removeFields;
    removeFields(1);
    let fields = wrapper.find(FieldArray).instance().state.fieldArray;
    expect(fields.length).toBe(2);
    expect(fields[0]._fieldInternalValue.name).toBe('foo');
    expect(fields[1]._fieldInternalValue.name).toBe('test');
    expect(() => {
      removeFields(2);
    }).toThrow();
  });

  it('FieldArray has removeAllFields method', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );
    const push = wrapper.find(FieldArray).instance().pushFields;
    push({});
    push({});
    push({});
    wrapper.update();
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'foo' } });
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'bar' } });
    wrapper
      .find('input')
      .at(2)
      .simulate('change', { target: { value: 'test' } });
    let fields = wrapper.find(FieldArray).instance().state.fieldArray;
    expect(fields.length).toBe(3);
    const removeAllFields = wrapper.find(FieldArray).instance().removeAllFields;
    removeAllFields();
    fields = wrapper.find(FieldArray).instance().state.fieldArray;
    expect(fields.length).toBe(0);
  });

  it('FieldArray has shiftFields and unshiftFields method', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );
    const unshiftFields = wrapper.find(FieldArray).instance().unshiftFields;
    unshiftFields({});
    wrapper.update();
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'foo' } });
    unshiftFields({});
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'bar' } });
    unshiftFields({});
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'test' } });
    let fields = wrapper.find(FieldArray).instance().state.fieldArray;
    expect(fields.length).toBe(3);
    expect(fields[0]._fieldInternalValue.name).toBe('test');
    expect(fields[1]._fieldInternalValue.name).toBe('bar');
    expect(fields[2]._fieldInternalValue.name).toBe('foo');
    const shiftFields = wrapper.find(FieldArray).instance().shiftFields;
    shiftFields();
    fields = wrapper.find(FieldArray).instance().state.fieldArray;
    expect(fields.length).toBe(2);
    expect(fields[0]._fieldInternalValue.name).toBe('bar');
    expect(fields[1]._fieldInternalValue.name).toBe('foo');
  });

  it('FieldArray has swapFields method', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );
    const push = wrapper.find(FieldArray).instance().pushFields;
    push({});
    push({});
    push({});
    wrapper.update();
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'foo' } });
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'bar' } });
    wrapper
      .find('input')
      .at(2)
      .simulate('change', { target: { value: 'test' } });
    const swapFields = wrapper.find(FieldArray).instance().swapFields;
    swapFields(0, 2);
    wrapper.update();
    let fields = wrapper.find(FieldArray).instance().state.fieldArray;
    expect(fields.length).toBe(3);
    expect(fields[0]._fieldInternalValue.name).toBe('test');
    expect(fields[1]._fieldInternalValue.name).toBe('bar');
    expect(fields[2]._fieldInternalValue.name).toBe('foo');
    expect(() => {
      swapFields(2, 10);
    }).toThrow();
  });

  it('FieldArray has concat method', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );
    const concat = wrapper.find(FieldArray).instance().concatFields;

    concat({});
    wrapper.update();
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'foo' } });
    let fields = wrapper.find(FieldArray).instance().state.fieldArray;
    expect(fields.length).toBe(1);
    expect(fields[0]._fieldInternalValue.name).toBe('foo');

    concat([{}, {}]);
    wrapper.update();
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'bar' } });
    wrapper
      .find('input')
      .at(2)
      .simulate('change', { target: { value: 'test' } });
    fields = wrapper.find(FieldArray).instance().state.fieldArray;
    expect(fields.length).toBe(3);
    expect(fields[0]._fieldInternalValue.name).toBe('foo');
    expect(fields[1]._fieldInternalValue.name).toBe('bar');
    expect(fields[2]._fieldInternalValue.name).toBe('test');
  });

  it('FieldArray has replaceAll method', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );
    const replaceAll = wrapper.find(FieldArray).instance().replaceAllFields;

    replaceAll([{ name: 'foobar' }]);
    wrapper.update();
    let fields = wrapper.find(FieldArray).instance().state.fieldArray;
    expect(fields.length).toBe(1);
    expect(fields[0]._fieldInternalValue.name).toBe('foobar');
  });

  it('FieldArray has value prop', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray
          name="members"
          component={fieldComponent}
          value={[{ name: 'zent' }]}
        />
      </FormCreated>
    );
    const fa = wrapper.find(FieldArray).instance();

    let fields = fa.state.fieldArray;
    expect(fields.length).toBe(1);
    expect(fields[0]._fieldInternalValue.name).toBe('zent');
  });

  it('FieldArray has an unused getWrappedComponent method(not metioned in docs)', () => {
    const wrapper = mount(
      <FieldArray name="members" component={fieldComponent} />,
      { context }
    );
    expect(typeof wrapper.instance().getWrappedComponent).toBe('function');

    // NOTE: 'this.getWrappedComponent = ref' turns out null, need catch up.
    // component是functional component的时候ref是null
    expect(wrapper.instance().getWrappedComponent()).toBeFalsy();
  });

  it('The component prop of FieldArray can be a html tag string', () => {
    const nestedWrapper = mount(
      <FormCreated>
        <FieldArray name="members" component="input" />
      </FormCreated>
    );
    const inputField = nestedWrapper.find(FieldArray);
    expect(inputField.length).toBe(1);
  });

  it('Initialize FieldArray', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );

    wrapper.instance().initialize({ members: ['1', '2'] });
    wrapper.update();
    const fa = wrapper.find(FieldArray).instance();
    expect(fa.state.fieldArray.length).toBe(2);
    expect(fa.state.fieldArray[0]._fieldInternalValue).toBe('1');
    expect(fa.state.fieldArray[1]._fieldInternalValue).toBe('2');
  });

  it('Set FieldArray values', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );

    wrapper.instance().setFieldsValue({ members: ['1', '2'] });
    wrapper.update();
    wrapper.update();
    const fa = wrapper.find(FieldArray).instance();
    expect(fa.state.fieldArray.length).toBe(2);
    expect(fa.state.fieldArray[0]._fieldInternalValue).toBe('1');
    expect(fa.state.fieldArray[1]._fieldInternalValue).toBe('2');
  });

  it('Reset FieldArray values', () => {
    const wrapper = mount(
      <FormCreated>
        <FieldArray name="members" component={fieldComponent} />
      </FormCreated>
    );

    wrapper.instance().setFieldsValue({ members: ['1', '2'] });
    wrapper.update();
    wrapper.update();
    const fa = wrapper.find(FieldArray).instance();
    expect(fa.state.fieldArray.length).toBe(2);
    expect(fa.state.fieldArray[0]._fieldInternalValue).toBe('1');
    expect(fa.state.fieldArray[1]._fieldInternalValue).toBe('2');

    wrapper.instance().resetFieldsValue({});
    wrapper.update();
    expect(wrapper.find(FieldArray).instance().state.fieldArray.length).toBe(0);
  });
});
