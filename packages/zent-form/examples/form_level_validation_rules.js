/*
  通过formValidations属性添加自定义校验规则
 */

import React, { Component } from 'react';
import Form from '../src';
import '../assets/index.scss';

const { Field, createForm } = Form;

const renderField = props => (
  <div className="zent-form__control-group">
    <label className="zent-form__control-label">{props.label}</label>
    <div className="zent-form__controls">
      <input {...props} />
      {props.isTouched && props.error && <span className="zent-form__help-block">{props.error}</span>}
    </div>
  </div>
);

class CustomRuleForm extends Component {
  render() {
    return (
      <Form prefix="zent" horizontal>
        <Field
          name="a"
          type="number"
          component={renderField}
          label="a"
          value="2"
          validations={{ required: true, isMoreThan: 'b' }}
          validationErrors={{ required: '不能为空', isMoreThan: 'a必须大于b' }}
        />
        <Field
          name="b"
          type="number"
          component={renderField}
          label="b"
          value=""
          validations={{ required: true, isLessThan: 'a' }}
          validationErrors={{ required: '不能为空', isLessThan: 'b必须小于a' }}
        />
        <div className="zent-form__form-actions">
          <button type="submit">提交</button>
        </div>
      </Form>
    );
  }
}

const CustomRuleFormContainer = createForm({
  formValidations: {
    isMoreThan(values, value, otherField) {
      return Number(value) > Number(values[otherField]);
    },
    isLessThan(values, value, otherField) {
      return Number(value) < Number(values[otherField]);
    }
  }
})(CustomRuleForm);

export default class Simple extends Component {
  render() {
    return (
      <div>
        <h2>添加自定义校验规则</h2>
        <hr />
        <CustomRuleFormContainer />
      </div>
    );
  }
}
