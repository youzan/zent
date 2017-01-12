/* eslint-disable no-console */

import React, { Component } from 'react';
import { Form, Field, createForm } from '../src';
import '../assets/index.scss';

const renderField = props => (
  <div className="zent-form__control-group">
    <label className="zent-form__control-label">{props.label}</label>
    <div className="zent-form__controls">
      <input {...props} />
      {props.isTouched && props.error && <span className="zent-form__help-block">{props.error}</span>}
    </div>
  </div>
);


class RegisterForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit} horizontal>
        <Field
          name="user"
          type="text"
          component={renderField}
          label="用户名："
          value="111"
          validations={{ required: true }}
          validationErrors={{ required: '用户名不能为空' }}
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          label="密码："
          value="222"
          validations={{ required: true }}
          validationErrors={{ required: '密码不能为空' }}
        />
        <Field
          name="confirmPassword"
          type="password"
          component={renderField}
          label="确认密码："
          value="222"
          validations={{
            required: true,
            isPasswordEqual(values, value) {
              if (values.password !== value) {
                return '两次密码输入不一致';
              }
              return true;
            }
          }}
          validationErrors={{
            required: '确认密码不能为空'
          }}
        />
        <div className="zent-form__form-actions">
          <button type="submit">登录</button>
        </div>
      </Form>
    );
  }
}

const RegisterFormContainer = createForm()(RegisterForm);

export default class Simple extends Component {
  // handleSubmit直接接收events对象而不传入一个包含异步操作的function的话，则会执行传入到form中的onSubmit方法
  onSubmit = (values) => {
    console.log(values);
    return values;
  }

  // onSubmitSuccess的参数会是onSubmit执行的返回值
  onSubmitSuccess = (values) => {
    console.log(values);
  }

  render() {
    return (
      <div>
        <h2>注册账号</h2>
        <hr />
        <RegisterFormContainer
          onSubmit={this.onSubmit}
          onSubmitSuccess={this.onSubmitSuccess}
        />
      </div>
    );
  }
}
