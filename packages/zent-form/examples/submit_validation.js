/* eslint-disable no-console */

import React, { Component } from 'react';
import Form from '../src';
import cx from 'zent-utils/classnames';
import '../assets/index.scss';

const { Field, createForm } = Form;
const renderField = props => {
  const showError = props.isTouched && props.error;
  const controlGroupClass = cx({
    'zent-form__control-group': true,
    'has-error': showError
  });
  return (
    <div className={controlGroupClass}>
      <label className="zent-form__control-label">{props.label}</label>
      <div className="zent-form__controls">
        <input {...props} />
        {showError && <span className="zent-form__help-block">{props.error}</span>}
      </div>
    </div>
  );
};


class RegisterForm extends Component {
  submit = (values, zentForm) => {
    let promise = new Promise((resolve) => setTimeout(resolve, 1000));
    return promise.then(() => {
      zentForm.setFieldExternalErrors({
        user: '用户名已被占用'
      });
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.submit)} horizontal>
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
  render() {
    return (
      <div>
        <h2>服务端校验（展示服务端错误信息）</h2>
        <hr />
        <RegisterFormContainer
        />
      </div>
    );
  }
}
