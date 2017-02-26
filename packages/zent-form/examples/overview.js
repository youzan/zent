/* eslint-disable no-console */

import React, { Component } from 'react';
import { Form, Field, InputField, createForm } from '../src';
import Checkbox from 'zent-checkbox';
import Select, { SelectTrigger } from 'zent-select';
import 'zent-input/assets/index.scss';
import 'zent-select/assets/index.scss';
import 'zent-checkbox/assets/index.scss';
import '../assets/index.scss';

const renderEmail = (props) => {
  return (
    <div className="zent-form__control-group">
      <label className="zent-form__control-label">邮箱</label>
      <div className="zent-form__controls">
        <input type="text" name={props.name} value={props.value} onChange={props.onChange} />
        {props.isTouched && props.error && <span>{props.error}</span>}
      </div>
    </div>
  );
};

const optionData = [
  { id: '', name: '全部' },
  { id: 1, name: '养生食品分类' },
  { id: 2, name: '休闲食品分类' },
  { id: 3, name: '药效性食物分类' },
  { id: 4, name: '列表中隐藏' }
];

class OverviewForm extends Component {
  render() {
    const { handleSubmit, showDynamicField, zentForm } = this.props;
    const isShow = true;
    const isSubmitting = zentForm.isSubmitting();

    return (
      <Form className="form1" onSubmit={handleSubmit} horizontal>
        <div className="zent-form__control-group">
          <label className="zent-form__control-label">姓名</label>
          <div className="zent-form__controls">
            <Field name="name" type="text" component="input" value="pangxie" />
          </div>
        </div>
        <Field name="email" component={renderEmail} value="11" validations={{ isEmail: true }} validationErrors={{ isEmail: '请输入正确的格式' }} />
        <div className="zent-form__control-group">
          <label className="zent-form__control-label">选择商品分组</label>
          <div className="zent-form__controls">
            <Field
              name="custom-select"
              value="2"
              component={(props) => (
                <Select
                  {...props}
                  className="custom-select"
                  data={optionData}
                  optionValue="id"
                  optionText="name"
                  placeholder="选择商品分组"
                  trigger={SelectTrigger}
                />
              )}
            />
          </div>
        </div>
        <div className="zent-form__control-group">
          <label htmlFor="show" className="zent-form__control-label">显示额外信息</label>
          <div className="zent-form__controls">
            <Field
              id="show"
              name="isShow"
              component={props => (
                <Checkbox checked={props.value === true} {...props} />
              )}
              value={isShow} />
          </div>
        </div>
        {showDynamicField ?
          <Field
            name="addition"
            label="额外信息："
            component={InputField}
            value=""
          /> :
          null}
        <div className="zent-form__form-actions"><button type="submit">{isSubmitting ? '提交ing' : '提交'}</button></div>
      </Form>
    );
  }
}

const OverviewFormContainer = createForm()(OverviewForm);

export default class Simple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDynamicField: true
    };
  }

  // handleSubmit直接接收events对象而不传入一个包含异步操作的function的话，则会执行传入到form中的onSubmit方法
  onSubmit = (values) => {
    console.log(values);
    return values;
  }

  // onSubmitSuccess的参数会是onSubmit执行的返回值
  onSubmitSuccess = (values) => {
    console.log(values);
    console.log('提交成功');
  }

  onChange = (values) => {
    this.setState({
      showDynamicField: values.isShow
    });
  }

  render() {
    return (
      <div>
        <h2>简单表单</h2>
        <hr />
        <OverviewFormContainer
          onSubmit={this.onSubmit}
          onSubmitSuccess={this.onSubmitSuccess}
          onChange={this.onChange}
          showDynamicField={this.state.showDynamicField} />
      </div>
    );
  }
}
