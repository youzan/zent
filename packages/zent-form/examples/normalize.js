/* eslint-disable no-console */

import React, { Component } from 'react';
import _ from 'lodash'; // eslint-disable-line
import { Form, Field, createForm } from '../src';
import '../assets/index.scss';

class renderField extends Component {
  render() {
    const props = this.props;

    return (
      <div className="zent-form__control-group">
        <label className="zent-form__control-label">{props.label}</label>
        <div className="zent-form__controls">
          <input {...props} />
          {props.isTouched && props.error && <span>{props.error}</span>}
        </div>
      </div>
    );
  }
}

const renderTimeRange = props => (
  <select name={props.name} value={props.value} onChange={props.onChange}>
    {_.map(_.range(props.from, props.to), (value) => {
      return <option value={value} key={value}>{value < 10 ? `0${value}:00` : `${value}:00`}</option>;
    })}
  </select>
);


class NormalizeForm extends Component {
  static defaultProps = {
    bg_t: 1
  }

  lower(value) {
    return value && value.toLowerCase();
  }

  upper(value) {
    return value && value.toUpperCase();
  }

  toInt(value) {
    return parseInt(value, 10);
  }

  // 完全自主控制submit流程的例子
  submit = () => {
    const zentForm = this.props.zentForm;
    const values = zentForm.getFormValues();
    const field1 = this.field1;
    console.log(values);
    console.log(zentForm.isValid());
    console.log(field1);
  }

  render() {
    const { zentForm } = this.props;
    const { getFieldError } = zentForm;
    const rangeError = getFieldError('bg_t');

    return (
      <Form horizontal>
        <Field
          name="field1"
          type="text"
          component={renderField}
          label="转化为小写："
          value="AAA"
          validations={{ required: true }}
          validationErrors={{ required: '不能为空' }}
          normalize={this.lower}
          ref={(ref) => this.field1 = ref}
        />
        <Field
          name="field2"
          type="text"
          component={renderField}
          label="转为大写："
          value="bbb"
          normalize={this.upper}
        />
        <div className={rangeError ? 'zent-form__control-group has-error' : 'zent-form__control-group'}>
          <label className="zent-form__control-label">发送时间段：</label>
          <div className="zent-form__controls">
            每日
            <Field
              name="bg_t"
              component={renderTimeRange}
              from={0}
              to={24}
              value={this.props.bg_t}
              normalize={this.toInt}
              validations={{ checkTime: true }}
              validationErrors={{ checkTime: '结束时间必须大于开始时间' }} />
            到
            <Field
              name="eg_t"
              component={renderTimeRange}
              from={1}
              to={25}
              value={1}
              normalize={this.toInt}
            />
            {rangeError ? <p className="zent-form__help-block">{rangeError}</p> : null}
          </div>
        </div>
        <div className="zent-form__form-actions">
          <button type="button" onClick={this.submit}>提交</button>
        </div>
      </Form>
    );
  }
}

const NormalizeFormContainer = createForm({
  formValidations: {
    checkTime(values, value) {
      return +value < +values.eg_t;
    }
  }
})(NormalizeForm);

export default class Simple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bg_t: 2
    };
  }

  onChange = () => {
    this.setState({
      bg_t: 20
    });
  }

  render() {
    return (
      <div>
        <h2>表单值格式化</h2>
        <hr />
        <NormalizeFormContainer onChange={this.onChange} bg_t={this.state.bg_t} />
      </div>
    );
  }
}
