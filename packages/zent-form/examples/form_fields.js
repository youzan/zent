import React, { Component } from 'react';
import Form from '../src';
import Checkbox from 'zent-checkbox';
import Radio from 'zent-radio';
import Option from 'zent-select';
import '../assets/index.scss';
import 'zent-checkbox/assets/index.scss';
import 'zent-select/assets/index.scss';
import 'zent-radio/assets/index.scss';
import 'zent-input/assets/index.scss';

const { Field, createForm, InputField, CheckboxField, CheckboxGroupField, RadioGroupField, SelectField } = Form;
const isAgree = true;

class FieldsForm extends Component {
  render() {
    return (
      <Form horizontal>
        <Field
          name="name"
          type="text"
          label="用户名："
          value="123"
          validations={{ required: true }}
          validationErrors={{ required: '不能为空' }}
          component={InputField}
          helpDesc={<span>我是说明<a href="https://youzan.com">我是链接</a></span>}
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
          name="interest"
          label="兴趣爱好："
          value={['eat', 'sleep']}
          component={CheckboxGroupField}
          validations={{
            validInterest(values, value) {
              const len = value.length;
              if (len === 3) {
                return true;
              } else if (len === 2) {
                return '你才选了两项';
              } else if (len === 1) {
                return '你才选了一项';
              }
            }
          }}
          validationErrors={{
            validInterest: '至少选择一项兴趣爱好'
          }}
        >
          <Checkbox value="eat">吃饭</Checkbox>
          <Checkbox value="sleep">睡觉</Checkbox>
          <Checkbox value="wash">洗澡</Checkbox>
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
        <Field
          name="is_agree"
          label="是否同意本协议："
          value={isAgree}
          component={CheckboxField}
        >
          同意
        </Field>
      </Form>
    );
  }
}

const FieldsFormContainer = createForm()(FieldsForm);

export default class Simple extends Component {
  render() {
    return (
      <div>
        <h2>内置表单组件（对其他zent组件的封装）</h2>
        <hr />
        <FieldsFormContainer />
      </div>
    );
  }
}
