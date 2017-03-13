/* eslint-disable no-console */

import React, { Component } from 'react';
import Form from '../src';
import Radio from 'zent-radio';
import Option from 'zent-select';
import '../assets/index.scss';
import 'zent-checkbox/assets/index.scss';
import 'zent-select/assets/index.scss';
import 'zent-radio/assets/index.scss';
import 'zent-input/assets/index.scss';

const { Field, Fieldset, createForm, InputField, RadioGroupField, SelectField } = Form;

class FieldsetForm extends Component {

  submit = (values) => {
    const zentForm = this.props.zentForm;

    console.log(values);
    console.log(zentForm);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)} horizontal>
        <Fieldset legend="Fieldset1">
          <Field
            name="name"
            type="text"
            label="用户名："
            value="123"
            validations={{ required: true }}
            validationErrors={{ required: '不能为空' }}
            component={InputField}
            helpDesc="我是说明2222"
            required
          />
          <Field
            name="number"
            type="number"
            label="购买数量："
            addonBefore="买了"
            value="123"
            addonAfter="个苹果"
            validations={{
              required: true,
              validNumber(values, value) {
                return /^\d*$/.test(value);
              }
            }}
            validationErrors={{
              required: '不能为空',
              validNumber: '必须是整数'
            }}
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
          <Field
            name="custom-select"
            label="请选择："
            className="custom-select"
            placeholder="请选择"
            component={SelectField}
          >
            <Option className="zent-select-option" value="1">选项一</Option>
            <Option className="zent-select-option" value="2">选项二</Option>
            <Option className="zent-select-option" value="3">选项三</Option>
          </Field>
        </Fieldset>
        <div className="zent-form__form-actions">
          <button type="submit">提交</button>
        </div>
      </Form>
    );
  }
}

const FieldsetFormContainer = createForm()(FieldsetForm);

export default class Simple extends Component {
  render() {
    return (
      <div>
        <h2>内置表单组件</h2>
        <hr />
        <FieldsetFormContainer />
      </div>
    );
  }
}
