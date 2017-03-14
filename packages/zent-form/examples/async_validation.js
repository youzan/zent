/* eslint-disable */
/*
  用户名中输入pangxie，blur后过1.5s会提示用户名已被占用，提示未出现时点击提交会alert“正在校验中”
 */

import React, { Component } from 'react';
import Form from '../src';
import '../assets/index.scss';
import 'zent-input/assets/index.scss';

const { Field, createForm, InputField } = Form;

class FieldsForm extends Component {

  submit = (values) => {
    const zentForm = this.props.zentForm;

    console.log(values);
    console.log(zentForm);
  }

  asyncValidation = (values, value) => {
    return new Promise((resolve, reject) => setTimeout(() => {
      if (value === 'pangxie') {
        reject('用户名已被占用');
      } else {
        resolve();
      }
    }, 1500));
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.submit)} horizontal>
        <Field
          name="name"
          type="text"
          label="用户名："
          value=""
          validations={{ required: true }}
          validationErrors={{ required: '不能为空' }}
          component={InputField}
          asyncValidation={this.asyncValidation}
        />
        <Field
          name="password"
          type="password"
          label="密码："
          value=""
          validations={{
            required: true
          }}
          validationErrors={{
            required: '不能为空'
          }}
          component={InputField}
        />
        <div className="zent-form__form-actions">
          <button type="submit">提交</button>
        </div>
      </Form>
    );
  }
}

const FieldsFormContainer = createForm()(FieldsForm);

export default class Simple extends Component {
  onSubmitFail = (error = {}) => {
    const errors = error.errors || {};
    if (errors.isValidating) {
      alert('正在校验中');
    }
  }

  render() {
    return (
      <div>
        <h2>异步校验</h2>
        <hr />
        <FieldsFormContainer onSubmitFail={this.onSubmitFail} />
      </div>
    );
  }
}
