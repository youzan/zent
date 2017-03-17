/*
  表单分块展示
 */
import React, { Component } from 'react';
import Form from '../src';
import Radio from 'zent-radio';
import '../assets/index.scss';
import 'zent-checkbox/assets/index.scss';
import 'zent-radio/assets/index.scss';
import 'zent-input/assets/index.scss';

const { Field, Fieldset, createForm, InputField, RadioGroupField } = Form;

class FieldsetForm extends Component {
  render() {
    return (
      <Form horizontal>
        <Fieldset legend="Fieldset1">
          <Field
            name="name"
            type="text"
            label="用户名："
            value="123"
            validations={{ required: true }}
            validationErrors={{ required: '不能为空' }}
            component={InputField}
          />
        </Fieldset>
        <Fieldset legend="Fieldset2">
          <Field
            name="sex"
            label="性别："
            value="female"
            component={RadioGroupField}
          >
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Field>
        </Fieldset>
      </Form>
    );
  }
}

const FieldsetFormContainer = createForm()(FieldsetForm);

export default class Simple extends Component {
  render() {
    return (
      <div>
        <h2>Fieldset</h2>
        <hr />
        <FieldsetFormContainer />
      </div>
    );
  }
}
