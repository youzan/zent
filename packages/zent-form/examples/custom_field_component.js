/*
  这里简单封装了一个input输入框
 */

import React, { Component } from 'react';
import cx from 'zent-utils/classnames';
import Form from '../src';
import 'zent-input/assets/index.scss';
import '../assets/index.scss';

const { Field, createForm } = Form;

const renderEmail = (props) => {
  const showError = props.isTouched && props.error;
  const className = cx({
    'zent-form__control-group': true,
    'has-error': showError
  });
  return (
    <div className={className}>
      <label className="zent-form__control-label">邮箱</label>
      <div className="zent-form__controls">
        <input type="text" name={props.name} value={props.value} onChange={props.onChange} />
        {showError && <span className="zent-form__help-block">{props.error}</span>}
      </div>
    </div>
  );
};

class OverviewForm extends Component {
  render() {
    return (
      <Form className="form1" horizontal>
        <Field name="email" component={renderEmail} value="11@youzan.com" validations={{ isEmail: true }} validationErrors={{ isEmail: '请输入正确的格式' }} />
      </Form>
    );
  }
}

const OverviewFormContainer = createForm()(OverviewForm);

export default class Simple extends Component {
  render() {
    return (
      <div>
        <h2>封装自定义组件</h2>
        <hr />
        <OverviewFormContainer />
      </div>
    );
  }
}
